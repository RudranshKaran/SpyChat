from sqlalchemy.orm import Session

from app.database.repositories.base import BaseRepository
from app.models.message import Message


class MessageRepository(BaseRepository):
    def inbox(self, user_id: int) -> list[Message]:
        return (
            self.db.query(Message)
            .filter(Message.receiver_id == user_id, Message.viewed_status.is_(False))
            .order_by(Message.created_at.desc())
            .all()
        )

    def get_for_receiver(self, user_id: int, message_id: int) -> Message | None:
        return (
            self.db.query(Message)
            .filter(Message.id == message_id, Message.receiver_id == user_id)
            .first()
        )

    def list_conversations(self, user_id: int) -> list[Message]:
        return (
            self.db.query(Message)
            .filter((Message.sender_id == user_id) | (Message.receiver_id == user_id))
            .order_by(Message.created_at.desc())
            .all()
        )
