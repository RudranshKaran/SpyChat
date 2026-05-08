from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class ActivityLogResponse(BaseModel):
    id: int
    user_id: int | None
    activity_type: str
    activity_description: str
    timestamp: datetime
    risk_level: str

    model_config = ConfigDict(from_attributes=True)
