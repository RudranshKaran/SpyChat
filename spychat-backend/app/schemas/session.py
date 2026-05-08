from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class SessionResponse(BaseModel):
    id: int
    user_id: int
    login_time: datetime
    expiry_time: datetime
    session_status: str

    model_config = ConfigDict(from_attributes=True)
