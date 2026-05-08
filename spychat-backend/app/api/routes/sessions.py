from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.database.session import get_db
from app.schemas.session import SessionResponse
from app.services.session_service import get_active_sessions, terminate_session

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.get("/active", response_model=list[SessionResponse])
def active(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return get_active_sessions(db, user.id)


@router.delete("/terminate/{session_id}")
def terminate(session_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    terminate_session(db, user.id, session_id)
    return {"message": "Session terminated"}
