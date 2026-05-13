import hmac
import logging
import asyncio
from datetime import datetime
from fastapi import APIRouter, Depends, Header, HTTPException, Request
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings
from app.database import get_db, SessionLocal
from app.models import BundleNumber
from app.services import provision_bundle


logger = logging.getLogger(__name__)

router = APIRouter(prefix="/jobs", tags=["jobs"])

# Rate limit: max 5 requests per minute on the scheduler endpoint (C4)
limiter = Limiter(key_func=get_remote_address)


def verify_scheduler_secret(x_scheduler_secret: str = Header(None)):
    """
    Verify the Cloud Scheduler shared secret.

    Uses hmac.compare_digest() for constant-time comparison
    to prevent timing-based side-channel attacks (C2).
    """
    if not x_scheduler_secret:
        raise HTTPException(status_code=401, detail="Missing scheduler secret")

    # Security: constant-time comparison prevents timing attacks (C2)
    if not hmac.compare_digest(x_scheduler_secret, settings.SCHEDULER_SECRET):
        raise HTTPException(status_code=403, detail="Invalid scheduler secret")


@router.post("/provision-daily")
@limiter.limit("5/minute")
async def provision_daily(
    request: Request,
    db: Session = Depends(get_db),
    _: None = Depends(verify_scheduler_secret),
):
    """
    Daily provisioning job triggered by Cloud Scheduler.

    Finds all active numbers where next_run_at <= now and provisions
    the daily bundle for each using controlled parallelism.

    Concurrency is capped by MAX_CONCURRENT_PROVISIONS (default 10)
    to avoid overwhelming the Hormuud API or the DB connection pool.

    Security:
    - Rate limited to 5 requests/minute (C4)
    - Uses constant-time secret comparison (C2)
    - Server-side timeout of 540s (M4)

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

    # Security: Server-side timeout to prevent stuck requests (M4)
    # 540s leaves 60s buffer before Cloud Scheduler's 600s deadline
    try:
        results = await asyncio.wait_for(
            asyncio.gather(*[_provision_one(mn) for mn in mobile_numbers]),
            timeout=540,
        )
    except asyncio.TimeoutError:
        logger.error(
            "Daily provisioning job timed out after 540 seconds. "
            "Some numbers may not have been processed."
        )
        return {
            "processed": len(mobile_numbers),
            "successful": 0,
            "failed": 0,
            "skipped": 0,
            "error": "Job timed out after 540 seconds",
            "started_at": now.isoformat(),
            "completed_at": datetime.utcnow().isoformat(),
        }

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
