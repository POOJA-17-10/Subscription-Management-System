from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from .. import models, schemas
from ..utils import get_db, get_current_active_user, write_log

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

@router.post("/", response_model=schemas.SubscriptionOut)
def create_subscription(payload: schemas.SubscriptionCreate, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    plan = db.query(models.Plan).filter(models.Plan.id == payload.plan_id, models.Plan.active == True).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found or inactive")
    sub = models.Subscription(user_id=current_user.id, plan_id=payload.plan_id, auto_renew=payload.auto_renew)
    db.add(sub)
    db.commit()
    db.refresh(sub)
    write_log(db, action="subscribe", user_id=current_user.id, subscription_id=sub.id, new_status=sub.status, actor="user", payload={"plan_id": payload.plan_id})
    return sub

@router.post("/{sub_id}/upgrade")
def upgrade_subscription(sub_id: int, plan_id: int = Body(..., embed=True), current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    if sub.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    plan = db.query(models.Plan).filter(models.Plan.id == plan_id, models.Plan.active == True).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found or inactive")
    prev = sub.plan_id
    sub.plan_id = plan_id
    db.add(sub)
    db.commit()
    db.refresh(sub)
    write_log(db, action="upgrade", user_id=current_user.id, subscription_id=sub.id, previous_status=str(prev), new_status=str(sub.plan_id), actor="user", payload={"new_plan": plan_id})
    return {"message": "Subscription plan changed", "subscription_id": sub.id, "new_plan": plan_id}

@router.post("/{sub_id}/cancel")
def cancel_subscription(sub_id: int, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    if sub.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    prev = sub.status
    sub.status = "cancelled"
    sub.end_date = datetime.datetime.utcnow()
    db.add(sub)
    db.commit()
    db.refresh(sub)
    write_log(db, action="cancel", user_id=current_user.id, subscription_id=sub.id, previous_status=prev, new_status=sub.status, actor="user")
    return {"message": "Subscription cancelled", "subscription_id": sub.id}

@router.get("/{sub_id}", response_model=schemas.SubscriptionOut)
def get_subscription(sub_id: int, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    if sub.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    return sub

@router.get("/user/{user_id}", response_model=List[schemas.SubscriptionOut])
def get_user_subscriptions(user_id: int, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    subs = db.query(models.Subscription).filter(models.Subscription.user_id == user_id).all()
    return subs
