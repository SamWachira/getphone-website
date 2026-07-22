import logging
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from sqlalchemy.orm import Session

from app.config import settings
from app.models import BundleNumber, BundleCallLog
from app.topup_client import TopupApiClient
from app.utils import resolve_network


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
    Provision the daily bundle for a single mobile number (Hormuud or Somnet).

    Steps:
    1. Look up the number record.
    2. Resolve network operator (Hormuud or Somnet).
    3. Check it's active.
    4. Check the 6-hour safety guard.
    5. Call Topup API (POST /topup/airtime or POST /topup/somnet/airtime).
    6. Log the result and transferId.
    7. Update the number record (next_run_at, failure_count, etc.).
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

    # Auto-resolve network
    network = resolve_network(mobile_number)
    record.network = network
    db.commit()

    if network == "unknown":
        return {
            "status": "error",
            "message": f"Unsupported carrier prefix for number {mobile_number}",
        }

    now = datetime.utcnow()
    bundle_id = f"GETPHONE-{network.upper()}-{record.id}-{int(now.timestamp())}"

    client = TopupApiClient()
    result = await client.topup_airtime(
        network=network,
        receiver=mobile_number,
        amount=settings.DEFAULT_TOPUP_AMOUNT,
        bundle_id=bundle_id,
    )

    http_status = result["http_status"]
    result_code = result["result_code"]
    result_desc = result["result_desc"]
    transfer_id = result.get("transfer_id")
    is_success = result["success"]

    # Log every API call
    log = BundleCallLog(
        mobile_number=mobile_number,
        network=network,
        call_type="topup",
        triggered_by=triggered_by,
        transfer_id=transfer_id,
        http_status=http_status,
        response_code=result_code,
        response_status="success" if is_success else "error",
        response_message=result_desc,
    )
    db.add(log)

    record.last_attempt_at = now
    record.last_response_status = "success" if is_success else "error"
    record.last_response_message = result_desc

    if is_success:
        # Success — schedule next run at next midnight
        record.last_success_at = now
        record.next_run_at = _get_next_midnight()
        record.failure_count = 0
        logger.info("Topup provisioned successfully for %s (%s) [transferId: %s]", mobile_number, network, transfer_id)
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
            # After 4+ failures, schedule for next midnight
            record.next_run_at = _get_next_midnight()

        logger.warning(
            "Topup provisioning failed for %s (%s): HTTP %d - Code %s - %s",
            mobile_number,
            network,
            http_status,
            result_code,
            result_desc,
        )

    db.commit()

    return {
        "status": "success" if is_success else "error",
        "network": network,
        "transfer_id": transfer_id,
        "http_status": http_status,
        "code": result_code,
        "message": result_desc,
    }
