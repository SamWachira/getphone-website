import re
from datetime import datetime, timedelta
from typing import Optional
from zoneinfo import ZoneInfo
from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy import func
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.config import settings
from app.database import get_db
from app.models import BundleNumber, BundleCallLog
from app.auth import get_current_user
from app.schemas import DashboardResponse, LogEntry


router = APIRouter(tags=["logs"])

# Rate limit: max 60 requests per minute on read endpoints (C4)
limiter = Limiter(key_func=get_remote_address)


@router.get("/logs")
@limiter.limit("60/minute")
async def get_logs(
    request: Request,
    limit: int = Query(default=100, le=500),
    mobile_number: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Retrieve recent API call logs for troubleshooting.

    Optionally filter by mobile_number. Returns up to 'limit' entries
    (max 500), ordered by most recent first.
    """
    query = db.query(BundleCallLog).order_by(BundleCallLog.attempted_at.desc())

    # Security: Validate mobile_number filter parameter (M2)
    if mobile_number:
        mobile_number = mobile_number.strip()
        if not re.fullmatch(r"[0-9]{1,15}", mobile_number):
            return []

        query = query.filter(BundleCallLog.mobile_number == mobile_number)

    logs = query.limit(limit).all()

    return [
        LogEntry(
            id=log.id,
            mobile_number=log.mobile_number,
            network=log.network or ("somnet" if log.mobile_number.startswith("68") else "hormuud"),
            call_type=log.call_type,
            triggered_by=log.triggered_by,
            transfer_id=log.transfer_id,
            http_status=log.http_status,
            response_code=log.response_code,
            response_status=log.response_status,
            response_message=log.response_message,
            attempted_at=log.attempted_at,
        )
        for log in logs
    ]


@router.get("/dashboard", response_model=DashboardResponse)
@limiter.limit("60/minute")
async def get_dashboard(
    request: Request,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Get dashboard summary metrics.

    Returns counts of active/paused/stopped numbers, today's success/failure
    counts, and the timestamp of the last scheduler run.
    """
    # Count numbers by status
    active_count = db.query(BundleNumber).filter(BundleNumber.status == "active").count()
    paused_count = db.query(BundleNumber).filter(BundleNumber.status == "paused").count()
    stopped_count = db.query(BundleNumber).filter(BundleNumber.status == "stopped").count()

    # Today's stats (in the configured timezone)
    tz = ZoneInfo(settings.TIMEZONE)
    now_local = datetime.now(tz)
    today_start_local = datetime.combine(now_local.date(), datetime.min.time(), tzinfo=tz)
    today_start_utc = today_start_local.astimezone(ZoneInfo("UTC")).replace(tzinfo=None)

    successful_today = (
        db.query(BundleCallLog)
        .filter(BundleCallLog.attempted_at >= today_start_utc)
        .filter(BundleCallLog.response_status == "success")
        .filter(BundleCallLog.call_type.in_(["subscribe", "topup"]))
        .count()
    )

    failed_today = (
        db.query(BundleCallLog)
        .filter(BundleCallLog.attempted_at >= today_start_utc)
        .filter(BundleCallLog.response_status == "error")
        .filter(BundleCallLog.call_type.in_(["subscribe", "topup"]))
        .count()
    )

    failed_today = (
        db.query(BundleCallLog)
        .filter(BundleCallLog.attempted_at >= today_start_utc)
        .filter(BundleCallLog.response_status != "success")
        .filter(BundleCallLog.call_type == "subscribe")
        .count()
    )

    # Last scheduler run
    last_scheduler_log = (
        db.query(BundleCallLog)
        .filter(BundleCallLog.triggered_by == "scheduler")
        .order_by(BundleCallLog.attempted_at.desc())
        .first()
    )

    return DashboardResponse(
        active_count=active_count,
        paused_count=paused_count,
        stopped_count=stopped_count,
        successful_today=successful_today,
        failed_today=failed_today,
        last_job_time=last_scheduler_log.attempted_at if last_scheduler_log else None,
    )
