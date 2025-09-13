from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..utils import get_db, get_current_active_user, write_log

router = APIRouter(prefix="/plans", tags=["plans"])

@router.get("/", response_model=List[schemas.PlanOut])
def list_plans(db: Session = Depends(get_db)):
    return db.query(models.Plan).filter(models.Plan.active == True).all()

@router.get("/{plan_id}", response_model=schemas.PlanOut)
def get_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = db.query(models.Plan).filter(models.Plan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    return plan

@router.post("/", response_model=schemas.PlanOut, status_code=201)
def create_plan(payload: schemas.PlanIn, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can create plans")
    plan = models.Plan(name=payload.name, price=payload.price, quota_gb=payload.quota_gb, features=payload.features or {}, active=payload.active)
    db.add(plan)
    db.commit()
    db.refresh(plan)
    write_log(db, action="plan_create", actor="admin", payload={"plan_id": plan.id})
    return plan

@router.put("/{plan_id}", response_model=schemas.PlanOut)
def update_plan(plan_id: int, payload: schemas.PlanIn, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can update plans")
    plan = db.query(models.Plan).filter(models.Plan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    plan.name = payload.name
    plan.price = payload.price
    plan.quota_gb = payload.quota_gb
    plan.features = payload.features or {}
    plan.active = payload.active
    db.add(plan)
    db.commit()
    db.refresh(plan)
    write_log(db, action="plan_update", actor="admin", payload={"plan_id": plan_id})
    return plan

@router.delete("/{plan_id}")
def delete_plan(plan_id: int, current_user = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can delete plans")
    plan = db.query(models.Plan).filter(models.Plan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    plan.active = False
    db.add(plan)
    db.commit()
    write_log(db, action="plan_deactivate", actor="admin", payload={"plan_id": plan_id})
    return {"message": "Plan deactivated", "plan_id": plan_id}
