import hmac

from app.security.errors import IntegrityError
from app.security.hashing.sha256 import sha256_hex


def hash_encrypted_payload(ciphertext_b64: str, nonce_b64: str, tag_b64: str) -> str:
    payload = f"{ciphertext_b64}.{nonce_b64}.{tag_b64}"
    return sha256_hex(payload)


def verify_encrypted_payload(
    ciphertext_b64: str,
    nonce_b64: str,
    tag_b64: str,
    expected_hash: str,
) -> None:
    computed = hash_encrypted_payload(ciphertext_b64, nonce_b64, tag_b64)
    if not hmac.compare_digest(computed, expected_hash):
        raise IntegrityError("Integrity verification failed")
