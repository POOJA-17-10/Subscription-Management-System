from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models
from ..utils import get_db, get_current_active_user

router = APIRouter(prefix="/logs", tags=["logs"])

@router.get("/subscriptions/{sub_id}")
def get_subscription_logs(sub_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    if sub.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    logs = db.query(models.Log).filter(models.Log.subscription_id == sub_id).order_by(models.Log.created_at.desc()).all()
    return [{"id": l.id, "action": l.action, "previous_status": l.previous_status, "new_status": l.new_status, "actor": l.actor, "created_at": l.created_at.isoformat(), "payload": l.payload} for l in logs]

@router.get("/users/{user_id}")
def get_user_logs(user_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    logs = db.query(models.Log).filter(models.Log.user_id == user_id).order_by(models.Log.created_at.desc()).all()
    return [{"id": l.id, "subscription_id": l.subscription_id, "action": l.action, "created_at": l.created_at.isoformat(), "payload": l.payload} for l in logs]
