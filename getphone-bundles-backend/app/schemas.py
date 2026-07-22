from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime
from app.utils import normalize_mobile_number, is_valid_mobile_number


# --- Request Schemas ---

class AddNumberRequest(BaseModel):
    """Request body for adding a new customer number."""
    mobile_number: str

    @field_validator("mobile_number")
    @classmethod
    def validate_mobile_number(cls, v: str) -> str:
        normalized = normalize_mobile_number(v)
        if not is_valid_mobile_number(normalized):
            raise ValueError(
                "Invalid mobile number format. "
                "Must be a 9-digit Hormuud (61, 77) or Somnet (68) mobile number. Example: 610000000 or 689000000"
            )
        return normalized


# --- Response Schemas ---

class HealthResponse(BaseModel):
    status: str


class NumberResponse(BaseModel):
    mobile_number: str
    network: str = "hormuud"
    status: str
    last_attempt_at: Optional[datetime] = None
    last_success_at: Optional[datetime] = None
    next_run_at: Optional[datetime] = None
    failure_count: int = 0
    last_response_status: Optional[str] = None
    last_response_message: Optional[str] = None
    created_by: Optional[str] = None
    created_at: Optional[datetime] = None


class ProvisioningResult(BaseModel):
    status: str
    network: Optional[str] = None
    transfer_id: Optional[str] = None
    http_status: Optional[int] = None
    code: Optional[str] = None
    message: str


class AddNumberResponse(BaseModel):
    mobile_number: str
    network: str = "hormuud"
    provisioning_result: ProvisioningResult


class StatusMessageResponse(BaseModel):
    status: str
    message: str


class DashboardResponse(BaseModel):
    active_count: int
    paused_count: int
    stopped_count: int
    successful_today: int
    failed_today: int
    last_job_time: Optional[datetime] = None


class LogEntry(BaseModel):
    id: int
    mobile_number: str
    network: Optional[str] = None
    call_type: str
    triggered_by: str
    transfer_id: Optional[str] = None
    http_status: Optional[int] = None
    response_code: Optional[str] = None
    response_status: Optional[str] = None
    response_message: Optional[str] = None
    attempted_at: Optional[datetime] = None


class JobSummaryResponse(BaseModel):
    processed: int
    successful: int
    failed: int
    skipped: int
