-- Getphone Temporary Bundle Provisioning System
-- Database initialization script
-- Run this against Cloud SQL PostgreSQL after creating the database.

-- Table 1: Stores mobile numbers that should receive daily bundles.
CREATE TABLE IF NOT EXISTS bundle_numbers (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',

    last_attempt_at TIMESTAMP NULL,
    last_success_at TIMESTAMP NULL,
    next_run_at TIMESTAMP NULL,

    last_response_status VARCHAR(50) NULL,
    last_response_message TEXT NULL,

    failure_count INTEGER NOT NULL DEFAULT 0,

    created_by VARCHAR(150) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for the scheduler query (find active numbers due for provisioning)
CREATE INDEX IF NOT EXISTS idx_bundle_numbers_active_next_run
    ON bundle_numbers (status, next_run_at)
    WHERE status = 'active';

-- Table 2: Records every Hormuud API call attempt for audit and troubleshooting.
CREATE TABLE IF NOT EXISTS bundle_call_logs (
    id SERIAL PRIMARY KEY,
    mobile_number VARCHAR(20) NOT NULL,

    call_type VARCHAR(50) NOT NULL DEFAULT 'subscribe',
    triggered_by VARCHAR(50) NOT NULL,

    http_status INTEGER NULL,
    response_code VARCHAR(20) NULL,
    response_status VARCHAR(50) NULL,
    response_message TEXT NULL,

    attempted_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index for log lookups by number
CREATE INDEX IF NOT EXISTS idx_bundle_call_logs_mobile_number
    ON bundle_call_logs (mobile_number);

-- Index for log lookups by time (most recent first)
CREATE INDEX IF NOT EXISTS idx_bundle_call_logs_attempted_at
    ON bundle_call_logs (attempted_at DESC);
