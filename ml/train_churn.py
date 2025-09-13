import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

EXCEL_PATH = "../data/SubscriptionUseCase_Dataset.xlsx"

subs = pd.read_excel(EXCEL_PATH, sheet_name="Subscriptions")
billing = pd.read_excel(EXCEL_PATH, sheet_name="Billing_Information")

billing_summary = billing.groupby("subscription_id")["payment_status"].last().reset_index()
subs = subs.merge(billing_summary, on="subscription_id", how="left")

subs["churn"] = np.where(
    (subs["status"].str.lower() == "cancelled") |
    (subs["payment_status"].str.lower() == "failed"),
    1, 0
)

subs["tenure_days"] = (
    pd.to_datetime("today") - pd.to_datetime(subs["last_billed"], errors="coerce")
).dt.days.fillna(0)

features = subs[["plan_id", "auto_renew", "grace_days", "tenure_days"]].fillna(0)
X = features.values
y = subs["churn"].values

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

joblib.dump(model, "churn_model.pkl")
joblib.dump(scaler, "churn_scaler.pkl")
print("✅ Churn model saved")
