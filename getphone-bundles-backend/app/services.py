import logging
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy.orm import Session

from app.config import settings
from app.models import BundleNumber, BundleCallLog
from app.hormuud_client import HormuudClient


logger = logging.getLogger(__name__)


def _get_next_midnight() -> datetime:
    """Calculate the next midnight in the configured timezone (Africa/Mogadishu)."""
    tz = ZoneInfo(settings.TIMEZONE)
    now_local = datetime.now(tz)
    # Next midnight = start of tomorrow
    tomorrow = now_local.date() + timedelta(days=1)
    next_midnight_local = datetime.combine(tomorrow, datetime.min.time(), tzinfo=tz)
    # Convert to UTC for storage
    return next_midnight_local.astimezone(ZoneInfo("UTC")).replace(tzinfo=None)


def should_skip_safety_guard(record: BundleNumber) -> bool:
    """
    Check the 6-hour safety guard.

    Returns True if the number was successfully provisioned within the last
    SAFETY_GUARD_HOURS hours and should be skipped.
    """
    if not record.last_success_at:
        return False

    cutoff = datetime.utcnow() - timedelta(hours=settings.SAFETY_GUARD_HOURS)
    return record.last_success_at >= cutoff


async def provision_bundle(
    db: Session,
    mobile_number: str,
    triggered_by: str,
) -> dict:
    """
    Provision the daily bundle for a single mobile number.

    Steps:
    1. Look up the number record.
    2. Check it's active.
    3. Check the 6-hour safety guard.
    4. Call Hormuud POST /subscribe.
    5. Log the result.
    6. Update the number record (next_run_at, failure_count, etc.).
    """
    record = (
        db.query(BundleNumber)
        .filter(BundleNumber.mobile_number == mobile_number)
        .first()
    )

    if not record:
        return {
            "status": "error",
            "message": "Number not found",
        }

    if record.status != "active":
        return {
            "status": "skipped",
            "message": f"Number is {record.status}",
        }

    if should_skip_safety_guard(record):
        return {
            "status": "skipped",
            "message": "Bundle already provisioned recently (safety guard)",
        }

    # Call Hormuud
    client = HormuudClient()

    try:
        result = await client.subscribe(mobile_number)
    except Exception as e:
        logger.error("Hormuud API call failed for %s: %s", mobile_number, str(e))
        # Log the failure
        log = BundleCallLog(
            mobile_number=mobile_number,
            call_type="subscribe",
            triggered_by=triggered_by,
            http_status=None,
            response_code=None,
            response_status="error",
            response_message=str(e),
        )
        db.add(log)

        now = datetime.utcnow()
        record.last_attempt_at = now
        record.failure_count += 1
        record.last_response_status = "error"
        record.last_response_message = str(e)
        # Retry after 1 hour on network errors
        record.next_run_at = now + timedelta(hours=1)
        db.commit()

        return {
            "status": "error",
            "message": f"API call failed: {str(e)}",
        }

    http_status = result["http_status"]
    body = result["body"]

    response_code = str(body.get("code", ""))
    response_status = body.get("status", "")
    response_message = body.get("message", "")

    # Log every API call
    log = BundleCallLog(
        mobile_number=mobile_number,
        call_type="subscribe",
        triggered_by=triggered_by,
        http_status=http_status,
        response_code=response_code,
        response_status=response_status,
        response_message=response_message,
    )
    db.add(log)

    now = datetime.utcnow()
    record.last_attempt_at = now
    record.last_response_status = response_status
    record.last_response_message = response_message

    if http_status == 200 and response_status == "success" and response_code == "0":
        # Success — schedule next run at next midnight
        record.last_success_at = now
        record.next_run_at = _get_next_midnight()
        record.failure_count = 0
        logger.info("Bundle provisioned successfully for %s", mobile_number)
    else:
        # Failure — retry with backoff based on failure count
        record.failure_count += 1
        if record.failure_count <= 1:
            record.next_run_at = now + timedelta(hours=1)
        elif record.failure_count <= 2:
            record.next_run_at = now + timedelta(hours=2)
        elif record.failure_count <= 3:
            record.next_run_at = now + timedelta(hours=4)
        else:
            # After 4+ failures, schedule for next midnight but flag for review
            record.next_run_at = _get_next_midnight()

        logger.warning(
            "Bundle provisioning failed for %s: HTTP %d - %s",
            mobile_number,
            http_status,
            response_message,
        )

    db.commit()

    return {
        "status": response_status or "error",
        "http_status": http_status,
        "code": response_code,
        "message": response_message,
    }
