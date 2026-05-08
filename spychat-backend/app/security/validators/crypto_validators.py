import base64

from app.security.errors import ValidationError


def decode_b64(value: str, field_name: str) -> bytes:
    try:
        return base64.b64decode(value, validate=True)
    except Exception as exc:
        raise ValidationError(f"Invalid base64 for {field_name}") from exc


def ensure_length(value: bytes, expected_len: int, field_name: str) -> None:
    if len(value) != expected_len:
        raise ValidationError(f"Invalid length for {field_name}")
