from sqlalchemy import Column, Date, DateTime, Integer, Numeric, String, Text
from sqlalchemy.sql import func
from app.database import Base


class BundleNumber(Base):
    """Stores mobile numbers that should receive the daily bundle."""

    __tablename__ = "bundle_numbers"

    id = Column(Integer, primary_key=True, index=True)
    mobile_number = Column(String(20), unique=True, nullable=False, index=True)
    network = Column(String(20), nullable=False, default="hormuud", index=True)
    provisioning_owner = Column(String(20), nullable=False, default="standalone")
    status = Column(String(20), nullable=False, default="active")

    last_attempt_at = Column(DateTime, nullable=True)
    last_success_at = Column(DateTime, nullable=True)
    next_run_at = Column(DateTime, nullable=True)

    last_response_status = Column(String(50), nullable=True)
    last_response_message = Column(Text, nullable=True)

    failure_count = Column(Integer, nullable=False, default=0)

    created_by = Column(String(150), nullable=True)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)


class BundleCallLog(Base):
    """Records every top-up API call attempt for audit and troubleshooting."""

    __tablename__ = "bundle_call_logs"

    id = Column(Integer, primary_key=True, index=True)
    mobile_number = Column(String(20), nullable=False, index=True)
    network = Column(String(20), nullable=True)
    provisioning_owner = Column(String(20), nullable=True)

    call_type = Column(String(50), nullable=False, default="subscribe")
    triggered_by = Column(String(50), nullable=False)
    transfer_id = Column(String(100), nullable=True)
    benefit_value = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), nullable=True)
    business_date = Column(Date, nullable=True, index=True)

    http_status = Column(Integer, nullable=True)
    response_code = Column(String(20), nullable=True)
    response_status = Column(String(50), nullable=True)
    response_message = Column(Text, nullable=True)

    attempted_at = Column(DateTime, server_default=func.now(), nullable=False)


class BundleDailyCalculation(Base):
    """Immutable daily benefit value snapshot, closed without initiating payment."""

    __tablename__ = "bundle_daily_calculations"

    id = Column(Integer, primary_key=True, index=True)
    business_date = Column(Date, nullable=False, unique=True, index=True)
    successful_benefits = Column(Integer, nullable=False, default=0)
    unpriced_successful_benefits = Column(Integer, nullable=False, default=0)
    failed_attempts = Column(Integer, nullable=False, default=0)
    calculated_value = Column(Numeric(12, 2), nullable=False, default=0)
    currency = Column(String(3), nullable=False, default="USD")
    settlement_status = Column(String(20), nullable=False, default="unsettled")
    closed_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)
