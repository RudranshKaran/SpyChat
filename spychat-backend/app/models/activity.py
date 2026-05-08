from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class ActivityLog(Base):
    __tablename__ = "activity_logs"
    __table_args__ = (
        Index("ix_activity_user_id", "user_id"),
        Index("ix_activity_timestamp", "timestamp"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    activity_type: Mapped[str] = mapped_column(String(50))
    activity_description: Mapped[str] = mapped_column(Text)
    metadata_json: Mapped[str | None] = mapped_column("metadata", Text, nullable=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    risk_level: Mapped[str] = mapped_column(String(20), default="Low")

    user = relationship("User", back_populates="activity_logs")
