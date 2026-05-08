from app.database.repositories.base import BaseRepository
from app.models.device import Device


class DeviceRepository(BaseRepository):
    def list_for_user(self, user_id: int) -> list[Device]:
        return self.db.query(Device).filter(Device.user_id == user_id).all()
