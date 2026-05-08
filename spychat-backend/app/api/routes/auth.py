from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.core.config import settings
from app.database.session import get_db
from app.schemas.auth import LoginRequest, LogoutResponse, RefreshRequest, RegisterRequest, TokenResponse
from app.services import auth_service, device_service

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()


@router.post("/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    auth_service.register_user(db, payload.username, payload.email, payload.password)
    return {"message": "User registered successfully"}


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, request: Request, db: Session = Depends(get_db)):
    user = auth_service.authenticate_user(db, payload.username, payload.password)

    device_id = None
    if payload.device_fingerprint:
        device = device_service.verify_device(
            db,
            user.id,
            payload.device_fingerprint,
            payload.browser_name or "Unknown",
            payload.operating_system or "Unknown",
            payload.screen_resolution or "Unknown",
        )
        device_id = str(device.id)

    ip_address = request.client.host if request.client else None
    tokens = auth_service.create_session(
        db,
        user,
        device_id,
        ip_address,
        settings.access_token_expire_minutes,
    )
    return TokenResponse(**tokens, token_type="bearer")


@router.post("/logout", response_model=LogoutResponse)
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    auth_service.revoke_session(db, user.id, credentials.credentials)
    return LogoutResponse(message="Logout successful")


@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)):
    tokens = auth_service.refresh_session(db, payload.refresh_token)
    return TokenResponse(**tokens, token_type="bearer")
