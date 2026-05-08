from sqlalchemy.orm import Session

from app.models.activity import ActivityLog
from app.utils.time import utcnow


def log_event(
    db: Session,
    user_id: int | None,
    activity_type: str,
    activity_description: str,
    risk_level: str = "Low",
) -> ActivityLog:
    entry = ActivityLog(
        user_id=user_id,
        activity_type=activity_type,
        activity_description=activity_description,
        risk_level=risk_level,
        timestamp=utcnow(),
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def list_logs(db: Session, user_id: int) -> list[ActivityLog]:
    return (
        db.query(ActivityLog)
        .filter(ActivityLog.user_id == user_id)
        .order_by(ActivityLog.timestamp.desc())
        .all()
    )
