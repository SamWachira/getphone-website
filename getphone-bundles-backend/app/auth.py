import logging
from fastapi import HTTPException, Header
import firebase_admin
from firebase_admin import auth as firebase_auth


logger = logging.getLogger(__name__)

# Initialize Firebase Admin SDK (uses GOOGLE_APPLICATION_CREDENTIALS or
# Application Default Credentials on Cloud Run).
if not firebase_admin._apps:
    firebase_admin.initialize_app()

# Only these emails can access the admin panel.
# For the temporary system, a hardcoded allowlist is acceptable.
ALLOWED_EMAILS = {
    "info@getphonelimited.com",
}


async def get_current_user(authorization: str = Header(None)) -> dict:
    """
    FastAPI dependency that verifies the Firebase ID token from the
    Authorization header and checks the user's email against the allowlist.

    Returns a dict with uid and email on success.
    Raises HTTPException on auth failure.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    token = authorization.replace("Bearer ", "").strip()

    try:
        decoded_token = firebase_auth.verify_id_token(token)
    except Exception as e:
        logger.warning("Firebase token verification failed: %s", str(e))
        raise HTTPException(status_code=401, detail="Invalid or expired Firebase token")

    email = decoded_token.get("email")

    if not email:
        raise HTTPException(status_code=403, detail="User email not found in token")

    if email not in ALLOWED_EMAILS:
        logger.warning("Unauthorized access attempt by: %s", email)
        raise HTTPException(status_code=403, detail="User not authorized to access this system")

    return {
        "uid": decoded_token.get("uid"),
        "email": email,
    }
