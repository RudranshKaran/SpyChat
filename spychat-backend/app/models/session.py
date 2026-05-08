from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class Session(Base):
    __tablename__ = "sessions"
    __table_args__ = (
        Index("ix_sessions_user_id", "user_id"),
        Index("ix_sessions_status", "session_status"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    jwt_token: Mapped[str] = mapped_column(String(512))
    refresh_token: Mapped[str] = mapped_column(String(512))
    login_time: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    expiry_time: Mapped[datetime] = mapped_column(DateTime)
    device_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
    session_status: Mapped[str] = mapped_column(String(20), default="Active")

    user = relationship("User", back_populates="sessions")
