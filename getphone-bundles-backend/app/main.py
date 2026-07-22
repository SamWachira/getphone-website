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

# CORS — allow Getphone frontend domains and regex fallback
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]
if "https://getphonelimited.com" not in origins:
    origins.append("https://getphonelimited.com")
if "https://www.getphonelimited.com" not in origins:
    origins.append("https://www.getphonelimited.com")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.getphonelimited\.com|https://.*\.web\.app|https://.*\.firebaseapp\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.error("Unhandled exception on %s: %s", request.url.path, str(exc), exc_info=True)
    origin = request.headers.get("origin", "*")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)},
        headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
        },
    )


@app.on_event("startup")
def on_startup():
    from app.database import init_db_schema
    init_db_schema()


@app.get("/health")
def health_check():
    """Health check endpoint for Cloud Run and monitoring."""
    return {"status": "ok"}


# Include route modules
app.include_router(numbers.router)
app.include_router(jobs.router)
app.include_router(logs.router)
