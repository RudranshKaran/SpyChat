from sqlalchemy.orm import Session

from app.database.repositories.base import BaseRepository
from app.models.user import User


class UserRepository(BaseRepository):
    def get_by_id(self, user_id: int) -> User | None:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_username(self, username: str) -> User | None:
        return self.db.query(User).filter(User.username == username).first()

    def get_by_email(self, email: str) -> User | None:
        return self.db.query(User).filter(User.email == email).first()
