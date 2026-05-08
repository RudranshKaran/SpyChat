import logging

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


class SuspiciousRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        user_agent = request.headers.get("user-agent")
        if not user_agent:
            logging.warning("suspicious_request missing_user_agent path=%s", request.url.path)
        return await call_next(request)
