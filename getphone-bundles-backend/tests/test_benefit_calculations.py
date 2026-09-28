from datetime import timedelta
from decimal import Decimal

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.benefits import (
    STANDALONE_OWNER,
    calculate_benefits,
    close_daily_calculation,
    current_business_date,
    has_successful_delivery_for_business_date,
    utc_bounds_for_business_date,
)
from app.database import Base
from app.models import BundleCallLog


def make_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)()


def test_calculation_counts_only_valued_standalone_successes_and_keeps_legacy_unpriced():
    db = make_session()
    business_date = current_business_date()
    start_utc, _ = utc_bounds_for_business_date(business_date)

    db.add_all(
        [
            BundleCallLog(
                mobile_number="615556110",
                network="hormuud",
                provisioning_owner=STANDALONE_OWNER,
                call_type="topup",
                triggered_by="scheduler",
                response_status="success",
                benefit_value=Decimal("0.20"),
                currency="USD",
                business_date=business_date,
                attempted_at=start_utc + timedelta(hours=1),
            ),
            # A legacy success must be visible, but must never be assigned a guessed amount.
            BundleCallLog(
                mobile_number="615556111",
                call_type="topup",
                triggered_by="scheduler",
                response_status="success",
                attempted_at=start_utc + timedelta(hours=2),
            ),
            BundleCallLog(
                mobile_number="615556112",
                network="hormuud",
                provisioning_owner="orbit",
                call_type="topup",
                triggered_by="scheduler",
                response_status="success",
                benefit_value=Decimal("0.20"),
                currency="USD",
                business_date=business_date,
                attempted_at=start_utc + timedelta(hours=3),
            ),
            BundleCallLog(
                mobile_number="615556113",
                network="hormuud",
                provisioning_owner=STANDALONE_OWNER,
                call_type="topup",
                triggered_by="scheduler",
                response_status="error",
                benefit_value=Decimal("0.20"),
                currency="USD",
                business_date=business_date,
                attempted_at=start_utc + timedelta(hours=4),
            ),
        ]
    )
    db.commit()

    result = calculate_benefits(db, business_date, business_date)

    assert result["successful_benefits"] == 1
    assert result["calculated_value"] == Decimal("0.20")
    assert result["unpriced_successful_benefits"] == 1
    assert result["failed_attempts"] == 1
    assert result["daily_calculations"][0]["settlement_status"] == "not_closed"


def test_close_is_replay_safe_and_recalculates_from_raw_delivery_ledger():
    db = make_session()
    business_date = current_business_date()
    start_utc, _ = utc_bounds_for_business_date(business_date)

    db.add(
        BundleCallLog(
            mobile_number="615556120",
            network="hormuud",
            provisioning_owner=STANDALONE_OWNER,
            call_type="topup",
            triggered_by="scheduler",
            response_status="success",
            benefit_value=Decimal("0.20"),
            currency="USD",
            business_date=business_date,
            attempted_at=start_utc + timedelta(hours=1),
        )
    )
    db.commit()

    first_close = close_daily_calculation(db, business_date)
    assert first_close.successful_benefits == 1
    assert first_close.calculated_value == Decimal("0.20")
    assert first_close.settlement_status == "unsettled"

    db.add(
        BundleCallLog(
            mobile_number="615556121",
            network="somnet",
            provisioning_owner=STANDALONE_OWNER,
            call_type="topup",
            triggered_by="scheduler",
            response_status="success",
            benefit_value=Decimal("0.20"),
            currency="USD",
            business_date=business_date,
            attempted_at=start_utc + timedelta(hours=2),
        )
    )
    db.commit()

    replayed_close = close_daily_calculation(db, business_date)
    assert replayed_close.id == first_close.id
    assert replayed_close.successful_benefits == 2
    assert replayed_close.calculated_value == Decimal("0.40")


def test_existing_legacy_success_blocks_same_business_day_duplicate_delivery():
    db = make_session()
    business_date = current_business_date()
    start_utc, _ = utc_bounds_for_business_date(business_date)
    db.add(
        BundleCallLog(
            mobile_number="615556130",
            call_type="topup",
            triggered_by="scheduler",
            response_status="success",
            attempted_at=start_utc + timedelta(hours=1),
        )
    )
    db.commit()

    assert has_successful_delivery_for_business_date(db, "615556130", business_date)
