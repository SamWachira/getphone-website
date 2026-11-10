import asyncio
from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app import services
from app.benefits import current_business_date
from app.database import Base
from app.models import BundleCallLog, BundleNumber


def _session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)()


class _SuccessfulClient:
    bundle_ids = []

    async def topup_airtime(self, **kwargs):
        self.bundle_ids.append(kwargs["bundle_id"])
        return {
            "http_status": 200,
            "result_code": "0",
            "result_desc": "Operation successfully.",
            "transfer_id": "test-transfer",
            "success": True,
        }


class _AuthenticationFailureClient:
    async def topup_airtime(self, **kwargs):
        return {
            "http_status": 400,
            "result_code": "20000003",
            "result_desc": "Subscriber information verification error: Authentication failed.",
            "transfer_id": None,
            "success": False,
        }


def test_daily_provider_reference_is_stable(monkeypatch):
    db = _session()
    record = BundleNumber(
        mobile_number="615556110",
        network="hormuud",
        provisioning_owner="standalone",
        status="active",
        next_run_at=datetime.utcnow(),
    )
    db.add(record)
    db.commit()
    _SuccessfulClient.bundle_ids = []
    monkeypatch.setattr(services, "TopupApiClient", _SuccessfulClient)

    result = asyncio.run(services.provision_bundle(db, record.mobile_number, "test"))

    assert result["status"] == "success"
    assert _SuccessfulClient.bundle_ids == [
        f"GETPHONE-HORMUUD-{record.id}-{current_business_date():%Y%m%d}"
    ]


def test_unsupported_number_is_stopped_without_provider_call(monkeypatch):
    db = _session()
    record = BundleNumber(
        mobile_number="907761129",
        network="unknown",
        provisioning_owner="standalone",
        status="active",
        next_run_at=datetime.utcnow(),
    )
    db.add(record)
    db.commit()
    monkeypatch.setattr(services, "TopupApiClient", lambda: (_ for _ in ()).throw(AssertionError()))

    result = asyncio.run(services.provision_bundle(db, record.mobile_number, "test"))
    db.refresh(record)

    assert result["code"] == "UNSUPPORTED_CARRIER"
    assert record.status == "stopped"
    assert record.next_run_at is None
    assert db.query(BundleCallLog).filter_by(call_type="validation").count() == 1


def test_repeated_subscriber_authentication_failure_stops_number(monkeypatch):
    db = _session()
    record = BundleNumber(
        mobile_number="685814446",
        network="somnet",
        provisioning_owner="standalone",
        status="active",
        next_run_at=datetime.utcnow(),
        failure_count=2,
    )
    db.add(record)
    db.commit()
    monkeypatch.setattr(services, "TopupApiClient", _AuthenticationFailureClient)

    result = asyncio.run(services.provision_bundle(db, record.mobile_number, "test"))
    db.refresh(record)

    assert result["code"] == "20000003"
    assert record.failure_count == 3
    assert record.status == "stopped"
    assert record.next_run_at is None
