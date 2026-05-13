import logging
import asyncio
from datetime import datetime
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db, SessionLocal
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
    the daily bundle for each using controlled parallelism.

    Concurrency is capped by MAX_CONCURRENT_PROVISIONS (default 10)
    to avoid overwhelming the Hormuud API or the DB connection pool.

    Returns a summary of results.
    """
    now = datetime.utcnow()

    records = (
        db.query(BundleNumber)
        .filter(BundleNumber.status == "active")
        .filter(BundleNumber.next_run_at <= now)
        .all()
    )

    # Extract mobile numbers before parallel processing —
    # each parallel task will use its own DB session.
    mobile_numbers = [r.mobile_number for r in records]

    logger.info(
        "Daily provisioning job started. Found %d eligible numbers.",
        len(mobile_numbers),
    )

    if not mobile_numbers:
        return {
            "processed": 0,
            "successful": 0,
            "failed": 0,
            "skipped": 0,
            "started_at": now.isoformat(),
            "completed_at": datetime.utcnow().isoformat(),
        }

    semaphore = asyncio.Semaphore(settings.MAX_CONCURRENT_PROVISIONS)

    async def _provision_one(mobile_number: str) -> dict:
        """Provision a single number with its own DB session and concurrency control."""
        async with semaphore:
            task_db = SessionLocal()
            try:
                result = await provision_bundle(
                    db=task_db,
                    mobile_number=mobile_number,
                    triggered_by="scheduler",
                )
                return {"mobile_number": mobile_number, "status": result.get("status", "error")}
            except Exception as e:
                logger.error(
                    "Unexpected error provisioning %s: %s",
                    mobile_number,
                    str(e),
                )
                return {"mobile_number": mobile_number, "status": "error"}
            finally:
                task_db.close()

    # Run all provisions concurrently with controlled parallelism
    results = await asyncio.gather(
        *[_provision_one(mn) for mn in mobile_numbers]
    )

    # Aggregate results
    summary = {
        "processed": len(results),
        "successful": sum(1 for r in results if r["status"] == "success"),
        "failed": sum(1 for r in results if r["status"] not in ("success", "skipped")),
        "skipped": sum(1 for r in results if r["status"] == "skipped"),
        "started_at": now.isoformat(),
        "completed_at": datetime.utcnow().isoformat(),
    }

    logger.info(
        "Daily provisioning job completed: %d processed, %d successful, %d failed, %d skipped",
        summary["processed"],
        summary["successful"],
        summary["failed"],
        summary["skipped"],
    )

    return summary
