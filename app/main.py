from fastapi import FastAPI
from . import models, database
from .routers import auth, subscriptions, plans, billing, logs, analytics, ml

# create tables if not exist
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Subscription Management Backend")

# include routers
app.include_router(auth.router)
app.include_router(subscriptions.router)
app.include_router(plans.router)
app.include_router(billing.router)
app.include_router(logs.router)
app.include_router(analytics.router)
app.include_router(ml.router)

@app.get("/")
def root():
    return {"message": "Subscription backend running. Use /docs for API docs."}
