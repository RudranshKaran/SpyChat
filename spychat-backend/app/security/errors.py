class SecurityError(Exception):
    pass


class EncryptionError(SecurityError):
    pass


class DecryptionError(SecurityError):
    pass


class IntegrityError(SecurityError):
    pass


class ValidationError(SecurityError):
    pass


class KeyManagementError(SecurityError):
    pass


class SessionSecurityError(SecurityError):
    pass
