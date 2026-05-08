from app.database.session import engine
from app.models import Base
from app.models import activity, device, message, session, user


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
