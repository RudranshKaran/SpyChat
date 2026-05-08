from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.database.session import get_db
from app.schemas.device import DeviceResponse, DeviceVerifyRequest
from app.services.device_service import list_devices, remove_device, verify_device

router = APIRouter(prefix="/devices", tags=["devices"])


@router.post("/verify", response_model=DeviceResponse)
def verify(payload: DeviceVerifyRequest, user=Depends(get_current_user), db: Session = Depends(get_db)):
    return verify_device(
        db,
        user.id,
        payload.device_fingerprint,
        payload.browser_name,
        payload.operating_system,
        payload.screen_resolution,
    )


@router.get("/list", response_model=list[DeviceResponse])
def list_all(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return list_devices(db, user.id)


@router.delete("/remove/{device_id}")
def remove(device_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    remove_device(db, user.id, device_id)
    return {"message": "Device removed"}
