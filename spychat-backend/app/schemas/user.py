from datetime import datetime

from pydantic import BaseModel, EmailStr, Field
from pydantic import ConfigDict


class UserProfile(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    updated_at: datetime
    last_login: datetime | None
    account_status: str

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    username: str | None = Field(default=None, min_length=3, max_length=50)
