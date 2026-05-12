import logging
from datetime import datetime
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import BundleNumber
from app.services import provision_bundle


logger = logging.getLogger(__name__)

router = APIRouter(prefix="/jobs", tags=["jobs"])


def verify_scheduler_secret(x_scheduler_secret: str = Header(None)):
    """Verify the Cloud Scheduler shared secret."""
    if not x_scheduler_secret:
        raise HTTPException(status_code=401, detail="Missing scheduler secret")

    if x_scheduler_secret != settings.SCHEDULER_SECRET:
        raise HTTPException(status_code=403, detail="Invalid scheduler secret")


@router.post("/provision-daily")
async def provision_daily(
    db: Session = Depends(get_db),
    _: None = Depends(verify_scheduler_secret),
):
    """
    Daily provisioning job triggered by Cloud Scheduler.

    Finds all active numbers where next_run_at <= now and provisions
    the daily bundle for each. Returns a summary of results.
    """
    now = datetime.utcnow()

    records = (
        db.query(BundleNumber)
        .filter(BundleNumber.status == "active")
        .filter(BundleNumber.next_run_at <= now)
        .all()
    )

    logger.info("Daily provisioning job started. Found %d eligible numbers.", len(records))

    summary = {
        "processed": 0,
        "successful": 0,
        "failed": 0,
        "skipped": 0,
        "started_at": now.isoformat(),
    }

    for record in records:
        summary["processed"] += 1

        try:
            result = await provision_bundle(
                db=db,
                mobile_number=record.mobile_number,
                triggered_by="scheduler",
            )

            if result.get("status") == "success":
                summary["successful"] += 1
            elif result.get("status") == "skipped":
                summary["skipped"] += 1
            else:
                summary["failed"] += 1
        except Exception as e:
            logger.error(
                "Unexpected error provisioning %s: %s",
                record.mobile_number,
                str(e),
            )
            summary["failed"] += 1

    summary["completed_at"] = datetime.utcnow().isoformat()

    logger.info(
        "Daily provisioning job completed: %d processed, %d successful, %d failed, %d skipped",
        summary["processed"],
        summary["successful"],
        summary["failed"],
        summary["skipped"],
    )

    return summary
