"""
Environment variables parser
"""

from pydantic_settings import BaseSettings

from src.utils.Helper import inDocMode


class Settings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str
    SQL_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_EXPIRE_DAYS: int
    JWT_EXPIRE_SECONDS: int
    SQL_TEST_URL: str
    REDIRECT_URI: str

    class Config:
        env_file = ".env" if not inDocMode() else "../.env"
