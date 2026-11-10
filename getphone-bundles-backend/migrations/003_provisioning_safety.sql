-- Prevent duplicate confirmed daily benefits at the ledger boundary.
-- Safe to run more than once after verifying no historic duplicates exist.

CREATE UNIQUE INDEX IF NOT EXISTS uq_bundle_success_per_number_day
    ON bundle_call_logs (mobile_number, business_date)
    WHERE call_type = 'topup'
      AND response_status = 'success'
      AND business_date IS NOT NULL;
