from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    api_prefix: str = "/api"
    database_url: str = "sqlite:///./spychat.db"

    jwt_secret_key: str = "change_me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    encryption_key: str = "replace_with_base64_32_byte_key"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
