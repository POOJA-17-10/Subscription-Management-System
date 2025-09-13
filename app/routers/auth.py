from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import schemas, models
from ..utils import get_db, get_password_hash, verify_password, create_access_token, get_user_by_email, get_current_user, get_current_active_user

router = APIRouter()

@router.post("/auth/register", response_model=schemas.UserOut, status_code=201)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_in.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = get_password_hash(user_in.password)
    user = models.User(email=user_in.email, full_name=user_in.full_name, hashed_password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users/{user_id}", response_model=schemas.UserOut)
def get_user_profile(user_id: int, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    target = db.query(models.User).filter(models.User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if current_user.id != target.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    return target

@router.put("/users/{user_id}", response_model=schemas.UserOut)
def update_user_profile(user_id: int, payload: schemas.UserUpdate, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    target = db.query(models.User).filter(models.User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if current_user.id != target.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    if payload.full_name is not None:
        target.full_name = payload.full_name
    if payload.password:
        target.hashed_password = get_password_hash(payload.password)
    db.add(target)
    db.commit()
    db.refresh(target)
