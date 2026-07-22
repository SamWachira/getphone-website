import re
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Path, Request
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.models import BundleNumber
from app.auth import get_current_user
from app.services import provision_bundle, _get_next_midnight
from app.schemas import AddNumberRequest, AddNumberResponse, NumberResponse, StatusMessageResponse, ProvisioningResult
from app.hormuud_client import HormuudClient


router = APIRouter(prefix="/numbers", tags=["numbers"])

# Rate limit: max 30 requests per minute on admin endpoints (C4)
limiter = Limiter(key_func=get_remote_address)

# Security: Regex pattern for validated mobile number path parameters (M1)
MOBILE_NUMBER_PATTERN = r"^(61|77|68)[0-9]{7}$"


def _validate_mobile_number_param(mobile_number: str) -> str:
    """Validate and sanitize mobile number path parameters (M1)."""
    if not re.fullmatch(MOBILE_NUMBER_PATTERN, mobile_number):
        raise HTTPException(
            status_code=400,
            detail="Invalid mobile number format. Must be a 9-digit Hormuud (61, 77) or Somnet (68) mobile number.",
        )
    return mobile_number


@router.post("", response_model=AddNumberResponse)
@limiter.limit("30/minute")
async def add_number(
    request: Request,
    payload: AddNumberRequest,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Add a new customer mobile number and immediately provision the daily bundle.

    If the number already exists and is stopped, reactivate it.
    If it's already active or paused, return an 'exists' status.
    """
    mobile_number = payload.mobile_number  # Already normalized by validator
    network = "somnet" if mobile_number.startswith("68") else "hormuud"

    existing = (
        db.query(BundleNumber)
        .filter(BundleNumber.mobile_number == mobile_number)
        .first()
    )

    if existing:
        if existing.status == "stopped":
            # Reactivate a previously stopped number
            existing.status = "active"
            existing.network = network
            existing.next_run_at = datetime.utcnow()
            existing.created_by = user["email"]
            existing.failure_count = 0
            db.commit()
        else:
            return AddNumberResponse(
                mobile_number=mobile_number,
                network=existing.network or network,
                provisioning_result=ProvisioningResult(
                    status="exists",
                    network=existing.network or network,
                    message=f"This number already exists (status: {existing.status})",
                ),
            )
    else:
        # Create new record
        record = BundleNumber(
            mobile_number=mobile_number,
            network=network,
            status="active",
            next_run_at=datetime.utcnow(),
            created_by=user["email"],
        )
        db.add(record)
        db.commit()

    # Immediately provision the bundle
    result = await provision_bundle(
        db=db,
        mobile_number=mobile_number,
        triggered_by="manual",
    )

    return AddNumberResponse(
        mobile_number=mobile_number,
        network=network,
        provisioning_result=ProvisioningResult(**result),
    )


@router.get("")
@limiter.limit("60/minute")
async def list_numbers(
    request: Request,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """List all registered numbers with their current status and provisioning details."""
    records = db.query(BundleNumber).order_by(BundleNumber.created_at.desc()).all()

    return [
        NumberResponse(
            mobile_number=r.mobile_number,
            network=r.network or ("somnet" if r.mobile_number.startswith("68") else "hormuud"),
            status=r.status,
            last_attempt_at=r.last_attempt_at,
            last_success_at=r.last_success_at,
            next_run_at=r.next_run_at,
            failure_count=r.failure_count,
            last_response_status=r.last_response_status,
            last_response_message=r.last_response_message,
            created_by=r.created_by,
            created_at=r.created_at,
        )
        for r in records
    ]


@router.patch("/{mobile_number}/pause", response_model=StatusMessageResponse)
@limiter.limit("30/minute")
async def pause_number(
    request: Request,
    mobile_number: str = Path(..., pattern=MOBILE_NUMBER_PATTERN),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """Temporarily pause daily bundle provisioning for a number."""
    _validate_mobile_number_param(mobile_number)
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "paused"
    db.commit()

    return StatusMessageResponse(status="success", message="Number paused")


@router.patch("/{mobile_number}/resume", response_model=StatusMessageResponse)
@limiter.limit("30/minute")
async def resume_number(
    request: Request,
    mobile_number: str = Path(..., pattern=MOBILE_NUMBER_PATTERN),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """Resume daily bundle provisioning for a paused number."""
    _validate_mobile_number_param(mobile_number)
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "active"
    record.next_run_at = _get_next_midnight()
    db.commit()

    return StatusMessageResponse(status="success", message="Number resumed")


@router.patch("/{mobile_number}/stop", response_model=StatusMessageResponse)
@limiter.limit("30/minute")
async def stop_number(
    request: Request,
    mobile_number: str = Path(..., pattern=MOBILE_NUMBER_PATTERN),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """Permanently stop daily bundle provisioning for a number."""
    _validate_mobile_number_param(mobile_number)
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "stopped"
    db.commit()

    return StatusMessageResponse(status="success", message="Number stopped")


@router.post("/{mobile_number}/retry")
@limiter.limit("10/minute")
async def retry_number(
    request: Request,
    mobile_number: str = Path(..., pattern=MOBILE_NUMBER_PATTERN),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Manually retry bundle provisioning for a number.

    Subject to the 6-hour safety guard — will skip if recently provisioned.
    """
    _validate_mobile_number_param(mobile_number)
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    result = await provision_bundle(
        db=db,
        mobile_number=mobile_number,
        triggered_by="admin_retry",
    )

    return result
