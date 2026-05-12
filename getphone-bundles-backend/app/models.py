from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base


class BundleNumber(Base):
    """Stores mobile numbers that should receive the daily bundle."""

    __tablename__ = "bundle_numbers"

    id = Column(Integer, primary_key=True, index=True)
    mobile_number = Column(String(20), unique=True, nullable=False, index=True)
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
    """Records every Hormuud API call attempt for audit and troubleshooting."""

    __tablename__ = "bundle_call_logs"

    id = Column(Integer, primary_key=True, index=True)
    mobile_number = Column(String(20), nullable=False, index=True)

    call_type = Column(String(50), nullable=False, default="subscribe")
    triggered_by = Column(String(50), nullable=False)

    http_status = Column(Integer, nullable=True)
    response_code = Column(String(20), nullable=True)
    response_status = Column(String(50), nullable=True)
    response_message = Column(Text, nullable=True)

    attempted_at = Column(DateTime, server_default=func.now(), nullable=False)
