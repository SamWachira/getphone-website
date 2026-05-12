import time
import logging
import httpx
from app.config import settings


logger = logging.getLogger(__name__)


class HormuudTokenManager:
    """
    Manages the Hormuud API authentication token.

    Calls POST /token with username/password to obtain a short-lived Bearer token.
    Caches the token in memory and refreshes it 10 minutes before expiry (at 50 min).
    On 401, forces a refresh and retries once.
    """

    def __init__(self):
        self._token: str | None = None
        self._token_expires_at: float = 0.0

    def _is_token_valid(self) -> bool:
        """Check if the cached token exists and is not near expiry."""
        if not self._token:
            return False
        # Refresh 10 minutes (600 seconds) before actual expiry
        return time.time() < (self._token_expires_at - 600)

    async def _fetch_new_token(self) -> str:
        """Call Hormuud's /token endpoint to get a fresh Bearer token."""
        url = f"{settings.HORMUUD_BASE_URL.rstrip('/')}/token"

        payload = {
            "username": settings.HORMUUD_USERNAME,
            "password": settings.HORMUUD_PASSWORD,
        }

        logger.info("Requesting new Hormuud auth token")

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                url,
                json=payload,
                headers={"Content-Type": "application/json"},
            )

        if response.status_code != 200:
            logger.error(
                "Hormuud token request failed: HTTP %d - %s",
                response.status_code,
                response.text,
            )
            raise Exception(
                f"Failed to obtain Hormuud token: HTTP {response.status_code}"
            )

        data = response.json()
        token = data.get("token")

        if not token:
            raise Exception("Hormuud token response missing 'token' field")

        # Parse expiry — default to 1 hour if not provided
        expires_in = data.get("expiresIn", "1h")
        if isinstance(expires_in, str):
            # Handle formats like "1h", "3600", "3600s"
            expires_in = expires_in.lower().strip()
            if expires_in.endswith("h"):
                ttl_seconds = int(expires_in[:-1]) * 3600
            elif expires_in.endswith("m"):
                ttl_seconds = int(expires_in[:-1]) * 60
            elif expires_in.endswith("s"):
                ttl_seconds = int(expires_in[:-1])
            else:
                ttl_seconds = int(expires_in)
        else:
            ttl_seconds = int(expires_in)

        self._token = token
        self._token_expires_at = time.time() + ttl_seconds

        logger.info("Hormuud token obtained, expires in %d seconds", ttl_seconds)

        return token

    async def get_token(self) -> str:
        """Get a valid token, refreshing if necessary."""
        if self._is_token_valid():
            return self._token

        return await self._fetch_new_token()

    def invalidate(self):
        """Force token refresh on next call (used after 401 responses)."""
        self._token = None
        self._token_expires_at = 0.0


# Singleton token manager instance
_token_manager = HormuudTokenManager()


class HormuudClient:
    """
    Async HTTP client for the Hormuud Hintegrations API.

    Handles:
    - POST /subscribe — provision a daily bundle to a customer
    - GET /customer-offer — check a customer's current offers
    - Automatic token refresh and 401 retry
    """

    def __init__(self):
        self.base_url = settings.HORMUUD_BASE_URL.rstrip("/")

    async def _get_headers(self) -> dict:
        """Build request headers with the current Bearer token."""
        token = await _token_manager.get_token()
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

    async def _request_with_retry(self, method: str, url: str, **kwargs) -> dict:
        """
        Make an HTTP request with automatic 401 token refresh and retry.

        If Hormuud returns 401, invalidate the token, get a new one, and
        retry the request exactly once.
        """
        headers = await self._get_headers()
        kwargs["headers"] = headers

        async with httpx.AsyncClient(timeout=30) as client:
            response = await getattr(client, method)(url, **kwargs)

        # If 401, refresh token and retry once
        if response.status_code == 401:
            logger.warning("Hormuud returned 401, refreshing token and retrying")
            _token_manager.invalidate()
            headers = await self._get_headers()
            kwargs["headers"] = headers

            async with httpx.AsyncClient(timeout=30) as client:
                response = await getattr(client, method)(url, **kwargs)

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

    async def subscribe(self, mobile_number: str) -> dict:
        """
        Call POST /subscribe to provision the daily bundle for a customer.

        Returns dict with http_status and body.
        """
        url = f"{self.base_url}/subscribe"

        payload = {
            "mobileNumber": mobile_number,
            "offerID": settings.OFFER_ID,
            "productId": settings.PRODUCT_ID,
        }

        logger.info("Calling Hormuud subscribe for %s", mobile_number)

        return await self._request_with_retry("post", url, json=payload)

    async def customer_offer(self, mobile_number: str) -> dict:
        """
        Call GET /customer-offer to check a customer's current offers.

        Returns dict with http_status and body.
        """
        url = f"{self.base_url}/customer-offer"

        logger.info("Checking Hormuud offers for %s", mobile_number)

        return await self._request_with_retry(
            "get",
            url,
            params={"mobileNumber": mobile_number},
        )
