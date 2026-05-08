from app.core.security import decode_token
from app.security.errors import SessionSecurityError


def validate_access_token(token: str) -> dict:
    try:
        payload = decode_token(token)
    except Exception as exc:
        raise SessionSecurityError("Invalid token") from exc

    if payload.get("typ") == "refresh":
        raise SessionSecurityError("Refresh token cannot access protected routes")

    if not payload.get("sub"):
        raise SessionSecurityError("Token missing subject")

    return payload
