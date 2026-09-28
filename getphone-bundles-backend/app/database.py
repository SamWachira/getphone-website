import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings


db_url = settings.DATABASE_URL.strip() if settings.DATABASE_URL else ""
logger = logging.getLogger(__name__)

if db_url:
    engine = create_engine(
        db_url,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=10,
    )
else:
    engine = create_engine("sqlite:///:memory:")

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    """Dependency that provides a database session and ensures cleanup."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db_schema():
    """Ensure non-destructive production schema upgrades are applied on startup."""
    if not db_url or "sqlite" in db_url:
        return
    try:
        from sqlalchemy import text
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE bundle_numbers ADD COLUMN IF NOT EXISTS network VARCHAR(20) DEFAULT 'hormuud';"))
            conn.execute(text("ALTER TABLE bundle_numbers ADD COLUMN IF NOT EXISTS provisioning_owner VARCHAR(20) NOT NULL DEFAULT 'standalone';"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS network VARCHAR(20);"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS transfer_id VARCHAR(100);"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS provisioning_owner VARCHAR(20);"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS benefit_value NUMERIC(12, 2);"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS currency VARCHAR(3);"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS business_date DATE;"))
            conn.execute(text("""
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
            """))
            conn.execute(text("""
                CREATE INDEX IF NOT EXISTS idx_bundle_call_logs_business_date
                ON bundle_call_logs (business_date, provisioning_owner, response_status);
            """))
    except Exception as exc:
        logger.exception("Failed to apply bundle provisioning schema upgrades: %s", exc)
        raise
