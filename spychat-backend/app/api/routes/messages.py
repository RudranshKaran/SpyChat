from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.database.session import get_db
from app.schemas.message import MessageInboxItem, MessageSend, MessageViewResponse
from app.services.message_service import (
    delete_message,
    get_inbox,
    list_conversations,
    send_message,
    view_message,
)

router = APIRouter(prefix="/messages", tags=["messages"])


@router.post("/send")
def send(payload: MessageSend, user=Depends(get_current_user), db: Session = Depends(get_db)):
    send_message(db, user.id, payload.receiver_id, payload.message, payload.self_destruct_time)
    return {"message": "Encrypted message sent successfully"}


@router.get("/inbox", response_model=list[MessageInboxItem])
def inbox(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return get_inbox(db, user.id)


@router.get("/view/{message_id}", response_model=MessageViewResponse)
def view(message_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    plaintext = view_message(db, user.id, message_id)
    return MessageViewResponse(message=plaintext, message_id=message_id)


@router.delete("/delete/{message_id}")
def destroy(message_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    delete_message(db, user.id, message_id)
    return {"message": "Message destroyed successfully"}


@router.get("/conversations")
def conversations(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return {"conversations": list_conversations(db, user.id)}
