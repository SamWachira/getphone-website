# Getphone Temporary Bundle Provisioning Backend

Internal FastAPI backend for provisioning daily Hormuud data/voice bundles to Getphone PAYG customers in Somalia.

## Purpose

This is a **temporary system** used while the automatic ZTE/eGet onboarding is being developed. It allows authorized Getphone staff to register customer Hormuud numbers, which then receive daily bundles automatically.

## Architecture

- **Framework**: Python FastAPI
- **Database**: Cloud SQL PostgreSQL
- **Deployment**: Google Cloud Run
- **Auth**: Firebase Authentication (ID token verification)
- **Scheduling**: Google Cloud Scheduler (daily at midnight Africa/Mogadishu)

## API Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | None | Health check |
| POST | `/numbers` | Firebase | Add number + provision |
| GET | `/numbers` | Firebase | List all numbers |
| PATCH | `/numbers/{num}/pause` | Firebase | Pause a number |
| PATCH | `/numbers/{num}/resume` | Firebase | Resume a number |
| PATCH | `/numbers/{num}/stop` | Firebase | Stop a number |
| POST | `/numbers/{num}/retry` | Firebase | Retry provisioning |
| GET | `/numbers/{num}/offer` | Firebase | Check Hormuud offers |
| GET | `/logs` | Firebase | View API call logs |
| GET | `/dashboard` | Firebase | Dashboard metrics |
| POST | `/jobs/provision-daily` | Scheduler secret | Daily job |

## Local Development

```bash
# Copy and fill in environment variables
cp .env.example .env

# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn app.main:app --reload --port 8080
```

## Deployment

See `DEPLOY.md` in the repo root for full deployment instructions.
