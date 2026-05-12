from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration loaded from environment variables or .env file."""

    # Database
    DATABASE_URL: str

    # Hormuud API
    HORMUUD_BASE_URL: str = "https://hintegrations.hormuud.com/api"
    HORMUUD_USERNAME: str
    HORMUUD_PASSWORD: str

    # Offer configuration
    OFFER_ID: str = "getPhone_24hours_0.25USD"
    PRODUCT_ID: str = "3000060"

    # Scheduling and dedup
    SAFETY_GUARD_HOURS: int = 6
    TIMEZONE: str = "Africa/Mogadishu"

    # Scheduler authentication
    SCHEDULER_SECRET: str

    # CORS origins (comma-separated)
    CORS_ORIGINS: str = "https://getphone-website.web.app,https://getphone-website.firebaseapp.com"

    class Config:
        env_file = ".env"


settings = Settings()
