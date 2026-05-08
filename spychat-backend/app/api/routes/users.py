from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.deps import get_current_user
from app.database.session import get_db
from app.schemas.user import UserProfile, UserUpdate
from app.services.user_service import get_profile, update_profile

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/profile", response_model=UserProfile)
def profile(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return get_profile(db, user.id)


@router.put("/update", response_model=UserProfile)
def update(payload: UserUpdate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    return update_profile(db, user.id, payload.email, payload.username)
