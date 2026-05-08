from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.database.session import get_db
from app.schemas.activity import ActivityLogResponse
from app.services.activity_service import list_logs

router = APIRouter(prefix="/activity", tags=["activity"])


@router.get("/logs", response_model=list[ActivityLogResponse])
def logs(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return list_logs(db, user.id)
