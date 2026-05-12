# Getphone - Hormuud Hintegration API Implementation Guide

**Document purpose:** This guide explains, step by step, how Getphone engineers should integrate the Hormuud Hintegration API so that eligible Getphone customers can receive free data and/or voice benefits after qualifying payments or business events.

**Audience:** Getphone engineering team, Getphone technical leadership, ZTE/eGet integration team, QA testers, and support operations teams.

**Important security note:** This guide intentionally does not include the real API username, password, access token, API key, or any other secret. Use the credentials already issued to Getphone by Hormuud and store them securely. Do not hard-code them in mobile apps, frontend code, screenshots, shared documents, Git repositories, tickets, or chat messages.

---

## 1. Executive implementation summary

Getphone needs to connect its payment and customer-management workflow to Hormuud's Hintegration API. The integration has two main technical actions:

1. **Subscribe customer to an offer** using `POST /subscribe`. This provisions a benefit such as a daily data or voice bundle to the customer's Hormuud mobile number.
2. **Check customer offer status** using `GET /customer-offer`. This allows Getphone or ZTE/eGet to confirm whether a customer currently has an active benefit and to reconcile historical benefit records.

The API uses Bearer authentication. In the tested Postman flow, Getphone first calls a token endpoint, receives a Bearer token, stores it temporarily, and then sends that token in the `Authorization` header for subsequent API calls. The source technical documents also describe Bearer API-key authentication. Engineering should therefore implement the integration in a way that supports the token-based flow already tested, while still treating the returned value as the Bearer credential required by Hormuud.

The most important implementation principle is this: **Getphone must not call Hormuud's subscribe endpoint blindly or repeatedly.** Before sending a benefit request, Getphone must determine that the customer is eligible, identify the correct configured offer, check whether the same benefit has already been issued for the same qualifying event, and then call Hormuud only once for that event. This is necessary because the API documentation confirms that the current API does not use an idempotency key.

---

## 2. Source materials used for this guide

This guide is based on the following materials supplied by Getphone:

1. Hormuud/Hintegration airtime API documentation.
2. Hormuud/Hintegration technical clarification document for ZTE/Getphone.
3. Screenshot of the API credentials email.
4. Screenshots of successful Postman tests for token generation, customer offer checking, and bundle subscription.

Where the written API documents and tested screenshots differ slightly, this guide explains the difference and gives a practical engineering approach.

---

## 3. Key terms

| Term | Meaning in this integration |
|---|---|
| Getphone | Smartphone financing company issuing devices to customers on deposit and installment terms. |
| Hormuud | Telecom provider whose API provisions customer benefits such as data or voice offers. |
| Hintegration API | Hormuud integration API used by external partners such as Getphone/ZTE to trigger offers and query customer offer status. |
| ZTE/eGet | Device financing and lock-system ecosystem that may trigger or coordinate PAYG customer workflows. |
| Customer mobile number | Hormuud mobile number belonging to the customer who should receive the benefit. |
| `offerID` | General offer category or duration label, for example `daily`. It must be sent exactly as Hormuud expects. |
| `productId` | Unique identifier for the exact commercial offer/package. It is the decisive identifier for provisioning the correct benefit. |
| Bearer token / API key | Authentication value sent in the `Authorization` header as `Bearer <value>`. |
| Benefit | Free data, free minutes, free voice bundle, or any other Hormuud-provisioned customer entitlement. |
| Qualifying event | Business event that makes a customer eligible for a benefit, for example a successful deposit payment, successful installment payment, or a daily entitlement run. |

---

## 4. API environment and base URL configuration

### 4.1 Do not hard-code the base URL

The API base URL must be stored as an environment variable or configuration value, not hard-coded throughout the codebase. Use a name such as:

```env
HORMUUD_BASE_URL=https://integrations.hormuud.com/api
```

or, if Hormuud confirms the host with the initial `h`:

```env
HORMUUD_BASE_URL=https://hintegrations.hormuud.com/api
```

### 4.2 Resolve the base URL difference before production

The supplied API documents refer to:

```text
https://hintegrations.hormuud.com/api/
```

The Postman screenshots show successful tests using a configured base URL similar to:

```text
https://integrations.hormuud.com/api
```

Before production release, Getphone engineers must confirm the production base URL with Hormuud in writing. Until then, keep the base URL configurable so that changing from one host to the other does not require code changes.

### 4.3 Use separate configurations for test and production

Create separate configurations for development, staging/UAT, and production.

```env
# Development or UAT
HORMUUD_BASE_URL=https://integrations.hormuud.com/api
HORMUUD_USERNAME=<issued_username>
HORMUUD_PASSWORD=<issued_password>
HORMUUD_TOKEN_TTL_SECONDS=3600
HORMUUD_TIMEOUT_SECONDS=30

# Production
HORMUUD_BASE_URL=<confirmed_production_base_url>
HORMUUD_USERNAME=<production_username>
HORMUUD_PASSWORD=<production_password>
HORMUUD_TOKEN_TTL_SECONDS=3600
HORMUUD_TIMEOUT_SECONDS=30
```

Never place these values in mobile applications, frontend JavaScript, or source-controlled files. They belong only in backend secret storage.

---

## 5. Authentication design

### 5.1 What the API expects

Authenticated calls must include this header:

```http
Authorization: Bearer <access_token_or_api_key>
```

For `POST /subscribe`, also include:

```http
Content-Type: application/json
```

### 5.2 Token endpoint flow

The credentials screenshot and Postman screenshots show that Getphone receives a token from:

```http
POST {{base_url}}/token
```

The token response contains fields similar to:

```json
{
  "token": "<long_token_value>",
  "tokenType": "Bearer",
  "expiresIn": "1h"
}
```

The implementation should treat this token as short-lived. If `expiresIn` is `1h`, the backend should refresh the token before it expires. A safe approach is to refresh after about 50 minutes instead of waiting for the full hour.

### 5.3 Recommended token-management logic

Implement a backend token manager with the following behavior:

1. Read `HORMUUD_USERNAME`, `HORMUUD_PASSWORD`, and `HORMUUD_BASE_URL` from backend secrets.
2. Before making a Hormuud API call, check whether a valid token already exists in memory or secure cache.
3. If no token exists, or the token is near expiry, call `POST /token` to get a new token.
4. Store the token in memory or secure server-side cache only.
5. Attach the token to subsequent calls as `Authorization: Bearer <token>`.
6. If an API call returns `401 Unauthorized`, refresh the token once and retry the request once.
7. If the retry also fails, mark the request as failed and alert engineering/support.

### 5.4 Where to store credentials and tokens

| Item | Recommended storage | Do not store in |
|---|---|---|
| Username | Secret manager / encrypted environment variable | Git, mobile app, frontend, documents |
| Password | Secret manager / encrypted environment variable | Git, mobile app, frontend, documents |
| Access token | Backend memory or secure server-side cache | Database unless encrypted, mobile app, frontend |
| Offer mapping | Database/config table | Hard-coded scattered constants |
| API response logs | Application logs with redaction | Plain logs containing token or password |

### 5.5 Never send Hormuud credentials to the customer device

The Getphone customer app, sales app, lock app, or any Android client must not call Hormuud directly using Getphone credentials. The safe pattern is:

```text
Mobile app / eGet system -> Getphone backend -> Hormuud API
```

This ensures secrets stay on the backend and Getphone can audit all benefit triggers.

---

## 6. API endpoints to implement

## 6.1 Endpoint 1: Get authentication token

### Purpose

To obtain the Bearer token that will be used to call `/subscribe` and `/customer-offer`.

### Method and URL

```http
POST {{HORMUUD_BASE_URL}}/token
```

### Headers

Use the header expected by Hormuud. In Postman, ensure the request is configured exactly as Hormuud requires. If the body is JSON, include:

```http
Content-Type: application/json
```

### Request body

Use the credential format issued by Hormuud. The exact body must follow Hormuud's token endpoint requirement. A common JSON pattern is:

```json
{
  "username": "<issued_username>",
  "password": "<issued_password>"
}
```

If Hormuud confirms a different field naming convention, implement that exact format and document it in the code comments and integration runbook.

### Successful response

```json
{
  "token": "<access_token>",
  "tokenType": "Bearer",
  "expiresIn": "1h"
}
```

### Implementation notes

The backend should parse `token`, confirm that `tokenType` is `Bearer`, calculate an expiry timestamp, and store the token securely until it is near expiry.

---

## 6.2 Endpoint 2: Subscribe customer to benefit offer

### Purpose

To provision a data/voice benefit to a customer's Hormuud mobile number.

### Method and URL

```http
POST {{HORMUUD_BASE_URL}}/subscribe
```

### Required headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Required request body

```json
{
  "mobileNumber": "610000000",
  "offerID": "daily",
  "productId": "3000060"
}
```

### Field rules

| Field | Required | Type | Meaning | Important rule |
|---|---:|---|---|---|
| `mobileNumber` | Yes | string | Customer's Hormuud number | Validate format before calling Hormuud. |
| `offerID` | Yes | string | General category/duration, such as `daily` | Use exact casing expected by Hormuud, for example lowercase `daily`. |
| `productId` | Yes | string | Unique package identifier | This is the decisive identifier for the exact offer. |

### Correct cURL example

```bash
curl -X POST "$HORMUUD_BASE_URL/subscribe" \
  -H "Authorization: Bearer $HORMUUD_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mobileNumber": "610000000",
    "offerID": "daily",
    "productId": "3000060"
  }'
```

### Successful response example

```json
{
  "code": "0",
  "message": "Subscription successful.",
  "status": "success"
}
```

The Postman screenshot also shows a success response with additional fields such as subscriber number, offer ID, and product ID. The backend should be flexible enough to store these additional fields when returned, but should rely on `code`, `status`, and `message` for the main success/failure decision.

### Important clarification about `offerID` and `productId`

The technical clarification document states that both `offerID` and `productId` are mandatory. `offerID` identifies the general category or duration, while `productId` is the primary key Hormuud uses internally for the exact commercial offer. Therefore, Getphone must never send `offerID` alone.

### Casing rule

Even if `GET /customer-offer` returns an offer label such as `Daily`, the `POST /subscribe` request should use the exact casing defined by Hormuud for provisioning, for example `daily`. Treat the request values as case-sensitive.

---

## 6.3 Endpoint 3: Query customer offer status

### Purpose

To confirm whether a customer has active or historical benefits.

### Method and URL

```http
GET {{HORMUUD_BASE_URL}}/customer-offer?mobileNumber=<customer_mobile_number>
```

### Required headers

```http
Authorization: Bearer <access_token>
```

### cURL example

```bash
curl -X GET "$HORMUUD_BASE_URL/customer-offer?mobileNumber=610000000" \
  -H "Authorization: Bearer $HORMUUD_ACCESS_TOKEN"
```

### Successful response example

```json
{
  "code": "0",
  "message": "Operation successful.",
  "status": "success",
  "offers": [
    {
      "offerName": "getPhone_24hours_0.25USD",
      "offerID": "Daily",
      "subscriptionStatus": "Active",
      "subscriptionStartTime": "2026-04-12T14:30:00Z",
      "subscriptionEndTime": "2026-04-13T14:30:00Z"
    }
  ]
}
```

### Parsing rule

The `offers` field is an array. It may include active and historical records. To identify current benefits, iterate through the array and select only records where:

```text
subscriptionStatus == "Active"
```

### Mapping rule

The `GET /customer-offer` response may not return `productId`. Because of that, Getphone should maintain its own package mapping registry. Use returned fields such as `offerName` and `offerID` to reconcile against the local registry where possible.

---

## 7. Offer and package mapping registry

### 7.1 Why a local registry is required

Hormuud confirmed that `offerID` and `productId` values are fixed and preconfigured. They do not need to be fetched in real time before every request. Getphone should store these mappings locally.

### 7.2 Minimum mapping table

Create a backend table or configuration registry like this:

| Column | Example | Purpose |
|---|---|---|
| `id` | `uuid` | Internal Getphone ID. |
| `benefit_code` | `DAILY_DATA_025` | Internal stable code for Getphone. |
| `benefit_type` | `data` or `voice` | Identifies the kind of benefit. |
| `offer_name` | `getPhone_24hours_0.25USD` | Human-readable Hormuud offer name. |
| `offer_id_for_post` | `daily` | Exact value to send in `POST /subscribe`. |
| `offer_id_from_get` | `Daily` | Value expected from `GET /customer-offer`, if different. |
| `product_id` | `3000060` | Hormuud product identifier. |
| `duration_hours` | `24` | Benefit duration. |
| `commercial_value_usd` | `0.25` | Optional reporting value. |
| `is_active` | `true` | Controls whether the offer can currently be used. |
| `valid_from` | date/time | Start of configuration validity. |
| `valid_to` | date/time or null | End of configuration validity. |

### 7.3 Example registry row

```json
{
  "benefit_code": "GETPHONE_24HOURS_025USD",
  "benefit_type": "data",
  "offer_name": "getPhone_24hours_0.25USD",
  "offer_id_for_post": "daily",
  "offer_id_from_get": "Daily",
  "product_id": "3000060",
  "duration_hours": 24,
  "commercial_value_usd": 0.25,
  "is_active": true
}
```

### 7.4 Configuration ownership

Only authorized backend administrators or engineers should update this registry. Any change to `offerID` or `productId` should be approved, tested in UAT, and recorded in an audit log.

---

## 8. Recommended backend architecture

### 8.1 Integration components

Implement the Hormuud integration as a backend module, not as direct calls from client apps.

```text
Payment system / eGet event
        |
        v
Getphone backend business rules
        |
        v
Benefit eligibility engine
        |
        v
Benefit deduplication and audit layer
        |
        v
Hormuud integration client
        |
        v
Hormuud Hintegration API
```

### 8.2 Core backend services

| Service/module | Responsibility |
|---|---|
| Payment event receiver | Receives successful deposit/installment events from payment systems or eGet. |
| Eligibility engine | Decides whether the customer qualifies for a benefit. |
| Offer registry | Stores approved Hormuud `offerID` and `productId` mappings. |
| Benefit ledger | Records every benefit attempt and its final status. |
| Deduplication guard | Prevents repeated benefit issuance for the same qualifying event. |
| Hormuud API client | Handles token management, requests, retries, parsing, and errors. |
| Reconciliation job | Compares Getphone records with Hormuud offer status. |
| Admin/support dashboard | Allows support users to view benefit attempts and retry eligible failed cases. |

### 8.3 Why the backend must own the integration

The backend must own the integration because it can keep credentials secure, enforce eligibility rules consistently, prevent duplicate subscriptions, log all requests/responses for audit, and support retries in a controlled way.

---

## 9. Business workflow for benefit provisioning

### 9.1 Trigger points

Getphone should define exactly which events trigger a benefit. Common examples are:

1. Successful deposit payment.
2. Successful daily installment payment.
3. Successful weekly installment payment where the commercial rule grants a benefit for each covered day.
4. Manual approved support action.
5. Corrective reconciliation action after a failed API call.

### 9.2 Standard provisioning workflow

For each qualifying event:

1. Receive the payment or eligibility event.
2. Confirm the event is successful, final, and not pending.
3. Identify the customer and Hormuud mobile number.
4. Validate the mobile number format.
5. Determine the applicable benefit using Getphone's business rules.
6. Look up the exact `offerID` and `productId` in the offer registry.
7. Check the benefit ledger to confirm that this exact event has not already been fulfilled.
8. Create a new benefit attempt record with status `PENDING`.
9. Get a valid Hormuud Bearer token.
10. Call `POST /subscribe`.
11. Save the full sanitized response.
12. If Hormuud returns success, mark the attempt as `SUCCESS`.
13. If Hormuud returns a definitive business error, mark the attempt as `FAILED_FINAL`.
14. If there is a timeout, network error, or 500 error, mark the attempt as `RETRY_PENDING`.
15. Notify support only where manual review is needed.

### 9.3 Suggested sequence diagram

```text
Customer pays installment
        |
        v
Payment/eGet confirms success
        |
        v
Getphone backend receives event
        |
        v
Eligibility engine selects benefit
        |
        v
Deduplication guard checks event
        |
        v
Hormuud API client gets token if needed
        |
        v
POST /subscribe is sent to Hormuud
        |
        v
Hormuud returns success or error
        |
        v
Benefit ledger is updated
        |
        v
Reconciliation job later verifies status using GET /customer-offer
```

---

## 10. Deduplication and idempotency design

### 10.1 Why this is critical

The technical clarification states that the API does not currently use an idempotency key such as `x-request-id`. This means Hormuud may process duplicate calls if Getphone sends them. Getphone must therefore prevent duplicate calls on its side.

### 10.2 Define a Getphone idempotency key internally

Create an internal key for each benefit event. Example:

```text
customer_id + payment_id + benefit_code + benefit_date
```

or:

```text
tenant_id + customer_id + transaction_reference + product_id
```

Store this key in the benefit ledger with a unique database constraint. This prevents two workers or retry jobs from issuing the same benefit twice.

### 10.3 Retry only when safe

Do not retry every error automatically.

| Scenario | Retry? | Reason |
|---|---:|---|
| 400 Invalid offer id | No | Configuration or request issue; retrying will repeat the same failure. |
| 400 Invalid mobile number format | No | Data issue; correct the number first. |
| 401 Unauthorized | Refresh token once, then retry once | Token may have expired. |
| 500 Internal Server Error | Yes, with backoff | Hormuud may have a temporary processing failure. |
| Timeout before response | Cautious retry after checking ledger/status | The first request may or may not have succeeded. |
| Network connection failure before request is sent | Yes | Request likely did not reach Hormuud. |

### 10.4 Timeout uncertainty handling

If a timeout happens after the request may have reached Hormuud, do not immediately fire repeated calls. Instead:

1. Mark the attempt as `UNKNOWN_OUTCOME`.
2. Call `GET /customer-offer` to see whether the benefit is already active.
3. If active, mark the attempt as `SUCCESS_CONFIRMED_BY_QUERY`.
4. If not active and the retry policy allows it, retry once.
5. Escalate to manual review if uncertainty remains.

---

## 11. Data model recommendation

### 11.1 `hormuud_offer_registry`

Stores approved package mappings.

```sql
CREATE TABLE hormuud_offer_registry (
    id UUID PRIMARY KEY,
    benefit_code VARCHAR(100) NOT NULL UNIQUE,
    benefit_type VARCHAR(30) NOT NULL,
    offer_name VARCHAR(150),
    offer_id_for_post VARCHAR(100) NOT NULL,
    offer_id_from_get VARCHAR(100),
    product_id VARCHAR(100) NOT NULL,
    duration_hours INTEGER,
    commercial_value_usd NUMERIC(10, 4),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    valid_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valid_to TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 11.2 `benefit_ledger`

Records every attempted benefit issuance.

```sql
CREATE TABLE benefit_ledger (
    id UUID PRIMARY KEY,
    tenant_id UUID NULL,
    customer_id UUID NOT NULL,
    mobile_number VARCHAR(30) NOT NULL,
    payment_id UUID NULL,
    transaction_reference VARCHAR(100) NULL,
    benefit_code VARCHAR(100) NOT NULL,
    offer_id_sent VARCHAR(100) NOT NULL,
    product_id_sent VARCHAR(100) NOT NULL,
    idempotency_key VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL,
    hormuud_http_status INTEGER NULL,
    hormuud_code VARCHAR(20) NULL,
    hormuud_status VARCHAR(50) NULL,
    hormuud_message TEXT NULL,
    request_payload_redacted JSONB NULL,
    response_payload_redacted JSONB NULL,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    next_retry_at TIMESTAMP NULL,
    last_attempt_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 11.3 Status values

Use clear statuses in the ledger:

| Status | Meaning |
|---|---|
| `PENDING` | Attempt created but not yet sent. |
| `SENT` | Request was sent and response is being processed. |
| `SUCCESS` | Hormuud confirmed successful subscription. |
| `SUCCESS_CONFIRMED_BY_QUERY` | Success inferred from customer-offer query after uncertain outcome. |
| `FAILED_FINAL` | Permanent failure; no automatic retry. |
| `RETRY_PENDING` | Temporary failure eligible for retry. |
| `UNKNOWN_OUTCOME` | Request may have reached Hormuud but response was not received. |
| `MANUAL_REVIEW` | Human support/engineering review required. |

---

## 12. Request validation before calling Hormuud

### 12.1 Validate mobile number

Before calling Hormuud:

1. Confirm the number is present.
2. Remove spaces and formatting characters if your business rules allow this.
3. Confirm it matches the format Hormuud expects.
4. Store the normalized version used for the API call.

Example validator logic:

```text
Input: +252 61 0000000
Normalize: 610000000 or the exact format Hormuud confirms
Validate: digits only, correct prefix, correct length
```

The documents show examples like `610000000`. Do not assume all international formats will be accepted unless Hormuud confirms them.

### 12.2 Validate `offerID` and `productId`

Before calling `/subscribe`, check:

1. `offerID` exists in the local registry.
2. `productId` exists in the local registry.
3. The registry row is active.
4. The request uses the exact `offerID` casing required for POST.
5. The product ID belongs to the selected offer.

### 12.3 Validate eligibility

Do not call Hormuud if:

1. The payment is pending or failed.
2. The customer is not eligible for the benefit.
3. The benefit was already issued for the same event.
4. The customer mobile number is missing or invalid.
5. The offer registry row is inactive or missing.

---

## 13. Error handling and operational responses

### 13.1 Known API errors

| HTTP code | API code | Example message | Meaning | Getphone action |
|---:|---|---|---|---|
| 400 | `400` | `Invalid mobile number format.` | Mobile number rejected. | Mark failed; correct customer data. |
| 400 | `400` | `Invalid offer id.` | Offer/product mismatch or invalid casing. | Mark failed; check mapping registry. |
| 401 | `401` or no JSON body | Unauthorized. | Token/API key missing or invalid. | Refresh token once; retry once. |
| 500 | `500` | Processing failure. | Hormuud internal issue. | Retry with backoff; escalate if repeated. |

### 13.2 Error-handling principles

1. Store every failed attempt in the ledger.
2. Do not hide errors from support teams.
3. Do not repeatedly call Hormuud on permanent errors.
4. Redact secrets from logs.
5. Keep raw enough response detail for engineering troubleshooting, but never store Bearer tokens in logs.

### 13.3 Support-facing error messages

Support users should see plain-language messages, not raw stack traces.

| Technical condition | Support message |
|---|---|
| Invalid mobile number | Customer's Hormuud number could not be accepted. Please verify the number. |
| Invalid offer id | Benefit package configuration needs technical review. |
| Unauthorized | Hormuud authentication failed. Engineering has been notified. |
| Timeout | Benefit status is being verified. Do not issue manual duplicate benefit yet. |
| Success | Benefit was issued successfully. |

---

## 14. Reconciliation design

### 14.1 Why reconciliation is needed

Reconciliation is needed because payment success, API request success, and actual customer benefit activation are separate events. Getphone must be able to prove which customers qualified, which requests were sent, and which benefits were active.

### 14.2 Daily reconciliation job

Run a scheduled job that:

1. Selects recent successful or uncertain benefit attempts.
2. Calls `GET /customer-offer` for the customer mobile number.
3. Filters returned offers where `subscriptionStatus` is `Active`.
4. Compares the returned offer records against Getphone's local registry and benefit ledger.
5. Marks uncertain records as confirmed where the offer is active.
6. Flags missing or inconsistent records for manual review.

### 14.3 Reconciliation report fields

| Field | Meaning |
|---|---|
| Customer ID | Getphone internal customer. |
| Mobile number | Hormuud mobile number. |
| Payment reference | Payment that triggered eligibility. |
| Expected benefit | Getphone benefit code. |
| Hormuud offer name | Offer returned by Hormuud, if any. |
| Hormuud offer status | Active or Expired. |
| Expected vs actual | Match, missing, duplicate, expired, unknown. |
| Action required | None, retry, manual review, configuration fix. |

---

## 15. Handling daily, weekly, and multi-day benefits

If Getphone's commercial rule is that a weekly payment entitles the customer to daily benefits across several days, do not call all benefits blindly without a schedule. Implement a clear entitlement calendar.

### 15.1 Example entitlement logic

| Payment type | Example rule | Implementation approach |
|---|---|---|
| Daily payment | One benefit for that day | Trigger immediately after payment success. |
| Weekly payment | One daily benefit for each covered day | Create seven entitlement records and issue each one on the correct day. |
| Monthly payment | Daily benefits across covered period | Create dated entitlement records and issue by scheduled job. |

### 15.2 Entitlement table

Create an entitlement table if benefits are issued across multiple days.

```sql
CREATE TABLE customer_benefit_entitlements (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL,
    payment_id UUID NOT NULL,
    entitlement_date DATE NOT NULL,
    benefit_code VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    benefit_ledger_id UUID NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (customer_id, payment_id, entitlement_date, benefit_code)
);
```

This prevents the system from issuing too many benefits at once and gives Getphone a clean daily audit trail.

---

## 16. Example backend implementation pattern

The following pseudocode shows the correct implementation pattern. It is language-neutral and can be adapted to Python/FastAPI, Java, Node.js, or another backend stack.

```python
class HormuudClient:
    def __init__(self, base_url, username, password, http_client, token_cache):
        self.base_url = base_url.rstrip("/")
        self.username = username
        self.password = password
        self.http = http_client
        self.token_cache = token_cache

    def get_token(self):
        cached = self.token_cache.get("hormuud_access_token")
        if cached and not cached.is_near_expiry():
            return cached.value

        response = self.http.post(
            f"{self.base_url}/token",
            json={"username": self.username, "password": self.password},
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        token = data["token"]
        expires_seconds = parse_expiry(data.get("expiresIn", "1h"))
        self.token_cache.set("hormuud_access_token", token, ttl_seconds=expires_seconds - 300)
        return token

    def subscribe(self, mobile_number, offer_id, product_id):
        token = self.get_token()
        payload = {
            "mobileNumber": mobile_number,
            "offerID": offer_id,
            "productId": product_id,
        }
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        return self.http.post(
            f"{self.base_url}/subscribe",
            json=payload,
            headers=headers,
            timeout=30,
        )

    def customer_offer(self, mobile_number):
        token = self.get_token()
        headers = {"Authorization": f"Bearer {token}"}
        return self.http.get(
            f"{self.base_url}/customer-offer",
            params={"mobileNumber": mobile_number},
            headers=headers,
            timeout=30,
        )
```

---

## 17. Postman testing guide for engineers

### 17.1 Create a Postman environment

Create an environment called:

```text
Hormuud Hintegrations - Test
```

Add variables:

| Variable | Initial value | Current value | Secret? |
|---|---|---|---|
| `base_url` | Confirmed test base URL | Confirmed test base URL | No, but do not publish casually |
| `username` | Issued username | Issued username | Yes |
| `password` | Issued password | Issued password | Yes |
| `access_token` | blank | auto-filled after token request | Yes |
| `mobile_number` | test customer number | test customer number | Yes/customer data |
| `offer_id` | `daily` or confirmed value | `daily` or confirmed value | No |
| `product_id` | confirmed product ID | confirmed product ID | No |

### 17.2 Request 1: Get token

Method:

```text
POST
```

URL:

```text
{{base_url}}/token
```

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "username": "{{username}}",
  "password": "{{password}}"
}
```

Tests script to save token automatically:

```javascript
const json = pm.response.json();

if (json.token) {
    pm.environment.set("access_token", json.token);
}

pm.test("Token request succeeded", function () {
    pm.response.to.have.status(200);
    pm.expect(json.token).to.exist;
});
```

If the Postman interface shows `Scripts` instead of `Tests`, open `Scripts`, then select the post-response/test area and paste the script there.

### 17.3 Request 2: Check customer offer

Method:

```text
GET
```

URL:

```text
{{base_url}}/customer-offer?mobileNumber={{mobile_number}}
```

Headers:

```text
Authorization: Bearer {{access_token}}
```

Expected successful response:

```json
{
  "code": "0",
  "status": "success",
  "message": "Operation successful.",
  "offers": []
}
```

or a response containing one or more offers.

### 17.4 Request 3: Subscribe customer to daily bundle

Method:

```text
POST
```

URL:

```text
{{base_url}}/subscribe
```

Headers:

```text
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

Body:

```json
{
  "mobileNumber": "{{mobile_number}}",
  "offerID": "{{offer_id}}",
  "productId": "{{product_id}}"
}
```

Expected successful response:

```json
{
  "code": "0",
  "message": "Operation successfully.",
  "status": "success"
}
```

The exact spelling of the success message may vary. Use `code == "0"` and `status == "success"` as the primary success indicators.

---

## 18. Production readiness checklist

Before going live, Getphone engineering should confirm each item below.

| Area | Checklist item | Owner |
|---|---|---|
| Base URL | Production base URL confirmed with Hormuud. | Engineering lead |
| Credentials | Production credentials stored in secret manager. | DevOps/backend |
| Token flow | Token refresh implemented and tested. | Backend |
| Offer registry | All data and voice package mappings approved. | Product + backend |
| Casing | POST values use exact Hormuud-required casing. | Backend QA |
| Deduplication | Benefit ledger has unique idempotency key. | Backend |
| Retry logic | 400/401/500/timeout behavior implemented correctly. | Backend |
| Logging | Tokens/passwords are redacted from logs. | DevOps |
| Monitoring | API failures trigger alerts. | DevOps |
| Support dashboard | Support can view benefit attempts. | Product/backend |
| Reconciliation | Daily reconciliation job implemented. | Data/backend |
| UAT | Test cases passed with Hormuud/ZTE/Getphone. | QA lead |
| Rollback | Ability to disable benefit triggering by config. | Engineering lead |

---

## 19. Test cases

### 19.1 Token tests

| Test | Expected result |
|---|---|
| Valid credentials | Returns token, token type, and expiry. |
| Invalid password | Returns unauthorized or failed response. |
| Missing username | Returns validation/authentication failure. |
| Expired token used on API call | Backend refreshes token and retries once. |

### 19.2 Subscribe tests

| Test | Expected result |
|---|---|
| Valid mobile number, valid offer, valid product | Success response. |
| Missing mobile number | 400 error. |
| Invalid mobile number format | 400 error with invalid mobile number message. |
| Missing offerID | 400 error. |
| Wrong offerID casing | 400 or invalid offer response. |
| Wrong productId | 400 invalid offer id. |
| Duplicate same event in Getphone | Second request blocked by Getphone before Hormuud call. |
| Hormuud timeout | Mark unknown/retry pending; reconcile before retrying aggressively. |

### 19.3 Customer-offer tests

| Test | Expected result |
|---|---|
| Customer with no offers | Success with empty offers array or no active offers. |
| Customer with active offer | Success with `subscriptionStatus` = `Active`. |
| Customer with historical offer | Offer may appear as `Expired`. |
| Multiple offers | Backend filters only active records for current benefit status. |

### 19.4 Reconciliation tests

| Test | Expected result |
|---|---|
| Successful subscribe followed by query | Active offer found. |
| Unknown outcome followed by query active | Ledger marked success confirmed by query. |
| Successful payment but no active offer | Record flagged for retry or manual review. |
| Expired offer after duration ends | Historical record remains but current status not active. |

---

## 20. Logging, monitoring, and alerts

### 20.1 What to log

Log the following:

1. Internal benefit attempt ID.
2. Customer ID.
3. Masked mobile number.
4. Benefit code.
5. Product ID sent.
6. HTTP status returned by Hormuud.
7. Hormuud `code`, `status`, and `message`.
8. Attempt count.
9. Final ledger status.
10. Latency in milliseconds.

### 20.2 What not to log

Do not log:

1. Password.
2. Full Bearer token.
3. Full Authorization header.
4. Full unmasked customer personally identifiable information.
5. Screenshots containing credentials.

### 20.3 Alerts

Create alerts for:

1. Repeated `401 Unauthorized` responses.
2. Spike in `400 Invalid offer id` responses.
3. Spike in `500` responses.
4. High timeout rate.
5. Large number of `UNKNOWN_OUTCOME` records.
6. Reconciliation mismatches above an agreed threshold.

---

## 21. Security controls

### 21.1 Secret handling

Use a secret manager where possible. If using environment variables, restrict access to production servers and CI/CD secrets. Rotate credentials if they are exposed in screenshots, chats, emails forwarded outside the authorized team, or source code.

### 21.2 Network controls

Where possible:

1. Restrict API calls to backend server IP addresses.
2. Use HTTPS only.
3. Validate TLS certificates.
4. Set strict timeouts.
5. Use firewall rules to limit outbound traffic from production services.

### 21.3 Access control

Only authorized backend services should call the Hormuud integration module. Support users should not see credentials or tokens. Manual retry actions should require permission and should be audit logged.

---

## 22. Deployment approach

### 22.1 Recommended phases

1. **Local development:** Engineers implement client, token manager, registry, and ledger using test numbers.
2. **Internal staging:** Getphone tests all success and error flows without real customer impact.
3. **Joint UAT:** Getphone, ZTE/eGet, and Hormuud test end-to-end payment-to-benefit flows.
4. **Limited pilot:** Enable for a small group of controlled customers.
5. **Production rollout:** Expand gradually with monitoring.

### 22.2 Feature flags

Use feature flags/config switches:

| Flag | Purpose |
|---|---|
| `HORMUUD_BENEFITS_ENABLED` | Master switch for benefit issuance. |
| `HORMUUD_SUBSCRIBE_ENABLED` | Controls whether `/subscribe` calls are allowed. |
| `HORMUUD_RECONCILIATION_ENABLED` | Controls reconciliation jobs. |
| `HORMUUD_AUTO_RETRY_ENABLED` | Controls automatic retries. |

This allows Getphone to disable benefit calls quickly without redeploying code.

---

## 23. Open points to confirm with Hormuud

Before production, Getphone should confirm:

1. Final production base URL.
2. Exact token request body fields.
3. Whether token expiry is always one hour.
4. Full list of data and voice offers, including `offerID`, `productId`, duration, and commercial meaning.
5. Whether voice/free-minute benefits use the same `/subscribe` endpoint or another endpoint.
6. Required mobile number format.
7. Expected behavior when the same customer is subscribed twice to the same offer.
8. Whether Hormuud can provide an idempotency key or request reference in future API versions.
9. Whether GET `/customer-offer` can include `productId` in future responses.
10. Expected rate limits and throttling behavior.

---

## 24. Final engineering recommendation

Getphone should implement the Hormuud Hintegration API as a secure backend integration with token management, offer registry, benefit ledger, deduplication, controlled retries, and reconciliation. The system should not be built as a simple direct API call from eGet or a mobile app because that would expose credentials, make duplicates likely, and weaken operational control.

The minimum production-ready implementation is:

1. Backend token manager for `/token`.
2. Backend API client for `/subscribe` and `/customer-offer`.
3. Local registry for `offerID` and `productId` mappings.
4. Benefit ledger with unique idempotency key.
5. Retry logic that distinguishes permanent errors from temporary errors.
6. Reconciliation job using `/customer-offer`.
7. Secure logging, monitoring, and support visibility.

Implemented this way, the integration will support Getphone's PAYG model while protecting the company from duplicate benefit issuance, exposed credentials, poor auditability, and avoidable customer-support problems.
