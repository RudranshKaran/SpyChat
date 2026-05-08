from app.database.repositories.base import BaseRepository
from app.models.session import Session


class SessionRepository(BaseRepository):
    def active_sessions(self, user_id: int) -> list[Session]:
        return (
            self.db.query(Session)
            .filter(Session.user_id == user_id, Session.session_status == "Active")
            .all()
        )
