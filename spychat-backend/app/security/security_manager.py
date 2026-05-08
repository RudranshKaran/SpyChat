import logging

from app.security.encryption.aes import decrypt, encrypt
from app.security.errors import IntegrityError
from app.security.integrity.verify import hash_encrypted_payload, verify_encrypted_payload

logger = logging.getLogger("spychat.security")


class SecurityManager:
    def encrypt_for_storage(self, plaintext: str) -> dict[str, str]:
        encrypted = encrypt(plaintext)
        integrity_hash = hash_encrypted_payload(
            encrypted["ciphertext"], encrypted["nonce"], encrypted["tag"]
        )
        logger.info("encryption_event action=encrypt")
        return {
            "ciphertext": encrypted["ciphertext"],
            "nonce": encrypted["nonce"],
            "tag": encrypted["tag"],
            "hash": integrity_hash,
        }

    def verify_integrity(self, ciphertext_b64: str, nonce_b64: str, tag_b64: str, expected: str) -> None:
        verify_encrypted_payload(ciphertext_b64, nonce_b64, tag_b64, expected)

    def decrypt_after_verify(
        self, ciphertext_b64: str, nonce_b64: str, tag_b64: str, expected: str
    ) -> str:
        try:
            self.verify_integrity(ciphertext_b64, nonce_b64, tag_b64, expected)
        except IntegrityError:
            logger.warning("integrity_event status=failed")
            raise

        logger.info("integrity_event status=verified")
        return decrypt(ciphertext_b64, nonce_b64, tag_b64)


security_manager = SecurityManager()
