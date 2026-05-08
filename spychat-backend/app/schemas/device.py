from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class DeviceVerifyRequest(BaseModel):
    device_fingerprint: str
    browser_name: str
    operating_system: str
    screen_resolution: str


class DeviceResponse(BaseModel):
    id: int
    device_fingerprint: str
    browser_name: str
    operating_system: str
    screen_resolution: str
    last_used: datetime
    device_status: str

    model_config = ConfigDict(from_attributes=True)
