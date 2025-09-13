from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models
from ..utils import get_db, get_current_active_user
import joblib, numpy as np, os

router = APIRouter(prefix="/ml", tags=["ml"])

# -------- Load models at startup --------
CHURN_MODEL = None
CHURN_SCALER = None
RECOMMENDER = None

churn_model_path = os.path.join("ml", "churn_model.pkl")
churn_scaler_path = os.path.join("ml", "churn_scaler.pkl")
recommender_path = os.path.join("ml", "recommender.pkl")

if os.path.exists(churn_model_path) and os.path.exists(churn_scaler_path):
    CHURN_MODEL = joblib.load(churn_model_path)
    CHURN_SCALER = joblib.load(churn_scaler_path)

if os.path.exists(recommender_path):
    RECOMMENDER = joblib.load(recommender_path)

# -------- Endpoints --------

@router.get("/users/{user_id}/recommendations")
def recommend(
    user_id: int,
    top_n: int = 3,
    current_user=Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Only allow own or admin access
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")

    if RECOMMENDER is None:
        raise HTTPException(status_code=500, detail="Recommendation model not available")

    plans = db.query(models.Plan).filter(models.Plan.active == True).all()
    recs = []
    for p in plans:
        # Using surprise-like model's predict(user, item).est
        pred = RECOMMENDER.predict(user_id, p.id).est
        recs.append({"plan_id": p.id, "name": p.name, "score": round(pred, 3)})

    recs = sorted(recs, key=lambda x: x["score"], reverse=True)[:top_n]
    return {"user_id": user_id, "recommendations": recs}


@router.get("/admin/churn-risk")
def churn_risk(
    top: int = 10,
    current_user=Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can view churn risk")

    if CHURN_MODEL is None or CHURN_SCALER is None:
        raise HTTPException(status_code=500, detail="Churn model not available")

    users = db.query(models.User).all()
    risks = []
    for u in users:
        sub = db.query(models.Subscription).filter(models.Subscription.user_id == u.id).first()
        if not sub:
            continue
        # Example features: plan_id, auto_renew flag, grace_days, days active
        features = np.array([[sub.plan_id, int(sub.auto_renew), sub.grace_days or 0, 30]])
        scaled = CHURN_SCALER.transform(features)
        prob = CHURN_MODEL.predict_proba(scaled)[0][1]
        risks.append({"user_id": u.id, "email": u.email, "risk_score": round(float(prob), 3)})

    risks = sorted(risks, key=lambda x: x["risk_score"], reverse=True)[:top]
    return {"top": top, "risks": risks}


@router.post("/admin/experiments")
def create_experiment(
    payload: dict,
    current_user=Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admin can create experiments")

    exp = models.Experiment(
        name=payload.get("name", "exp"),
        variant=payload.get("variant"),
        cohort=payload.get("cohort"),
        metric=payload.get("metric"),
        status="running"
    )
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return {"id": exp.id, "name": exp.name, "status": exp.status}
