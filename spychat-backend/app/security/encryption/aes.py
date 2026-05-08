import base64
import os

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

from app.security.errors import DecryptionError, EncryptionError
from app.security.key_management.keys import load_aes_key
from app.security.validators.crypto_validators import decode_b64, ensure_length


NONCE_LEN = 12
TAG_LEN = 16


def encrypt(plaintext: str, aad: bytes | None = None) -> dict[str, str]:
    if not plaintext:
        raise EncryptionError("Plaintext is empty")

    key = load_aes_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(NONCE_LEN)
    ciphertext_and_tag = aesgcm.encrypt(nonce, plaintext.encode("utf-8"), aad)
    ciphertext = ciphertext_and_tag[:-TAG_LEN]
    tag = ciphertext_and_tag[-TAG_LEN:]

    return {
        "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
        "nonce": base64.b64encode(nonce).decode("utf-8"),
        "tag": base64.b64encode(tag).decode("utf-8"),
    }


def decrypt(ciphertext_b64: str, nonce_b64: str, tag_b64: str, aad: bytes | None = None) -> str:
    nonce = decode_b64(nonce_b64, "nonce")
    tag = decode_b64(tag_b64, "tag")
    ciphertext = decode_b64(ciphertext_b64, "ciphertext")

    ensure_length(nonce, NONCE_LEN, "nonce")
    ensure_length(tag, TAG_LEN, "tag")

    try:
        key = load_aes_key()
        aesgcm = AESGCM(key)
        plaintext = aesgcm.decrypt(nonce, ciphertext + tag, aad)
        return plaintext.decode("utf-8")
    except Exception as exc:
        raise DecryptionError("AES-GCM decryption failed") from exc
