from app.database.repositories.base import BaseRepository
from app.models.activity import ActivityLog


class ActivityLogRepository(BaseRepository):
    def list_for_user(self, user_id: int) -> list[ActivityLog]:
        return (
            self.db.query(ActivityLog)
            .filter(ActivityLog.user_id == user_id)
            .order_by(ActivityLog.timestamp.desc())
            .all()
        )
