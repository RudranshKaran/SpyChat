from datetime import timedelta

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
    decode_token,
)
from app.models.session import Session as UserSession
from app.models.user import User
from app.services.activity_service import log_event
from app.utils.time import utcnow


def register_user(db: Session, username: str, email: str, password: str) -> User:
    existing = (
        db.query(User)
        .filter((User.username == username) | (User.email == email))
        .first()
    )
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(username=username, email=email, password_hash=get_password_hash(password))
    db.add(user)
    db.commit()
    db.refresh(user)

    log_event(db, user.id, "REGISTER", "User registered", "Low")
    return user


def authenticate_user(db: Session, username: str, password: str) -> User:
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.password_hash):
        log_event(db, user.id if user else None, "LOGIN_FAIL", "Invalid credentials", "Medium")
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user.last_login = utcnow()
    db.commit()
    return user


def create_session(
    db: Session,
    user: User,
    device_id: str | None,
    ip_address: str | None,
    access_expires: int,
) -> dict[str, str | int]:
    access_token = create_access_token(str(user.id))
    refresh_token = create_refresh_token(str(user.id))

    expiry_time = utcnow() + timedelta(minutes=access_expires)
    session = UserSession(
        user_id=user.id,
        jwt_token=access_token,
        refresh_token=refresh_token,
        expiry_time=expiry_time,
        device_id=device_id,
        ip_address=ip_address,
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    log_event(db, user.id, "LOGIN", "User logged in", "Low")

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "expires_in": access_expires * 60,
    }


def revoke_session(db: Session, user_id: int, access_token: str) -> None:
    session = (
        db.query(UserSession)
        .filter(UserSession.user_id == user_id, UserSession.jwt_token == access_token)
        .first()
    )
    if session:
        session.session_status = "Revoked"
        db.commit()
        log_event(db, user_id, "LOGOUT", "User logged out", "Low")


def refresh_session(db: Session, refresh_token: str) -> dict[str, str | int]:
    try:
        payload = decode_token(refresh_token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if payload.get("typ") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user_id = int(payload.get("sub", 0))
    session = (
        db.query(UserSession)
        .filter(UserSession.user_id == user_id, UserSession.refresh_token == refresh_token)
        .first()
    )
    if not session or session.session_status != "Active":
        raise HTTPException(status_code=401, detail="Session invalid")

    new_access = create_access_token(str(user_id))
    session.jwt_token = new_access
    session.expiry_time = utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    db.commit()

    log_event(db, user_id, "TOKEN_REFRESH", "Access token refreshed", "Low")

    return {
        "access_token": new_access,
        "refresh_token": refresh_token,
        "expires_in": settings.access_token_expire_minutes * 60,
    }
