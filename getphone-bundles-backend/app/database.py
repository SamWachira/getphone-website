from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings


db_url = settings.DATABASE_URL.strip() if settings.DATABASE_URL else ""

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
    """Ensure database tables and newly added columns exist in Cloud SQL PostgreSQL."""
    if not db_url or "sqlite" in db_url:
        return
    try:
        from sqlalchemy import text
        with engine.connect() as conn:
            conn.execute(text("ALTER TABLE bundle_numbers ADD COLUMN IF NOT EXISTS network VARCHAR(20) DEFAULT 'hormuud';"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS network VARCHAR(20);"))
            conn.execute(text("ALTER TABLE bundle_call_logs ADD COLUMN IF NOT EXISTS transfer_id VARCHAR(100);"))
            conn.commit()
    except Exception:
        pass
