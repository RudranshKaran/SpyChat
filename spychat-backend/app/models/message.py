from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class Message(Base):
    __tablename__ = "messages"
    __table_args__ = (
        Index("ix_messages_sender_id", "sender_id"),
        Index("ix_messages_receiver_id", "receiver_id"),
        Index("ix_messages_created_at", "created_at"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    receiver_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    encrypted_message: Mapped[str] = mapped_column(Text)
    nonce: Mapped[str] = mapped_column(String(64))
    tag: Mapped[str] = mapped_column(String(64))
    hash_value: Mapped[str] = mapped_column(String(128))
    viewed_status: Mapped[bool] = mapped_column(Boolean, default=False)
    self_destruct_time: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    destroyed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    message_status: Mapped[str] = mapped_column(String(20), default="Sent")

    sender = relationship("User", foreign_keys=[sender_id], back_populates="messages_sent")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="messages_received")
