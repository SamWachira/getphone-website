-- Upgrade an existing standalone bundle database for the benefit value calculator.
-- Safe to run more than once. Historic logs deliberately remain unpriced.

ALTER TABLE bundle_numbers
    ADD COLUMN IF NOT EXISTS provisioning_owner VARCHAR(20) NOT NULL DEFAULT 'standalone';

ALTER TABLE bundle_call_logs
    ADD COLUMN IF NOT EXISTS provisioning_owner VARCHAR(20),
    ADD COLUMN IF NOT EXISTS benefit_value NUMERIC(12, 2),
    ADD COLUMN IF NOT EXISTS currency VARCHAR(3),
    ADD COLUMN IF NOT EXISTS business_date DATE;

CREATE TABLE IF NOT EXISTS bundle_daily_calculations (
    id SERIAL PRIMARY KEY,
    business_date DATE NOT NULL UNIQUE,
    successful_benefits INTEGER NOT NULL DEFAULT 0,
    unpriced_successful_benefits INTEGER NOT NULL DEFAULT 0,
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    calculated_value NUMERIC(12, 2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    settlement_status VARCHAR(20) NOT NULL DEFAULT 'unsettled',
    closed_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bundle_call_logs_business_date
    ON bundle_call_logs (business_date, provisioning_owner, response_status);
