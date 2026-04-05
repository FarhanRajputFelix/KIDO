from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from app.core.deps import get_current_user
from app.models.user import User, UserRole
from app.models.child import ChildProfile
from app.models.parent import ParentProfile
from app.models.teacher import TeacherProfile
from app.schemas.auth import UserCreate, UserOut, Token, UserLogin

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user (parent, child, or teacher)."""
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=user_data.email,
        full_name=user_data.full_name,
        password_hash=get_password_hash(user_data.password),
        role=user_data.role,
    )
    db.add(user)
    db.flush()

    # Auto-create role profile
    if user_data.role == UserRole.PARENT:
        profile = ParentProfile(user_id=user.id)
        db.add(profile)
    elif user_data.role == UserRole.TEACHER:
        profile = TeacherProfile(user_id=user.id)
        db.add(profile)

    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login with email + password, receive JWT tokens."""
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account deactivated")

    access_token = create_access_token(data={"sub": str(user.id), "role": user.role.value})
    refresh_token = create_refresh_token(user.id)

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        role=user.role,
        user_id=user.id,
    )


@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    """Get currently authenticated user."""
    return current_user


@router.post("/logout")
def logout():
    """Logout (client should discard the token)."""
    return {"message": "Logged out successfully"}
