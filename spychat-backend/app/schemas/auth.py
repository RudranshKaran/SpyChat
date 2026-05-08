from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field
from pydantic import ConfigDict


class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    username: str
    password: str
    device_fingerprint: Optional[str] = None
    browser_name: Optional[str] = None
    operating_system: Optional[str] = None
    screen_resolution: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RefreshRequest(BaseModel):
    refresh_token: str


class LogoutResponse(BaseModel):
    message: str


class SessionInfo(BaseModel):
    id: int
    login_time: datetime
    expiry_time: datetime
    session_status: str

    model_config = ConfigDict(from_attributes=True)
