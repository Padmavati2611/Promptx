from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_password_hash, create_access_token, get_current_user
from app.models.database_models import User, UserRole
from app.schemas import UserCreate, UserLogin, UserResponse, Token
import uuid

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing_user = result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=get_password_hash(user_data.password),
        role=UserRole(user_data.role),
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # Generate token
    access_token = create_access_token(
        data={"sub": str(new_user.id), "email": new_user.email, "role": new_user.role.value, "name": new_user.name}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(login_data: UserLogin, db: AsyncSession = Depends(get_db)):
    from app.core.security import verify_password

    result = await db.execute(select(User).where(User.email == login_data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is deactivated")

    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": user.role.value, "name": user.name}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == int(current_user["id"])))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/seed-admin")
async def seed_admin(db: AsyncSession = Depends(get_db)):
    """Create default admin user for testing"""
    result = await db.execute(select(User).where(User.email == "admin@thermal.ai"))
    existing = result.scalar_one_or_none()
    if existing:
        return {"message": "Admin user already exists"}

    admin_user = User(
        name="System Administrator",
        email="admin@thermal.ai",
        hashed_password=get_password_hash("admin123"),
        role=UserRole.admin,
    )
    db.add(admin_user)
    await db.commit()
    return {"message": "Admin user created successfully", "email": "admin@thermal.ai", "password": "admin123"}
