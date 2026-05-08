from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.message import Message
from app.security.errors import DecryptionError, IntegrityError, ValidationError
from app.security.security_manager import security_manager
from app.security.self_destruct.engine import is_expired, mark_destroyed
from app.services.activity_service import log_event


def _is_expired(message: Message) -> bool:
    return is_expired(message.self_destruct_time)


def send_message(
    db: Session,
    sender_id: int,
    receiver_id: int,
    plaintext: str,
    self_destruct_time: datetime | None,
) -> Message:
    encrypted = security_manager.encrypt_for_storage(plaintext)

    message = Message(
        sender_id=sender_id,
        receiver_id=receiver_id,
        encrypted_message=encrypted["ciphertext"],
        nonce=encrypted["nonce"],
        tag=encrypted["tag"],
        hash_value=encrypted["hash"],
        self_destruct_time=self_destruct_time,
    )
    db.add(message)
    db.commit()
    db.refresh(message)

    log_event(db, sender_id, "MESSAGE_SENT", f"Message sent to {receiver_id}", "Low")
    return message


def get_inbox(db: Session, user_id: int) -> list[Message]:
    messages = (
        db.query(Message)
        .filter(Message.receiver_id == user_id, Message.viewed_status.is_(False))
        .order_by(Message.created_at.desc())
        .all()
    )

    valid_messages: list[Message] = []
    for msg in messages:
        if _is_expired(msg):
            db.delete(msg)
        else:
            valid_messages.append(msg)
    db.commit()

    return valid_messages


def view_message(db: Session, user_id: int, message_id: int) -> str:
    message = (
        db.query(Message)
        .filter(Message.id == message_id, Message.receiver_id == user_id)
        .first()
    )
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    if message.viewed_status:
        raise HTTPException(status_code=410, detail="Message already viewed")

    if _is_expired(message):
        db.delete(message)
        db.commit()
        raise HTTPException(status_code=410, detail="Message expired")

    try:
        plaintext = security_manager.decrypt_after_verify(
            message.encrypted_message,
            message.nonce,
            message.tag,
            message.hash_value,
        )
    except IntegrityError:
        log_event(db, user_id, "INTEGRITY_FAIL", "Message integrity failed", "High")
        raise HTTPException(status_code=409, detail="Integrity verification failed")
    except ValidationError:
        log_event(db, user_id, "CRYPTO_INVALID", "Invalid ciphertext data", "High")
        raise HTTPException(status_code=400, detail="Invalid ciphertext")
    except DecryptionError:
        log_event(db, user_id, "DECRYPT_FAIL", "Decryption failed", "High")
        raise HTTPException(status_code=422, detail="Decryption failed")

    mark_destroyed(message)
    db.commit()

    db.delete(message)
    db.commit()

    log_event(db, user_id, "MESSAGE_VIEWED", f"Message {message_id} viewed", "Low")
    return plaintext


def delete_message(db: Session, user_id: int, message_id: int) -> None:
    message = (
        db.query(Message)
        .filter(Message.id == message_id, Message.receiver_id == user_id)
        .first()
    )
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(message)
    db.commit()
    log_event(db, user_id, "MESSAGE_DESTROYED", f"Message {message_id} destroyed", "Medium")


def list_conversations(db: Session, user_id: int) -> list[dict[str, int | datetime]]:
    rows = (
        db.query(Message)
        .filter((Message.sender_id == user_id) | (Message.receiver_id == user_id))
        .order_by(Message.created_at.desc())
        .all()
    )

    conversations: dict[int, dict[str, int | datetime]] = {}
    for msg in rows:
        partner_id = msg.receiver_id if msg.sender_id == user_id else msg.sender_id
        if partner_id not in conversations:
            conversations[partner_id] = {
                "partner_id": partner_id,
                "last_message_time": msg.created_at,
                "unread_count": 0,
            }
        if msg.receiver_id == user_id and not msg.viewed_status:
            conversations[partner_id]["unread_count"] += 1

    return list(conversations.values())
