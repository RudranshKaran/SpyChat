from app.database.connection.engine import engine
from app.models import Base
from app.models import activity, device, message, session, user


def init_database() -> None:
    Base.metadata.create_all(bind=engine)
