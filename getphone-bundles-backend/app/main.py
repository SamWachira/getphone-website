import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.routes import numbers, jobs, logs


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

# Rate limiter (in-memory, suitable for single Cloud Run instance)
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Getphone Temporary Bundle Provisioning API",
    description="Internal API for provisioning daily Hormuud data/voice bundles to Getphone PAYG customers.",
    version="1.0.2",
    # Security: Disable Swagger/ReDoc in production to prevent API schema exposure (L2)
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

# Attach rate limiter to app
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS — only allow requests from Getphone's Firebase Hosting domains
# Security: Restrict methods and headers to only those actually used (H1)
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.get("/health")
def health_check():
    """Health check endpoint for Cloud Run and monitoring."""
    return {"status": "ok"}


# Include route modules
app.include_router(numbers.router)
app.include_router(jobs.router)
app.include_router(logs.router)
