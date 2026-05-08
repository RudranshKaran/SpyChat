from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.services.activity_service import log_event


def get_profile(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def update_profile(db: Session, user_id: int, email: str | None, username: str | None) -> User:
    user = get_profile(db, user_id)
    if email:
        user.email = email
    if username:
        user.username = username
    db.commit()
    db.refresh(user)

    log_event(db, user_id, "PROFILE_UPDATE", "User profile updated", "Low")
    return user
