import pandas as pd
import datetime
from app import database, models
from app.utils import get_password_hash, write_log

DB = next(database.SessionLocal().bind.connect())  # not used; use SessionLocal below
db = database.SessionLocal()

EXCEL_PATH = "/mnt/data/SubscriptionUseCase_Dataset.xlsx"  # change if needed

def safe_get(df, idx, col, default=None):
    try:
        v = df.loc[idx, col]
        if pd.isna(v):
            return default
        return v
    except Exception:
        return default

def seed():
    print("Loading Excel:", EXCEL_PATH)
    xls = pd.ExcelFile(EXCEL_PATH)

    # Users
    try:
        users_df = pd.read_excel(xls, sheet_name="User_Data")
    except:
        users_df = pd.read_excel(xls, sheet_name=0)
    for _, r in users_df.iterrows():
        email = r.get("email") or r.get("Email") or f"user{_}@example.com"
        name = r.get("name") or r.get("Name") or f"User {_}"
        hashed = get_password_hash("password123")
        existing = db.query(models.User).filter(models.User.email == email).first()
        if not existing:
            u = models.User(email=email, full_name=name, hashed_password=hashed, is_active=True)
            db.add(u)
    db.commit()
    print("Seeded users")

    # Plans
    try:
        plans_df = pd.read_excel(xls, sheet_name="Subscription_Plans")
    except:
        try:
            plans_df = pd.read_excel(xls, sheet_name="Subscription Plans")
        except:
            plans_df = pd.DataFrame([{"plan_id":1,"product_id":"Basic","price":9.99,"quota":50}])
    for _, r in plans_df.iterrows():
        pid = int(r.get("plan_id") or r.get("id") or (_+1))
        name = r.get("product_id") or r.get("name") or f"Plan {_}"
        price = float(r.get("price") or 0.0)
        quota = int(r.get("quota") or r.get("quota_gb") or 0)
        existing = db.query(models.Plan).filter(models.Plan.name == name).first()
        if not existing:
            p = models.Plan(name=name, price=price, quota_gb=quota, features={})
            db.add(p)
    db.commit()
    print("Seeded plans")

    # Subscriptions
    try:
        subs_df = pd.read_excel(xls, sheet_name="Subscriptions")
    except:
        subs_df = pd.DataFrame()
    for _, r in subs_df.iterrows():
        try:
            uid = int(r.get("user_id"))
        except:
            # try to match by email
            email = r.get("email") or r.get("Email")
            user = db.query(models.User).filter(models.User.email == email).first()
            uid = user.id if user else None
        if uid is None:
            continue
        # find plan by product_id or plan id
        pid = r.get("product_id") or r.get("plan_id")
        plan = None
        if pd.notna(pid):
            plan = db.query(models.Plan).filter((models.Plan.id == int(pid)) | (models.Plan.name == str(pid))).first()
        if not plan:
            plan = db.query(models.Plan).first()
        status = r.get("status") or "active"
        last_billed = r.get("last_billed")
        term_date = r.get("term_date")
        auto_renew = True
        s = models.Subscription(user_id=uid, plan_id=plan.id, status=status,
                                start_date=pd.to_datetime(last_billed) if pd.notna(last_billed) else datetime.datetime.utcnow(),
                                end_date=pd.to_datetime(term_date) if pd.notna(term_date) else None,
                                auto_renew=auto_renew)
        db.add(s)
    db.commit()
    print("Seeded subscriptions")

    # Billing
    try:
        billing_df = pd.read_excel(xls, sheet_name="Billing_Information")
    except:
        billing_df = pd.DataFrame()
    for _, r in billing_df.iterrows():
        try:
            sub_id = int(r.get("subscription_id"))
        except:
            # try to map by other
            sub_id = None
        if sub_id is None:
            # attempt to find subscription by user+plan
            continue
        amount = float(r.get("amount") or 0.0)
        billing_date = pd.to_datetime(r.get("billing_date")) if pd.notna(r.get("billing_date")) else datetime.datetime.utcnow()
        status = r.get("payment_status") or "paid"
        bill = models.Billing(subscription_id=sub_id, amount=amount, billing_date=billing_date, status=status, meta={})
        db.add(bill)
    db.commit()
    print("Seeded billing (if present)")

    # write seed log
    write_log(db, action="seed", actor="system", payload={"info":"seed complete"})
    print("Seeding finished")

if __name__ == "__main__":
    seed()
