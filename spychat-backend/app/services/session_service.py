from sqlalchemy.orm import Session

from app.models.session import Session as UserSession
from app.services.activity_service import log_event


def get_active_sessions(db: Session, user_id: int) -> list[UserSession]:
    return (
        db.query(UserSession)
        .filter(UserSession.user_id == user_id, UserSession.session_status == "Active")
        .all()
    )


def terminate_session(db: Session, user_id: int, session_id: int) -> None:
    session = (
        db.query(UserSession)
        .filter(UserSession.id == session_id, UserSession.user_id == user_id)
        .first()
    )
    if session:
        session.session_status = "Revoked"
        db.commit()
        log_event(db, user_id, "SESSION_TERMINATED", "Session terminated", "Medium")
