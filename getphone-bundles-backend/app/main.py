import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import numbers, jobs, logs


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

app = FastAPI(
    title="Getphone Temporary Bundle Provisioning API",
    description="Internal API for provisioning daily Hormuud data/voice bundles to Getphone PAYG customers.",
    version="1.0.0",
)

# CORS — only allow requests from Getphone's Firebase Hosting domains
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    """Health check endpoint for Cloud Run and monitoring."""
    return {"status": "ok"}


# Include route modules
app.include_router(numbers.router)
app.include_router(jobs.router)
app.include_router(logs.router)
