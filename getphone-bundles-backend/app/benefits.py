"""Auditable benefit-value calculation helpers for the standalone provisioner."""

from datetime import date, datetime, time, timedelta
from decimal import Decimal
from zoneinfo import ZoneInfo

from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.config import settings
from app.models import BundleCallLog, BundleDailyCalculation


USD = "USD"
STANDALONE_OWNER = "standalone"


def current_business_date() -> date:
    return datetime.now(ZoneInfo(settings.TIMEZONE)).date()


def utc_bounds_for_business_date(business_date: date) -> tuple[datetime, datetime]:
    """Return UTC-naive database bounds for one tenant-local calendar date."""
    timezone = ZoneInfo(settings.TIMEZONE)
    start_local = datetime.combine(business_date, time.min, tzinfo=timezone)
    end_local = start_local + timedelta(days=1)
    utc = ZoneInfo("UTC")
    return (
        start_local.astimezone(utc).replace(tzinfo=None),
        end_local.astimezone(utc).replace(tzinfo=None),
    )


def resolve_date_range(
    period: str,
    start_date: date | None = None,
    end_date: date | None = None,
) -> tuple[date, date]:
    today = current_business_date()

    if period == "today":
        return today, today
    if period == "yesterday":
        yesterday = today - timedelta(days=1)
        return yesterday, yesterday
    if period == "7d":
        return today - timedelta(days=6), today
    if period == "30d":
        return today - timedelta(days=29), today
    if period == "ytd":
        return date(today.year, 1, 1), today
    if period == "custom" and start_date and end_date and start_date <= end_date:
        return start_date, end_date

    raise ValueError("Use today, yesterday, 7d, 30d, ytd, or custom with a valid date range")


def _legacy_success_counts(db: Session, start_date: date, end_date: date) -> dict[date, int]:
    """Count pre-ledger successes without assigning them an invented value."""
    start_utc, _ = utc_bounds_for_business_date(start_date)
    _, end_utc = utc_bounds_for_business_date(end_date)
    logs = (
        db.query(BundleCallLog.attempted_at)
        .filter(BundleCallLog.call_type == "topup")
        .filter(BundleCallLog.response_status == "success")
        .filter(BundleCallLog.business_date.is_(None))
        .filter(BundleCallLog.attempted_at >= start_utc)
        .filter(BundleCallLog.attempted_at < end_utc)
        .all()
    )

    counts: dict[date, int] = {}
    timezone = ZoneInfo(settings.TIMEZONE)
    for (attempted_at,) in logs:
        if attempted_at is None:
            continue
        local_day = attempted_at.replace(tzinfo=ZoneInfo("UTC")).astimezone(timezone).date()
        counts[local_day] = counts.get(local_day, 0) + 1
    return counts


def _valued_daily_rows(db: Session, start_date: date, end_date: date) -> dict[date, dict]:
    rows = (
        db.query(
            BundleCallLog.business_date,
            func.count(BundleCallLog.id),
            func.coalesce(func.sum(BundleCallLog.benefit_value), 0),
        )
        .filter(BundleCallLog.call_type == "topup")
        .filter(BundleCallLog.response_status == "success")
        .filter(BundleCallLog.provisioning_owner == STANDALONE_OWNER)
        .filter(BundleCallLog.business_date >= start_date)
        .filter(BundleCallLog.business_date <= end_date)
        .group_by(BundleCallLog.business_date)
        .all()
    )
    return {
        business_date: {
            "successful_benefits": int(successful_benefits),
            "calculated_value": Decimal(calculated_value or 0),
        }
        for business_date, successful_benefits, calculated_value in rows
    }


def _failed_daily_rows(db: Session, start_date: date, end_date: date) -> dict[date, int]:
    rows = (
        db.query(BundleCallLog.business_date, func.count(BundleCallLog.id))
        .filter(BundleCallLog.call_type == "topup")
        .filter(BundleCallLog.response_status != "success")
        .filter(BundleCallLog.provisioning_owner == STANDALONE_OWNER)
        .filter(BundleCallLog.business_date >= start_date)
        .filter(BundleCallLog.business_date <= end_date)
        .group_by(BundleCallLog.business_date)
        .all()
    )
    return {business_date: int(failed_attempts) for business_date, failed_attempts in rows}


def calculate_benefits(
    db: Session,
    start_date: date,
    end_date: date,
    *,
    use_closed_snapshots: bool = True,
) -> dict:
    """Calculate live totals from immutable, confirmed standalone delivery logs."""
    valued = _valued_daily_rows(db, start_date, end_date)
    failed = _failed_daily_rows(db, start_date, end_date)
    legacy = _legacy_success_counts(db, start_date, end_date)

    closed = {
        calculation.business_date: calculation
        for calculation in (
            db.query(BundleDailyCalculation)
            .filter(BundleDailyCalculation.business_date >= start_date)
            .filter(BundleDailyCalculation.business_date <= end_date)
            .all()
        )
    }

    daily = []
    day = start_date
    while day <= end_date:
        live = valued.get(day, {})
        closed_calculation = closed.get(day)
        if closed_calculation and use_closed_snapshots:
            successful_benefits = closed_calculation.successful_benefits
            calculated_value = Decimal(closed_calculation.calculated_value)
            unpriced = closed_calculation.unpriced_successful_benefits
            failed_attempts = closed_calculation.failed_attempts
            closed_at = closed_calculation.closed_at
        else:
            successful_benefits = live.get("successful_benefits", 0)
            calculated_value = live.get("calculated_value", Decimal("0"))
            unpriced = legacy.get(day, 0)
            failed_attempts = failed.get(day, 0)
            closed_at = None

        if successful_benefits or unpriced or failed_attempts or closed_at:
            daily.append(
                {
                    "business_date": day,
                    "successful_benefits": successful_benefits,
                    "unpriced_successful_benefits": unpriced,
                    "failed_attempts": failed_attempts,
                    "calculated_value": calculated_value,
                    "currency": USD,
                    "closed_at": closed_at,
                    "settlement_status": (
                        closed_calculation.settlement_status if closed_calculation else "not_closed"
                    ),
                }
            )
        day += timedelta(days=1)

    return {
        "start_date": start_date,
        "end_date": end_date,
        "currency": USD,
        "successful_benefits": sum(item["successful_benefits"] for item in daily),
        "unpriced_successful_benefits": sum(item["unpriced_successful_benefits"] for item in daily),
        "failed_attempts": sum(item["failed_attempts"] for item in daily),
        "calculated_value": sum((item["calculated_value"] for item in daily), Decimal("0")),
        "daily_calculations": daily,
    }


def close_daily_calculation(db: Session, business_date: date | None = None) -> BundleDailyCalculation:
    """Persist an idempotent end-of-day snapshot without creating a settlement."""
    business_date = business_date or current_business_date()
    # Closing must use the raw delivery ledger even when a prior close is replayed.
    result = calculate_benefits(
        db,
        business_date,
        business_date,
        use_closed_snapshots=False,
    )

    calculation = (
        db.query(BundleDailyCalculation)
        .filter(BundleDailyCalculation.business_date == business_date)
        .first()
    )
    if calculation is None:
        calculation = BundleDailyCalculation(
            business_date=business_date,
            settlement_status="unsettled",
            closed_at=datetime.now(ZoneInfo("UTC")).replace(tzinfo=None),
        )
        db.add(calculation)

    calculation.successful_benefits = result["successful_benefits"]
    calculation.unpriced_successful_benefits = result["unpriced_successful_benefits"]
    calculation.failed_attempts = result["failed_attempts"]
    calculation.calculated_value = result["calculated_value"]
    calculation.currency = USD
    calculation.closed_at = datetime.now(ZoneInfo("UTC")).replace(tzinfo=None)
    db.commit()
    db.refresh(calculation)
    return calculation


def has_successful_delivery_for_business_date(
    db: Session,
    mobile_number: str,
    business_date: date,
) -> bool:
    """Recognise legacy logs too, so a deployment cannot create a same-day duplicate."""
    start_utc, end_utc = utc_bounds_for_business_date(business_date)
    return (
        db.query(BundleCallLog.id)
        .filter(BundleCallLog.mobile_number == mobile_number)
        .filter(BundleCallLog.call_type == "topup")
        .filter(BundleCallLog.response_status == "success")
        .filter(
            or_(
                BundleCallLog.business_date == business_date,
                (BundleCallLog.business_date.is_(None))
                & (BundleCallLog.attempted_at >= start_utc)
                & (BundleCallLog.attempted_at < end_utc),
            )
        )
        .first()
        is not None
    )
