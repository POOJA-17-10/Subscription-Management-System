import pandas as pd
import joblib
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split as surprise_split, accuracy

EXCEL_PATH = "../data/SubscriptionUseCase_Dataset.xlsx"
subs = pd.read_excel(EXCEL_PATH, sheet_name="Subscriptions")

ratings = subs[["user_id", "plan_id"]].copy()
ratings["rating"] = 1  # implicit feedback

reader = Reader(rating_scale=(0, 1))
data = Dataset.load_from_df(ratings[["user_id", "plan_id", "rating"]], reader)

trainset, testset = surprise_split(data, test_size=0.2, random_state=42)
model = SVD()
model.fit(trainset)

predictions = model.test(testset)
accuracy.rmse(predictions)

joblib.dump(model, "recommender.pkl")
print("✅ Recommender model saved")
