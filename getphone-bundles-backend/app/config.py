from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration loaded from environment variables or .env file."""

    # Database
    DATABASE_URL: str = ""

    # Topup API (Hormuud & Somnet)
    TOPUP_API_BASE_URL: str = "https://opsapi.hormuud.com/api/v1"
    TOPUP_API_USERNAME: str = "getphone"
    TOPUP_API_PASSWORD: str = ""
    HORMUUD_TOPUP_AMOUNT: float = 0.20
    SOMNET_TOPUP_AMOUNT: float = 0.20

    def topup_amount_for_network(self, network: str) -> float:
        return self.SOMNET_TOPUP_AMOUNT if network == "somnet" else self.HORMUUD_TOPUP_AMOUNT

    # Scheduling and dedup
    SAFETY_GUARD_HOURS: int = 6
    TIMEZONE: str = "Africa/Mogadishu"
    MAX_CONCURRENT_PROVISIONS: int = 10

    # Scheduler authentication
    SCHEDULER_SECRET: str = ""

    # CORS origins (comma-separated)
    CORS_ORIGINS: str = "https://getphone-website.web.app,https://getphone-website.firebaseapp.com"

    class Config:
        env_file = ".env"


settings = Settings()
