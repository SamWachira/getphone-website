from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BundleNumber
from app.auth import get_current_user
from app.services import provision_bundle, _get_next_midnight
from app.schemas import AddNumberRequest, AddNumberResponse, NumberResponse, StatusMessageResponse, ProvisioningResult
from app.hormuud_client import HormuudClient


router = APIRouter(prefix="/numbers", tags=["numbers"])


@router.post("", response_model=AddNumberResponse)
async def add_number(
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

    existing = (
        db.query(BundleNumber)
        .filter(BundleNumber.mobile_number == mobile_number)
        .first()
    )

    if existing:
        if existing.status == "stopped":
            # Reactivate a previously stopped number
            existing.status = "active"
            existing.next_run_at = datetime.utcnow()
            existing.created_by = user["email"]
            existing.failure_count = 0
            db.commit()
        else:
            return AddNumberResponse(
                mobile_number=mobile_number,
                provisioning_result=ProvisioningResult(
                    status="exists",
                    message=f"This number already exists (status: {existing.status})",
                ),
            )
    else:
        # Create new record
        record = BundleNumber(
            mobile_number=mobile_number,
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
        provisioning_result=ProvisioningResult(**result),
    )


@router.get("")
async def list_numbers(
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """List all registered numbers with their current status and provisioning details."""
    records = db.query(BundleNumber).order_by(BundleNumber.created_at.desc()).all()

    return [
        NumberResponse(
            mobile_number=r.mobile_number,
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
async def pause_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """Temporarily pause daily bundle provisioning for a number."""
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "paused"
    db.commit()

    return StatusMessageResponse(status="success", message="Number paused")


@router.patch("/{mobile_number}/resume", response_model=StatusMessageResponse)
async def resume_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """Resume daily bundle provisioning for a paused number."""
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "active"
    record.next_run_at = _get_next_midnight()
    db.commit()

    return StatusMessageResponse(status="success", message="Number resumed")


@router.patch("/{mobile_number}/stop", response_model=StatusMessageResponse)
async def stop_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """Permanently stop daily bundle provisioning for a number."""
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "stopped"
    db.commit()

    return StatusMessageResponse(status="success", message="Number stopped")


@router.post("/{mobile_number}/retry")
async def retry_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Manually retry bundle provisioning for a number.

    Subject to the 6-hour safety guard — will skip if recently provisioned.
    """
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    result = await provision_bundle(
        db=db,
        mobile_number=mobile_number,
        triggered_by="admin_retry",
    )

    return result


@router.get("/{mobile_number}/offer")
async def check_offer(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Check a customer's current Hormuud offers.

    Calls GET /customer-offer and returns the active offers.
    """
    client = HormuudClient()
    result = await client.customer_offer(mobile_number)

    body = result["body"]
    offers = body.get("offers", [])

    # Filter active offers only
    active_offers = [
        offer for offer in offers
        if offer.get("subscriptionStatus") == "Active"
    ]

    return {
        "mobile_number": mobile_number,
        "http_status": result["http_status"],
        "api_status": body.get("status"),
        "api_message": body.get("message"),
        "active_offers": active_offers,
        "all_offers": offers,
    }
