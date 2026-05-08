from datetime import datetime

from app.utils.time import utcnow


def is_expired(self_destruct_time: datetime | None) -> bool:
    return self_destruct_time is not None and self_destruct_time < utcnow()


def should_destroy(viewed_status: bool, self_destruct_time: datetime | None, suspicious: bool) -> bool:
    return viewed_status or is_expired(self_destruct_time) or suspicious


def mark_destroyed(message) -> None:
    message.viewed_status = True
    message.message_status = "Destroyed"
    message.destroyed_at = utcnow()
