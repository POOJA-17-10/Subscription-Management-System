from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models
from ..utils import get_db, get_current_active_user

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/subscriptions-status")
def subs_status(db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can view analytics")
    total_active = db.query(func.count(models.Subscription.id)).filter(models.Subscription.status == "active").scalar() or 0
    total_cancelled = db.query(func.count(models.Subscription.id)).filter(models.Subscription.status == "cancelled").scalar() or 0
    return {"active": total_active, "cancelled": total_cancelled}

@router.get("/monthly-trends")
def monthly_trends(start: Optional[str] = Query(None), end: Optional[str] = Query(None), db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can view analytics")
    q = db.query(func.to_char(models.Subscription.start_date, 'YYYY-MM').label('month'), func.count(models.Subscription.id).label('count')).group_by('month').order_by('month')
    if start:
        try:
            start_dt = datetime.datetime.strptime(start + "-01", "%Y-%m-%d")
            q = q.filter(models.Subscription.start_date >= start_dt)
        except:
            pass
    if end:
        try:
            end_dt = datetime.datetime.strptime(end + "-01", "%Y-%m-%d") + datetime.timedelta(days=31)
            q = q.filter(models.Subscription.start_date <= end_dt)
        except:
            pass
    rows = q.all()
    return [{"month": r[0], "count": r[1]} for r in rows]

@router.get("/plan-usage")
def plan_usage(db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can view analytics")
    rows = db.query(models.Plan.id, models.Plan.name, func.count(models.Subscription.id).label("subs")).join(models.Subscription, models.Subscription.plan_id == models.Plan.id).group_by(models.Plan.id).all()
    return [{"plan_id": r[0], "plan_name": r[1], "subscriptions": r[2]} for r in rows]

@router.get("/reports/latest")
def reports_latest(limit: int = 10, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can view analytics")
    rows = db.query(models.Log).order_by(models.Log.created_at.desc()).limit(limit).all()
    return [{"id": r.id, "action": r.action, "user_id": r.user_id, "subscription_id": r.subscription_id, "created_at": r.created_at.isoformat()} for r in rows]

@router.get("/activity")
def activity(limit: int = 50, db: Session = Depends(get_db), current_user = Depends(get_current_active_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can view analytics")
    rows = db.query(models.Log).order_by(models.Log.created_at.desc()).limit(limit).all()
    return [{"id": r.id, "action": r.action, "user_id": r.user_id, "payload": r.payload, "created_at": r.created_at.isoformat()} for r in rows]
