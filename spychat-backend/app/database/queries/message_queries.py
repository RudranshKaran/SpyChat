from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.message import Message


def unread_count(db: Session, user_id: int, partner_id: int) -> int:
    return (
        db.query(func.count(Message.id))
        .filter(
            Message.receiver_id == user_id,
            Message.sender_id == partner_id,
            Message.viewed_status.is_(False),
        )
        .scalar()
        or 0
    )
