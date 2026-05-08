from sqlalchemy.orm import Session

from app.models.device import Device
from app.services.activity_service import log_event
from app.utils.time import utcnow


def verify_device(
    db: Session,
    user_id: int,
    device_fingerprint: str,
    browser_name: str,
    operating_system: str,
    screen_resolution: str,
) -> Device:
    device = (
        db.query(Device)
        .filter(Device.user_id == user_id, Device.device_fingerprint == device_fingerprint)
        .first()
    )

    if device:
        device.last_used = utcnow()
        device.device_status = "Trusted"
    else:
        device = Device(
            user_id=user_id,
            device_fingerprint=device_fingerprint,
            browser_name=browser_name,
            operating_system=operating_system,
            screen_resolution=screen_resolution,
            device_status="Trusted",
        )
        db.add(device)

    db.commit()
    db.refresh(device)

    log_event(db, user_id, "DEVICE_VERIFIED", "Device verified", "Low")
    return device


def list_devices(db: Session, user_id: int) -> list[Device]:
    return db.query(Device).filter(Device.user_id == user_id).all()


def remove_device(db: Session, user_id: int, device_id: int) -> None:
    device = db.query(Device).filter(Device.id == device_id, Device.user_id == user_id).first()
    if device:
        db.delete(device)
        db.commit()
        log_event(db, user_id, "DEVICE_REMOVED", "Device removed", "Medium")
