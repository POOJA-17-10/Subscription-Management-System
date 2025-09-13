from pydantic import BaseModel, EmailStr
from typing import Optional, List
import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool
    is_admin: bool
    created_at: datetime.datetime
    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None

class PlanIn(BaseModel):
    name: str
    price: float
    quota_gb: int
    features: Optional[dict] = None
    active: Optional[bool] = True

class PlanOut(PlanIn):
    id: int
    class Config:
        orm_mode = True

class SubscriptionCreate(BaseModel):
    plan_id: int
    auto_renew: Optional[bool] = True

class SubscriptionOut(BaseModel):
    id: int
    user_id: int
    plan_id: int
    status: str
    start_date: datetime.datetime
    end_date: Optional[datetime.datetime]
    auto_renew: bool
    class Config:
        orm_mode = True

class BillingIn(BaseModel):
    subscription_id: int
    amount: float
    meta: Optional[dict] = None

class BillingOut(BillingIn):
    id: int
    billing_date: datetime.datetime
    status: str
    class Config:
        orm_mode = True

class ExperimentIn(BaseModel):
    name: str
    variant: dict
    cohort: dict
    metric: str

class ExperimentOut(ExperimentIn):
    id: int
    created_at: datetime.datetime
    status: str
    class Config:
        orm_mode = True
