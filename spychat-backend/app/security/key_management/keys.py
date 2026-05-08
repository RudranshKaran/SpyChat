import base64
import os

from app.core.config import settings
from app.security.errors import KeyManagementError


def generate_aes_key() -> str:
    return base64.b64encode(os.urandom(32)).decode("utf-8")


def load_aes_key() -> bytes:
    if settings.encryption_key in ("", "replace_with_base64_32_byte_key"):
        raise KeyManagementError("ENCRYPTION_KEY is not configured")
    try:
        key = base64.b64decode(settings.encryption_key, validate=True)
    except Exception as exc:
        raise KeyManagementError("ENCRYPTION_KEY must be base64") from exc
    if len(key) != 32:
        raise KeyManagementError("ENCRYPTION_KEY must decode to 32 bytes")
    return key
