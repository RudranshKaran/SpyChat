import base64
import hashlib
import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

from app.core.config import settings


class EncryptionError(Exception):
    pass


def _get_key() -> bytes:
    try:
        key = base64.b64decode(settings.encryption_key)
    except Exception as exc:
        raise EncryptionError("Invalid ENCRYPTION_KEY encoding") from exc
    if len(key) != 32:
        raise EncryptionError("ENCRYPTION_KEY must be 32 bytes after base64 decode")
    return key


def hash_message(plaintext: str) -> str:
    return hashlib.sha256(plaintext.encode("utf-8")).hexdigest()


def encrypt_message(plaintext: str) -> dict[str, str]:
    key = _get_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    ciphertext_and_tag = aesgcm.encrypt(nonce, plaintext.encode("utf-8"), None)
    ciphertext = ciphertext_and_tag[:-16]
    tag = ciphertext_and_tag[-16:]
    return {
        "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
        "nonce": base64.b64encode(nonce).decode("utf-8"),
        "tag": base64.b64encode(tag).decode("utf-8"),
    }


def decrypt_message(ciphertext_b64: str, nonce_b64: str, tag_b64: str) -> str:
    key = _get_key()
    aesgcm = AESGCM(key)
    nonce = base64.b64decode(nonce_b64)
    ciphertext = base64.b64decode(ciphertext_b64)
    tag = base64.b64decode(tag_b64)
    plaintext = aesgcm.decrypt(nonce, ciphertext + tag, None)
    return plaintext.decode("utf-8")
