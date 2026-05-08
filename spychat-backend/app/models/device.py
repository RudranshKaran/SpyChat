from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models import Base


class Device(Base):
    __tablename__ = "devices"
    __table_args__ = (
        Index("ix_devices_user_id", "user_id"),
        Index("ix_devices_fingerprint", "device_fingerprint"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    device_fingerprint: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    browser_name: Mapped[str] = mapped_column(String(64))
    operating_system: Mapped[str] = mapped_column(String(64))
    screen_resolution: Mapped[str] = mapped_column(String(32))
    first_detected: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    last_used: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    device_status: Mapped[str] = mapped_column(String(20), default="Trusted")

    user = relationship("User", back_populates="devices")
