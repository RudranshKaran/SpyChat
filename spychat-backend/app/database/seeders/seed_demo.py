from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.models.user import User


def seed_demo_users(db: Session) -> None:
    if db.query(User).filter(User.username == "agentx").first():
        return

    users = [
        User(username="agentx", email="agentx@example.com", password_hash=get_password_hash("SpyChat@123")),
        User(username="agenty", email="agenty@example.com", password_hash=get_password_hash("SpyChat@123")),
    ]
    db.add_all(users)
    db.commit()
