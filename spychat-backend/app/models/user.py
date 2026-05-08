from datetime import datetime

from sqlalchemy import DateTime, Index, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        Index("ix_users_username", "username"),
        Index("ix_users_email", "email"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    last_login: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    account_status: Mapped[str] = mapped_column(String(20), default="Active")

    messages_sent = relationship("Message", back_populates="sender", foreign_keys="Message.sender_id")
    messages_received = relationship(
        "Message", back_populates="receiver", foreign_keys="Message.receiver_id"
    )
    sessions = relationship("Session", back_populates="user")
    devices = relationship("Device", back_populates="user")
    activity_logs = relationship("ActivityLog", back_populates="user")
