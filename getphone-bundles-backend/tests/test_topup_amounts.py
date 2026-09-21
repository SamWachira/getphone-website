import asyncio
import json

import httpx
import pytest

from app.config import Settings
from app import topup_client


@pytest.mark.parametrize(
    ("network", "path"),
    [
        ("hormuud", "/api/v1/topup/airtime"),
        ("somnet", "/api/v1/topup/somnet/airtime"),
    ],
)
def test_network_topup_amount_and_endpoint(monkeypatch, network, path):
    config = Settings(
        _env_file=None,
        TOPUP_API_BASE_URL="https://topup.example/api/v1",
        TOPUP_API_USERNAME="test-user",
        TOPUP_API_PASSWORD="test-password",
        HORMUUD_TOPUP_AMOUNT=0.20,
        SOMNET_TOPUP_AMOUNT=0.20,
    )
    monkeypatch.setattr(topup_client, "settings", config)
    calls = []

    def handler(request):
        calls.append((str(request.url), json.loads(request.content)))
        return httpx.Response(200, json={"ResultCode": "0", "transferId": "test-transfer"})

    transport = httpx.MockTransport(handler)
    async_client = httpx.AsyncClient
    monkeypatch.setattr(
        topup_client.httpx,
        "AsyncClient",
        lambda **kwargs: async_client(transport=transport, **kwargs),
    )

    result = asyncio.run(
        topup_client.TopupApiClient().topup_airtime(
            network=network,
            receiver="615556110" if network == "hormuud" else "685556110",
            bundle_id="test-bundle",
        )
    )

    assert result["success"] is True
    assert len(calls) == 1
    assert calls[0][0].endswith(path)
    assert calls[0][1]["amount"] == 0.20
    assert calls[0][1]["bundleId"] == "test-bundle"
