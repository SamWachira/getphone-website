import base64
import logging
import httpx
from app.config import settings

logger = logging.getLogger(__name__)


class TopupApiClient:
    """
    Stateless HTTP Basic Auth client for the Hormuud & Somnet Topup API (opsapi.hormuud.com).

    Endpoints:
    - Hormuud: POST /api/v1/topup/airtime
    - Somnet:  POST /api/v1/topup/somnet/airtime
    """

    def __init__(self):
        self.base_url = settings.TOPUP_API_BASE_URL.rstrip("/")

    def _get_auth_header(self) -> str:
        """Construct the HTTP Basic Authorization header value."""
        credentials = f"{settings.TOPUP_API_USERNAME}:{settings.TOPUP_API_PASSWORD}"
        encoded = base64.b64encode(credentials.encode("utf-8")).decode("utf-8")
        return f"Basic {encoded}"

    async def topup_airtime(
        self,
        network: str,
        receiver: str,
        amount: float | int | None = None,
        bundle_id: str | None = None,
        callback_url: str | None = None,
    ) -> dict:
        """
        Execute an airtime / bundle topup request.

        :param network: 'hormuud' or 'somnet'
        :param receiver: 9-digit MSISDN (e.g. 61XXXXXXX or 68XXXXXXX)
        :param amount: Numeric amount (defaults to DEFAULT_TOPUP_AMOUNT, e.g. 1)
        :param bundle_id: Unique tenant reference for reconciliation
        :param callback_url: Optional HTTPS URL for async callback delivery
        """
        net = network.lower().strip()
        if net == "somnet":
            path = "/topup/somnet/airtime"
        else:
            path = "/topup/airtime"

        url = f"{self.base_url}{path}"
        topup_amount = amount if amount is not None else settings.DEFAULT_TOPUP_AMOUNT

        payload = {
            "receiver": receiver,
            "amount": topup_amount,
        }

        if bundle_id:
            payload["bundleId"] = bundle_id

        if callback_url:
            payload["callbackUrl"] = callback_url

        headers = {
            "Authorization": self._get_auth_header(),
            "Content-Type": "application/json",
        }

        logger.info("Calling Topup API (%s) for %s [bundleId: %s]", net, receiver, bundle_id)

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(url, json=payload, headers=headers)

            http_status = response.status_code

            try:
                body = response.json()
            except Exception:
                body = {
                    "ResultCode": str(http_status),
                    "ResultDesc": response.text or f"HTTP {http_status} Error",
                }

            result_code = str(body.get("ResultCode", body.get("code", "")))
            result_desc = body.get("ResultDesc", body.get("message", body.get("error", "")))
            transfer_id = body.get("transferId")

            return {
                "http_status": http_status,
                "body": body,
                "result_code": result_code,
                "result_desc": result_desc,
                "transfer_id": transfer_id,
                "success": (http_status == 200 and result_code == "0"),
            }

        except Exception as e:
            logger.error("Topup API connection error for %s (%s): %s", receiver, net, str(e))
            return {
                "http_status": 500,
                "body": {"error": str(e)},
                "result_code": "500",
                "result_desc": f"Network error: {str(e)}",
                "transfer_id": None,
                "success": False,
            }
