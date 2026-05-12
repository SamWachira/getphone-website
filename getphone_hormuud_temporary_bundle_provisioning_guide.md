# Getphone Temporary Daily Bundle Provisioning System
## Engineering Implementation Guide

## 1. Purpose of the temporary system

Getphone needs a temporary internal system that allows authorized staff to enter a customer's Hormuud mobile number after the customer buys a Getphone PAYG phone.

Once the number is entered, the system should:

1. Save the mobile number.
2. Immediately call Hormuud's API to give the customer the daily data/voice bundle.
3. Automatically call the same API again every day for active numbers.
4. Prevent duplicate provisioning for the same number within the same daily cycle.
5. Allow staff to pause, stop, retry, or check the status of a number.
6. Keep simple logs for troubleshooting.

This temporary system exists because the final automatic flow through ZTE/eGet is not yet ready.

The Hormuud API supports subscribing a customer to a data offer using `POST /subscribe`, with `mobileNumber`, `offerID`, and `productId` in the request body. The API also requires Bearer authorization in the request header.

---

## 2. Recommended Google Cloud architecture

The recommended architecture is:

```text
Firebase Hosting
    ↓
Protected admin web page
    ↓
Firebase Authentication
    ↓
FastAPI backend on Google Cloud Run
    ↓
Cloud SQL for PostgreSQL
    ↓
Cloud Scheduler
    ↓
Hormuud Hintegrations API
```

### What each component does

| Component | Purpose |
|---|---|
| Firebase Hosting | Hosts the simple admin web page |
| Firebase Authentication | Allows only Getphone staff to log in |
| FastAPI | Handles the backend logic and API calls |
| Cloud Run | Hosts the FastAPI backend |
| Cloud SQL PostgreSQL | Stores mobile numbers and API call logs |
| Secret Manager | Stores Hormuud API credentials securely |
| Cloud Scheduler | Triggers the daily bundle job |
| Hormuud API | Provisions the bundle to the customer |

The important design principle is simple: **the Firebase-hosted frontend should never call Hormuud directly.** All Hormuud API calls should go through Getphone's FastAPI backend.

---

## 3. Credential handling

The Hormuud API credentials should remain private and should only be used by the backend.

The credentials should never be placed in:

```text
Frontend JavaScript
Firebase Hosting files
GitHub repository
Screenshots shared outside the authorized team
Public documentation
Hardcoded Python files
```

They should be stored in:

```text
Google Secret Manager
```

FastAPI should read the credentials securely at runtime from Google Cloud, not from frontend code.

Hormuud requires the following authorization header for API requests:

```text
Authorization: Bearer <HORMUUD_API_KEY>
```

The frontend should not know this API key. The browser should only communicate with Getphone's own FastAPI backend.

---

## 4. Core system behavior

The system should have two modes of operation:

1. Manual onboarding.
2. Daily automatic provisioning.

### 4.1 Manual onboarding

This is used when a Getphone staff member adds a new customer number.

Flow:

```text
Staff logs in
    ↓
Staff enters Hormuud mobile number
    ↓
Frontend sends number to FastAPI
    ↓
FastAPI verifies staff login token
    ↓
FastAPI validates mobile number
    ↓
FastAPI checks if number already exists
    ↓
FastAPI stores number
    ↓
FastAPI calls Hormuud POST /subscribe
    ↓
FastAPI records result
    ↓
Staff sees success or failure message
```

### 4.2 Daily automatic provisioning

This is used to give the bundle every day to all active numbers.

Flow:

```text
Cloud Scheduler runs once per day
    ↓
Cloud Scheduler calls FastAPI /jobs/provision-daily
    ↓
FastAPI checks all active numbers
    ↓
FastAPI skips numbers already provisioned recently
    ↓
FastAPI calls Hormuud POST /subscribe for eligible numbers
    ↓
FastAPI records success or failure
    ↓
FastAPI updates next_run_at
```

Because the Hormuud API does not provide an idempotency key, Getphone's backend must prevent duplicate provisioning. The backend should ensure that the same number is not provisioned multiple times within the configured daily window.

---

## 5. What the frontend page should contain

Since this is temporary, the frontend should be very simple.

### 5.1 Login screen

Staff should log in using Firebase Authentication.

Recommended login method:

```text
Email + password
```

Only authorized Getphone staff emails should be allowed.

### 5.2 Dashboard screen

The dashboard should show:

| Metric | Meaning |
|---|---|
| Active numbers | Numbers currently receiving daily bundles |
| Paused numbers | Numbers temporarily excluded |
| Stopped numbers | Numbers permanently stopped |
| Successful today | Numbers provisioned successfully today |
| Failed today | Numbers that failed today |
| Last daily job time | Last time scheduler ran |

### 5.3 Add number screen

The page should only collect the customer mobile number.

Field:

```text
Mobile number
```

No customer name, national ID, IMEI, device details, KYC data, payment data, or personal profile information should be collected for this temporary solution.

Optional frontend validations:

```text
Number is required
Number must contain digits only
Number should not contain spaces
Number should follow the format expected by Hormuud
```

The API examples use numbers such as:

```text
610000000
```

Therefore, the backend should normalize numbers into the format Hormuud expects before sending the request. The exact expected format should be confirmed internally with the Hormuud integration contact.

### 5.4 Active numbers table

Columns:

| Column | Meaning |
|---|---|
| Mobile number | Customer's Hormuud number |
| Status | active, paused, stopped |
| Last success | Last successful bundle provisioning |
| Next run | Next scheduled attempt |
| Failure count | Recent failures |
| Last response | Last API message |
| Actions | Retry, pause, stop, check offer |

### 5.5 Logs screen

This should show recent API attempts.

Columns:

| Column | Meaning |
|---|---|
| Time | When the call was made |
| Mobile number | Number processed |
| Trigger | manual or scheduler |
| HTTP status | API HTTP response |
| API status | success/error |
| Message | Hormuud response message |

This screen will help the operations team troubleshoot customer complaints.

---

## 6. Backend responsibilities

The FastAPI backend should own all sensitive and operational logic.

It should:

1. Verify Firebase login tokens.
2. Reject unauthenticated requests.
3. Validate mobile numbers.
4. Store numbers in PostgreSQL.
5. Call Hormuud's API.
6. Prevent duplicate daily calls.
7. Store logs.
8. Expose admin endpoints to the frontend.
9. Expose a scheduler endpoint for Cloud Scheduler.
10. Hide all Hormuud API credentials from the frontend.

The frontend should never communicate directly with Hormuud.

---

## 7. Minimal database design

Because this is a two-week temporary system, use only two tables.

### 7.1 Table 1: `bundle_numbers`

This table stores numbers that should receive the daily bundle.

```sql
CREATE TABLE bundle_numbers (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',

    last_attempt_at TIMESTAMP NULL,
    last_success_at TIMESTAMP NULL,
    next_run_at TIMESTAMP NULL,

    last_response_status VARCHAR(50) NULL,
    last_response_message TEXT NULL,

    failure_count INTEGER NOT NULL DEFAULT 0,

    created_by VARCHAR(150) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Field explanation

| Field | Explanation |
|---|---|
| `id` | Internal database ID |
| `mobile_number` | Customer's Hormuud mobile number |
| `status` | Whether the number is active, paused, or stopped |
| `last_attempt_at` | Last time the system tried to provision the bundle |
| `last_success_at` | Last time Hormuud confirmed success |
| `next_run_at` | When the system should try again |
| `last_response_status` | Last Hormuud API status |
| `last_response_message` | Last Hormuud message |
| `failure_count` | Number of recent failures |
| `created_by` | Firebase user email that added the number |
| `created_at` | Date/time number was added |
| `updated_at` | Date/time record was last updated |

### 7.2 Table 2: `bundle_call_logs`

This table stores every API call attempt.

```sql
CREATE TABLE bundle_call_logs (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(20) NOT NULL,

    call_type VARCHAR(50) NOT NULL DEFAULT 'subscribe',
    triggered_by VARCHAR(50) NOT NULL,

    http_status INTEGER NULL,
    response_code VARCHAR(20) NULL,
    response_status VARCHAR(50) NULL,
    response_message TEXT NULL,

    attempted_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Field explanation

| Field | Explanation |
|---|---|
| `id` | Internal log ID |
| `mobile_number` | Number processed |
| `call_type` | `subscribe` or `customer_offer_check` |
| `triggered_by` | `manual`, `scheduler`, or `admin_retry` |
| `http_status` | HTTP response code |
| `response_code` | Hormuud API code |
| `response_status` | Hormuud API status |
| `response_message` | Hormuud message |
| `attempted_at` | Date/time of the attempt |

This design avoids collecting unnecessary customer identity data. It only stores the mobile number and operational metadata.

---

## 8. Status definitions

Use only three statuses.

| Status | Meaning |
|---|---|
| `active` | Number should receive daily bundles |
| `paused` | Number is temporarily excluded |
| `stopped` | Number should no longer receive bundles |

### Example usage

A number is `active` when a customer should receive daily bundles.

A number is `paused` when Getphone wants to temporarily suspend benefit delivery, for example if there is a dispute or temporary operational issue.

A number is `stopped` when the number should no longer receive bundles.

Do not delete numbers unless necessary. Stopping is better than deleting because Getphone may need a record of what happened during the two-week period.

---

## 9. Duplicate-prevention rules

Duplicate prevention is one of the most important parts of this system.

Use this rule:

```text
Do not call Hormuud POST /subscribe for the same mobile number
if last_success_at is within the last 20 hours.
```

Why 20 hours instead of exactly 24?

Because daily jobs may not run at exactly the same time every day. A 20-hour safety window prevents accidental duplicate provisioning while still allowing the next day's job to run even if the previous day's job ran late.

### Example

```text
Customer number: 610000000
Last successful bundle: Monday 10:00 AM

If staff clicks retry Monday 2:00 PM:
    Skip, because last success was only 4 hours ago.

If scheduler runs Tuesday 7:00 AM:
    Skip or allow depending on the configured rule.

If scheduler runs Tuesday 10:30 AM:
    Allow, because more than 24 hours have passed.
```

For strict control, use 23 hours.

For operational flexibility, use 20 hours.

Recommended setting for this temporary system:

```text
DAILY_DEDUP_HOURS=20
```

---

## 10. Hormuud API request handling

### 10.1 Subscription endpoint

FastAPI should call:

```text
POST https://hintegrations.hormuud.com/api/subscribe
```

Headers:

```text
Authorization: Bearer <HORMUUD_API_KEY>
Content-Type: application/json
```

Body:

```json
{
  "mobileNumber": "610000000",
  "offerID": "daily",
  "productId": "3000060"
}
```

The `offerID` and `productId` should be stored as backend configuration. Staff should not type these manually on the frontend.

### 10.2 Success response

Expected success response:

```json
{
  "code": "0",
  "message": "Subscription successful.",
  "status": "success"
}
```

### 10.3 Error responses

Possible errors include:

| Error | Meaning |
|---|---|
| 400 | Missing or invalid parameters |
| 401 | Invalid or missing API key |
| 500 | Hormuud processing failure |

Examples of possible error messages include:

```text
Invalid mobile number format.
Invalid offer id.
```

---

## 11. Using `GET /customer-offer`

The temporary system does not need to call `GET /customer-offer` before every daily provisioning call.

Use it only when needed.

Recommended use cases:

| Use case | Use `GET /customer-offer`? |
|---|---|
| Staff wants to check a customer's current bundle | Yes |
| A customer complains they did not receive bundle | Yes |
| Daily provisioning for all numbers | Not required |
| After a failed POST | Optional |
| End-of-day reconciliation | Optional |

The endpoint returns an `offers` array with fields such as:

```text
offerName
offerID
subscriptionStatus
subscriptionStartTime
subscriptionEndTime
```

When checking the current benefit, the backend should filter for:

```text
subscriptionStatus == "Active"
```

---

## 12. Recommended backend endpoints

The FastAPI backend should expose the following endpoints.

### 12.1 Health check

```text
GET /health
```

Purpose:

```text
Check whether backend is running.
```

Response:

```json
{
  "status": "ok"
}
```

---

### 12.2 Add number

```text
POST /numbers
```

Request:

```json
{
  "mobile_number": "610000000"
}
```

Behavior:

1. Verify Firebase token.
2. Validate mobile number.
3. Check if number already exists.
4. If not existing, create record.
5. Call Hormuud `/subscribe` immediately.
6. Save result.
7. Return result to frontend.

Possible responses:

```json
{
  "status": "success",
  "message": "Number added and bundle provisioned successfully."
}
```

```json
{
  "status": "exists",
  "message": "This number is already active."
}
```

```json
{
  "status": "error",
  "message": "Invalid mobile number format."
}
```

---

### 12.3 List numbers

```text
GET /numbers
```

Returns:

```json
[
  {
    "mobile_number": "610000000",
    "status": "active",
    "last_success_at": "2026-04-20T13:00:00",
    "next_run_at": "2026-04-21T13:00:00",
    "failure_count": 0,
    "last_response_message": "Subscription successful."
  }
]
```

---

### 12.4 Pause number

```text
PATCH /numbers/{mobile_number}/pause
```

Behavior:

```text
Set status = paused
```

---

### 12.5 Resume number

```text
PATCH /numbers/{mobile_number}/resume
```

Behavior:

```text
Set status = active
Set next_run_at = now
```

---

### 12.6 Stop number

```text
PATCH /numbers/{mobile_number}/stop
```

Behavior:

```text
Set status = stopped
```

---

### 12.7 Retry number

```text
POST /numbers/{mobile_number}/retry
```

Behavior:

1. Verify Firebase token.
2. Check duplicate-prevention rule.
3. If last success was recent, skip.
4. Otherwise call Hormuud `/subscribe`.
5. Save result.

---

### 12.8 Check customer offer

```text
GET /numbers/{mobile_number}/offer
```

Behavior:

1. Verify Firebase token.
2. Call Hormuud `GET /customer-offer`.
3. Filter active offers.
4. Return result.

---

### 12.9 Daily provisioning job

```text
POST /jobs/provision-daily
```

This endpoint should not be called by normal frontend users. It should be called by Cloud Scheduler.

Behavior:

1. Verify scheduler secret or Google service identity.
2. Fetch active numbers where `next_run_at <= now`.
3. For each number:
   - Apply duplicate-prevention check.
   - Call Hormuud `/subscribe`.
   - Save log.
   - Update number record.
4. Return summary.

Example response:

```json
{
  "processed": 120,
  "successful": 116,
  "failed": 4,
  "skipped": 8
}
```

---

## 13. Minimal FastAPI project structure

Recommended folder structure:

```text
getphone-bundles-backend/
│
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── hormuud_client.py
│   ├── services.py
│   ├── utils.py
│   └── routes/
│       ├── numbers.py
│       └── jobs.py
│
├── requirements.txt
├── Dockerfile
└── README.md
```

### `requirements.txt`

```txt
fastapi
uvicorn[standard]
sqlalchemy
psycopg2-binary
pydantic
pydantic-settings
httpx
firebase-admin
python-dotenv
```

For production, versions should be pinned. For a short temporary system, this is acceptable during rapid development, but the deployed version should still be tested carefully.

---

## 14. Example backend configuration

### `config.py`

```python
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    HORMUUD_BASE_URL: str = "https://hintegrations.hormuud.com/api"
    HORMUUD_API_KEY: str

    OFFER_ID: str = "daily"
    PRODUCT_ID: str = "3000060"

    DAILY_DEDUP_HOURS: int = 20
    SCHEDULER_SECRET: str

    class Config:
        env_file = ".env"


settings = Settings()
```

In Cloud Run, these values should come from environment variables or Secret Manager.

---

## 15. Database connection

### `database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings


engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=5,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 16. SQLAlchemy models

### `models.py`

```python
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database import Base


class BundleNumber(Base):
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
```

---

## 17. Hormuud API client

### `hormuud_client.py`

```python
import httpx
from app.config import settings


class HormuudClient:
    def __init__(self):
        self.base_url = settings.HORMUUD_BASE_URL.rstrip("/")
        self.headers = {
            "Authorization": f"Bearer {settings.HORMUUD_API_KEY}",
            "Content-Type": "application/json",
        }

    async def subscribe(self, mobile_number: str) -> dict:
        url = f"{self.base_url}/subscribe"

        payload = {
            "mobileNumber": mobile_number,
            "offerID": settings.OFFER_ID,
            "productId": settings.PRODUCT_ID,
        }

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, json=payload, headers=self.headers)

        try:
            body = response.json()
        except Exception:
            body = {
                "code": str(response.status_code),
                "status": "error",
                "message": response.text,
            }

        return {
            "http_status": response.status_code,
            "body": body,
        }

    async def customer_offer(self, mobile_number: str) -> dict:
        url = f"{self.base_url}/customer-offer"

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.get(
                url,
                params={"mobileNumber": mobile_number},
                headers={"Authorization": self.headers["Authorization"]},
            )

        try:
            body = response.json()
        except Exception:
            body = {
                "code": str(response.status_code),
                "status": "error",
                "message": response.text,
            }

        return {
            "http_status": response.status_code,
            "body": body,
        }
```

---

## 18. Mobile number validation

Keep validation simple.

### `utils.py`

```python
import re


def normalize_mobile_number(raw_number: str) -> str:
    number = raw_number.strip().replace(" ", "").replace("+", "")

    # If staff enters 25261xxxxxxx, convert to 61xxxxxxx if Hormuud expects local format.
    # Confirm this rule before enabling it.
    if number.startswith("252"):
        number = number[3:]

    return number


def is_valid_mobile_number(number: str) -> bool:
    # Example only. Confirm exact Hormuud format.
    return bool(re.fullmatch(r"6[0-9]{8}", number))
```

Do not assume the final format until the Getphone technical team confirms it with the Hormuud integration team. The API examples use a 9-digit format like `610000000`, so the temporary system can start with that pattern if confirmed.

---

## 19. Firebase authentication verification

The frontend should send the Firebase ID token in the request header:

```text
Authorization: Bearer <FIREBASE_ID_TOKEN>
```

The backend should verify it.

### `auth.py`

```python
from fastapi import HTTPException, Header
import firebase_admin
from firebase_admin import auth as firebase_auth


if not firebase_admin._apps:
    firebase_admin.initialize_app()


async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.replace("Bearer ", "").strip()

    try:
        decoded_token = firebase_auth.verify_id_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")

    email = decoded_token.get("email")

    if not email:
        raise HTTPException(status_code=403, detail="User email not found")

    # Temporary access control for the two-week system.
    # Replace these examples with real authorized Getphone staff emails.
    allowed_emails = {
        "admin@getphone.example",
        "ops@getphone.example",
    }

    if email not in allowed_emails:
        raise HTTPException(status_code=403, detail="User not allowed")

    return {
        "uid": decoded_token.get("uid"),
        "email": email,
    }
```

For the two-week temporary solution, an email allowlist is acceptable.

For a longer-term system, roles should be stored in Firestore or PostgreSQL.

---

## 20. Provisioning service logic

### `services.py`

```python
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.config import settings
from app.models import BundleNumber, BundleCallLog
from app.hormuud_client import HormuudClient


def should_skip_due_to_recent_success(record: BundleNumber) -> bool:
    if not record.last_success_at:
        return False

    cutoff = datetime.utcnow() - timedelta(hours=settings.DAILY_DEDUP_HOURS)
    return record.last_success_at >= cutoff


async def provision_bundle(
    db: Session,
    mobile_number: str,
    triggered_by: str,
) -> dict:
    record = (
        db.query(BundleNumber)
        .filter(BundleNumber.mobile_number == mobile_number)
        .first()
    )

    if not record:
        return {
            "status": "error",
            "message": "Number not found",
        }

    if record.status != "active":
        return {
            "status": "skipped",
            "message": f"Number is {record.status}",
        }

    if should_skip_due_to_recent_success(record):
        return {
            "status": "skipped",
            "message": "Bundle already provisioned recently",
        }

    client = HormuudClient()
    result = await client.subscribe(mobile_number)

    http_status = result["http_status"]
    body = result["body"]

    response_code = str(body.get("code", ""))
    response_status = body.get("status", "")
    response_message = body.get("message", "")

    log = BundleCallLog(
        mobile_number=mobile_number,
        call_type="subscribe",
        triggered_by=triggered_by,
        http_status=http_status,
        response_code=response_code,
        response_status=response_status,
        response_message=response_message,
    )
    db.add(log)

    now = datetime.utcnow()

    record.last_attempt_at = now
    record.last_response_status = response_status
    record.last_response_message = response_message

    if http_status == 200 and response_status == "success" and response_code == "0":
        record.last_success_at = now
        record.next_run_at = now + timedelta(hours=24)
        record.failure_count = 0
    else:
        record.failure_count += 1
        record.next_run_at = now + timedelta(hours=1)

    db.commit()

    return {
        "status": response_status,
        "http_status": http_status,
        "code": response_code,
        "message": response_message,
    }
```

---

## 21. FastAPI routes

### `routes/numbers.py`

```python
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import BundleNumber
from app.auth import get_current_user
from app.services import provision_bundle
from app.utils import normalize_mobile_number, is_valid_mobile_number


router = APIRouter(prefix="/numbers", tags=["numbers"])


@router.post("")
async def add_number(
    payload: dict,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    raw_number = payload.get("mobile_number", "")
    mobile_number = normalize_mobile_number(raw_number)

    if not is_valid_mobile_number(mobile_number):
        raise HTTPException(status_code=400, detail="Invalid mobile number format")

    existing = (
        db.query(BundleNumber)
        .filter(BundleNumber.mobile_number == mobile_number)
        .first()
    )

    if existing:
        if existing.status == "stopped":
            existing.status = "active"
            existing.next_run_at = datetime.utcnow()
            existing.created_by = user["email"]
            db.commit()
        else:
            return {
                "status": "exists",
                "message": "Number already exists",
                "mobile_number": mobile_number,
            }
    else:
        record = BundleNumber(
            mobile_number=mobile_number,
            status="active",
            next_run_at=datetime.utcnow(),
            created_by=user["email"],
        )
        db.add(record)
        db.commit()

    result = await provision_bundle(
        db=db,
        mobile_number=mobile_number,
        triggered_by="manual",
    )

    return {
        "mobile_number": mobile_number,
        "provisioning_result": result,
    }


@router.get("")
def list_numbers(
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    records = db.query(BundleNumber).order_by(BundleNumber.created_at.desc()).all()

    return [
        {
            "mobile_number": r.mobile_number,
            "status": r.status,
            "last_attempt_at": r.last_attempt_at,
            "last_success_at": r.last_success_at,
            "next_run_at": r.next_run_at,
            "failure_count": r.failure_count,
            "last_response_status": r.last_response_status,
            "last_response_message": r.last_response_message,
        }
        for r in records
    ]


@router.patch("/{mobile_number}/pause")
def pause_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "paused"
    db.commit()

    return {"status": "success", "message": "Number paused"}


@router.patch("/{mobile_number}/resume")
def resume_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "active"
    record.next_run_at = datetime.utcnow()
    db.commit()

    return {"status": "success", "message": "Number resumed"}


@router.patch("/{mobile_number}/stop")
def stop_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    record = db.query(BundleNumber).filter_by(mobile_number=mobile_number).first()

    if not record:
        raise HTTPException(status_code=404, detail="Number not found")

    record.status = "stopped"
    db.commit()

    return {"status": "success", "message": "Number stopped"}


@router.post("/{mobile_number}/retry")
async def retry_number(
    mobile_number: str,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    result = await provision_bundle(
        db=db,
        mobile_number=mobile_number,
        triggered_by="admin_retry",
    )

    return result
```

---

## 22. Daily job route

### `routes/jobs.py`

```python
from datetime import datetime
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import BundleNumber
from app.services import provision_bundle


router = APIRouter(prefix="/jobs", tags=["jobs"])


def verify_scheduler_secret(x_scheduler_secret: str = Header(None)):
    if not x_scheduler_secret:
        raise HTTPException(status_code=401, detail="Missing scheduler secret")

    if x_scheduler_secret != settings.SCHEDULER_SECRET:
        raise HTTPException(status_code=403, detail="Invalid scheduler secret")


@router.post("/provision-daily")
async def provision_daily(
    db: Session = Depends(get_db),
    _: None = Depends(verify_scheduler_secret),
):
    now = datetime.utcnow()

    records = (
        db.query(BundleNumber)
        .filter(BundleNumber.status == "active")
        .filter(BundleNumber.next_run_at <= now)
        .all()
    )

    summary = {
        "processed": 0,
        "successful": 0,
        "failed": 0,
        "skipped": 0,
    }

    for record in records:
        summary["processed"] += 1

        result = await provision_bundle(
            db=db,
            mobile_number=record.mobile_number,
            triggered_by="scheduler",
        )

        if result["status"] == "success":
            summary["successful"] += 1
        elif result["status"] == "skipped":
            summary["skipped"] += 1
        else:
            summary["failed"] += 1

    return summary
```

For a more secure production setup, use Cloud Run service-to-service authentication instead of only a shared scheduler secret. For a two-week internal temporary tool, a strong scheduler secret is acceptable, but authenticated Cloud Scheduler-to-Cloud Run is better.

---

## 23. Main FastAPI app

### `main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import numbers, jobs


app = FastAPI(
    title="Getphone Temporary Bundle Provisioning API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://YOUR_FIREBASE_SITE.web.app",
        "https://YOUR_CUSTOM_DOMAIN.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(numbers.router)
app.include_router(jobs.router)
```

Replace:

```text
https://YOUR_FIREBASE_SITE.web.app
https://YOUR_CUSTOM_DOMAIN.com
```

with the actual Firebase Hosting URLs.

Do not use:

```python
allow_origins=["*"]
```

for this system, because the backend should only be callable from Getphone's admin frontend.

---

## 24. Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
```

Cloud Run expects the service to listen on the port provided through the `PORT` environment variable.

---

## 25. Google Cloud setup steps

### 25.1 Create or select a Google Cloud project

Use one project for this temporary system.

Example project name:

```text
getphone-temporary-bundles
```

### 25.2 Enable required APIs

Enable:

```text
Cloud Run API
Cloud SQL Admin API
Secret Manager API
Cloud Scheduler API
Artifact Registry API
Cloud Build API
```

Using `gcloud`:

```bash
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable cloudscheduler.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

---

## 26. Create Cloud SQL PostgreSQL database

### 26.1 Create PostgreSQL instance

Example:

```bash
gcloud sql instances create getphone-bundles-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

For Somalia/Kenya latency, a nearby region should be selected based on Getphone's Google Cloud availability, cost, and compliance preferences. For a two-week system, the main priority is reliability and simplicity.

### 26.2 Create database

```bash
gcloud sql databases create getphone_bundles \
  --instance=getphone-bundles-db
```

### 26.3 Create database user

```bash
gcloud sql users create getphone_app \
  --instance=getphone-bundles-db \
  --password="USE_A_STRONG_PASSWORD"
```

Do not commit the password to GitHub.

---

## 27. Store secrets in Secret Manager

Create secrets:

```bash
echo -n "HORMUUD_API_KEY" | gcloud secrets create hormuud-api-key --data-file=-
echo -n "STRONG_RANDOM_SCHEDULER_SECRET" | gcloud secrets create scheduler-secret --data-file=-
echo -n "DATABASE_URL_HERE" | gcloud secrets create database-url --data-file=-
```

The database URL will look like this if using a Cloud SQL Unix socket pattern:

```text
postgresql://getphone_app:DB_PASSWORD@/getphone_bundles?host=/cloudsql/PROJECT_ID:REGION:getphone-bundles-db
```

---

## 28. Deploy FastAPI to Cloud Run

From the backend project directory:

```bash
gcloud run deploy getphone-bundles-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --add-cloudsql-instances PROJECT_ID:REGION:getphone-bundles-db \
  --set-secrets DATABASE_URL=database-url:latest,HORMUUD_API_KEY=hormuud-api-key:latest,SCHEDULER_SECRET=scheduler-secret:latest \
  --set-env-vars HORMUUD_BASE_URL=https://hintegrations.hormuud.com/api,OFFER_ID=daily,PRODUCT_ID=3000060,DAILY_DEDUP_HOURS=20
```

Why `--allow-unauthenticated`?

Because the frontend users will call the API from a browser. The backend itself will still verify Firebase tokens for normal user routes. For the scheduler route, it verifies the scheduler secret.

A stricter architecture can separate public frontend endpoints from private scheduler endpoints, but for a two-week temporary solution, this is acceptable if Firebase token verification and scheduler secret verification are implemented properly.

---

## 29. Run database migrations

For a small temporary solution, the simplest approach is to manually run the two `CREATE TABLE` scripts in Cloud SQL.

You can use:

```bash
gcloud sql connect getphone-bundles-db --user=getphone_app
```

Then run:

```sql
CREATE TABLE bundle_numbers (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    last_attempt_at TIMESTAMP NULL,
    last_success_at TIMESTAMP NULL,
    next_run_at TIMESTAMP NULL,
    last_response_status VARCHAR(50) NULL,
    last_response_message TEXT NULL,
    failure_count INTEGER NOT NULL DEFAULT 0,
    created_by VARCHAR(150) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE bundle_call_logs (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(20) NOT NULL,
    call_type VARCHAR(50) NOT NULL DEFAULT 'subscribe',
    triggered_by VARCHAR(50) NOT NULL,
    http_status INTEGER NULL,
    response_code VARCHAR(20) NULL,
    response_status VARCHAR(50) NULL,
    response_message TEXT NULL,
    attempted_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

For a longer-term system, use Alembic migrations. For two weeks, manual SQL is fine.

---

## 30. Configure Cloud Scheduler

Create a scheduler job that calls the backend daily.

Example: run every day at 2:00 AM.

```bash
gcloud scheduler jobs create http provision-daily-bundles \
  --schedule="0 2 * * *" \
  --uri="https://YOUR_CLOUD_RUN_URL/jobs/provision-daily" \
  --http-method=POST \
  --headers="X-Scheduler-Secret=STRONG_RANDOM_SCHEDULER_SECRET" \
  --time-zone="Africa/Mogadishu"
```

Recommended time zone:

```text
Africa/Mogadishu
```

Since Getphone's PAYG launch is in Somalia.

Do not put the real scheduler secret in shared documents.

---

## 31. Frontend integration with Firebase

The frontend should:

1. Use Firebase Authentication.
2. Get the user's ID token after login.
3. Send the token to FastAPI in the `Authorization` header.

Example JavaScript:

```javascript
import { getAuth } from "firebase/auth";

async function addNumber(mobileNumber) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const token = await user.getIdToken();

  const response = await fetch("https://YOUR_CLOUD_RUN_URL/numbers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      mobile_number: mobileNumber,
    }),
  });

  return await response.json();
}
```

---

## 32. Recommended user interface behavior

When staff adds a number, the system should show clear messages.

### Case 1: Success

Show:

```text
Bundle activated successfully for 610000000.
```

### Case 2: Number already exists

Show:

```text
This number already exists in the active bundle list.
```

### Case 3: Recently provisioned

Show:

```text
This number already received today's bundle. The system will try again in the next daily cycle.
```

### Case 4: Invalid number

Show:

```text
Invalid mobile number format. Please enter the number in the required Hormuud format, for example 610000000.
```

### Case 5: Hormuud API error

Show:

```text
Bundle provisioning failed. Please check the error message and retry later.
```

Also show the API message, for example:

```text
Invalid offer id.
```

or:

```text
Invalid mobile number format.
```

---

## 33. Error handling strategy

### 33.1 For 400 errors

Likely causes:

```text
Invalid number
Invalid offerID
Invalid productId
Wrong casing
Missing required field
```

Action:

```text
Do not retry automatically many times.
Show error to staff.
Fix input or configuration.
```

### 33.2 For 401 errors

Likely causes:

```text
Wrong API key
Expired API key
Missing Authorization header
Credential changed
```

Action:

```text
Stop retries.
Alert Getphone technical team.
Check Secret Manager.
Contact Hormuud if needed.
```

### 33.3 For 500 errors

Likely causes:

```text
Hormuud backend issue
Temporary processing failure
```

Action:

```text
Retry later.
Set next_run_at = now + 1 hour.
```

### 33.4 For network timeout

Action:

```text
Retry later.
Do not mark as successful.
Optionally check customer-offer before retrying.
```

---

## 34. Retry strategy

For the two-week system, use simple retries.

### 34.1 Immediate manual add

If the first attempt fails because of 500 or timeout:

```text
Set failure_count = 1
Set next_run_at = now + 1 hour
Show staff: Pending retry
```

### 34.2 Scheduler retry

If daily provisioning fails:

```text
Retry after 1 hour
Maximum 3 failures per day
After 3 failures, keep active but flag as failed
```

Simple logic:

| Failure count | Next action |
|---|---|
| 1 | Retry after 1 hour |
| 2 | Retry after 2 hours |
| 3 | Retry after 4 hours |
| 4+ | Keep active but mark for manual review |

Do not retry rapidly because that may create unnecessary traffic and confusion.

---

## 35. Logging and monitoring

For a temporary system, logs are still important.

### 35.1 Application logs

FastAPI should log:

```text
Number added
Subscribe request sent
Subscribe success
Subscribe failure
Scheduler started
Scheduler completed
Scheduler failed
Unauthorized access attempt
```

Do not log the Hormuud API key.

Do not log full Authorization headers.

### 35.2 Database logs

The `bundle_call_logs` table should store API outcomes.

### 35.3 Cloud Run logs

Cloud Run automatically captures container logs. Engineers should check Cloud Run logs when there is an issue.

Recommended log message style:

```text
INFO: provision_bundle mobile_number=610000000 triggered_by=scheduler status=success
ERROR: provision_bundle mobile_number=610000000 http_status=500 message="..."
```

Avoid logging sensitive credentials.

---

## 36. Data privacy

Even though only phone numbers are stored, mobile numbers are still personal data. Treat them carefully.

Minimum controls:

```text
Only authorized staff can log in.
Only backend can access database.
Do not export numbers casually.
Do not send database dumps through WhatsApp.
Delete or archive the database after the two-week temporary period.
```

After the temporary period ends, Getphone should decide whether to:

```text
Delete all records
Export logs for reconciliation and then delete operational data
Keep minimal audit logs for a defined retention period
```

Recommended approach:

```text
After ZTE/eGet automation is live, export a final reconciliation report, then delete the temporary database after management approval.
```

---

## 37. Operational process for Getphone staff

### 37.1 Daily routine

Every morning, one assigned operations staff member should:

1. Open the dashboard.
2. Check `Successful today`.
3. Check `Failed today`.
4. Retry failed numbers if needed.
5. Escalate repeated failures to the technical team.

### 37.2 When adding a customer

1. Confirm customer bought PAYG phone.
2. Enter Hormuud number.
3. Click Add.
4. Confirm success message.
5. If failed, check message and retry if appropriate.

### 37.3 When a customer complains

1. Search number.
2. Check last success time.
3. Check logs.
4. Click "Check Offer" if needed.
5. Retry only if the number has not already received a recent successful bundle.

---

## 38. Engineering checklist

### 38.1 Before development

```text
Confirm exact mobile number format expected by Hormuud.
Confirm final offerID and productId.
Confirm daily provisioning time.
Confirm who can access the admin page.
Confirm whether stopped numbers should be retained or deleted.
```

### 38.2 Backend

```text
Create FastAPI project.
Create database tables.
Implement Firebase token verification.
Implement add number endpoint.
Implement list numbers endpoint.
Implement pause/resume/stop.
Implement retry endpoint.
Implement Hormuud subscribe client.
Implement scheduler job endpoint.
Implement logs.
Implement duplicate prevention.
```

### 38.3 Frontend

```text
Create login page.
Create dashboard page.
Create add number form.
Create active numbers table.
Create actions: pause, resume, stop, retry.
Create logs view.
Show clear success/failure messages.
```

### 38.4 Google Cloud

```text
Create Cloud SQL database.
Create Secret Manager secrets.
Deploy FastAPI to Cloud Run.
Connect Cloud Run to Cloud SQL.
Configure environment variables.
Configure Firebase Hosting CORS origin.
Create Cloud Scheduler job.
Test scheduler endpoint.
```

### 38.5 Testing

```text
Test login with allowed user.
Test login with disallowed user.
Test add valid number.
Test add duplicate number.
Test invalid number.
Test Hormuud success response.
Test Hormuud 400 error.
Test Hormuud 401 error.
Test retry logic.
Test duplicate prevention.
Test daily scheduler.
Test pause/stop behavior.
```

---

## 39. Recommended final design decision

For this two-week temporary solution, Getphone should not overbuild.

Use:

```text
Firebase Hosting for the admin page
Firebase Authentication for staff login
FastAPI on Cloud Run for backend
Cloud SQL PostgreSQL for mobile numbers and logs
Secret Manager for Hormuud API key
Cloud Scheduler for daily provisioning
```

Store only:

```text
Mobile number
Status
Last attempt
Last success
Next run
Failure count
Last API response
Basic logs
```

Do not store:

```text
Customer name
National ID
IMEI
Device details
KYC data
Payment details
Personal profile information
```

The system should remain simple, secure, and easy to remove after the ZTE/eGet automatic onboarding flow is ready.
