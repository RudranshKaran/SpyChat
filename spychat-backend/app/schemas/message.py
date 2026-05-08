from datetime import datetime

from pydantic import BaseModel, Field
from pydantic import ConfigDict


class MessageSend(BaseModel):
    receiver_id: int
    message: str = Field(min_length=1, max_length=2000)
    self_destruct_time: datetime | None = None


class MessageInboxItem(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    encrypted_message: str
    viewed_status: bool
    self_destruct_time: datetime | None
    created_at: datetime
    message_status: str

    model_config = ConfigDict(from_attributes=True)


class MessageViewResponse(BaseModel):
    message: str
    message_id: int


class ConversationSummary(BaseModel):
    partner_id: int
    last_message_time: datetime
    unread_count: int
