from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..utils import get_db, get_current_active_user, write_log

router = APIRouter(prefix="/billing", tags=["billing"])

@router.post("/charge", response_model=schemas.BillingOut)
def process_billing(payload: schemas.BillingIn, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == payload.subscription_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    status_str = "paid" if payload.amount >= 0 else "failed"
    bill = models.Billing(subscription_id=payload.subscription_id, amount=payload.amount, status=status_str, meta=payload.meta or {})
    db.add(bill)
    db.commit()
    db.refresh(bill)
    write_log(db, action="billing_charge", user_id=sub.user_id, subscription_id=sub.id, new_status=status_str, actor="system", payload={"amount": payload.amount})
    return bill

@router.get("/{billing_id}", response_model=schemas.BillingOut)
def get_billing(billing_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    bill = db.query(models.Billing).filter(models.Billing.id == billing_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Billing not found")
    if not current_user.is_admin:
        sub = db.query(models.Subscription).filter(models.Subscription.id == bill.subscription_id).first()
        if sub.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized")
    return bill

@router.get("/user/{user_id}", response_model=List[schemas.BillingOut])
def get_user_billing(user_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    bills = db.query(models.Billing).join(models.Subscription).filter(models.Subscription.user_id == user_id).all()
    return bills

@router.get("/subscription/{sub_id}", response_model=List[schemas.BillingOut])
def get_subscription_billing(sub_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    sub = db.query(models.Subscription).filter(models.Subscription.id == sub_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found")
    if sub.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    bills = db.query(models.Billing).filter(models.Billing.subscription_id == sub_id).all()
    return bills
