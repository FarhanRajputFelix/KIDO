from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.user import UserRole


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.CHILD


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None
    token_type: str = "bearer"
    role: UserRole
    user_id: int


class TokenData(BaseModel):
    user_id: Optional[int] = None
    role: Optional[UserRole] = None


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: UserRole
    is_active: bool
    is_verified: bool
    avatar_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
