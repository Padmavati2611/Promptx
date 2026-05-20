from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.database_models import Camera
from app.schemas import CameraCreate, CameraResponse

router = APIRouter(prefix="/cameras", tags=["Cameras"])

@router.get("/", response_model=List[CameraResponse])
async def get_cameras(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Camera).order_by(Camera.id))
    return result.scalars().all()

@router.get("/status")
async def get_camera_status(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Camera))
    cameras = result.scalars().all()
    return {
        "total": len(cameras),
        "online": sum(1 for c in cameras if c.status == "online"),
        "offline": sum(1 for c in cameras if c.status == "offline"),
        "warning": sum(1 for c in cameras if c.status == "warning"),
    }

@router.get("/{camera_id}", response_model=CameraResponse)
async def get_camera(
    camera_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Camera).where(Camera.camera_id == camera_id))
    camera = result.scalar_one_or_none()
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")
    return camera

@router.post("/", response_model=CameraResponse)
async def create_camera(
    camera_data: CameraCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    new_camera = Camera(**camera_data.model_dump())
    db.add(new_camera)
    await db.commit()
    await db.refresh(new_camera)
    return new_camera

@router.post("/seed")
async def seed_cameras(db: AsyncSession = Depends(get_db)):
    """Create sample cameras for testing"""
    sample_cameras = [
        {"name": "Perimeter North", "camera_id": "CAM-001", "zone": "Zone A", "location": "North boundary fence", "latitude": 37.7749, "longitude": -122.4194},
        {"name": "Main Gate", "camera_id": "CAM-002", "zone": "Zone B", "location": "Main entrance gate", "latitude": 37.7750, "longitude": -122.4195},
        {"name": "Parking Lot", "camera_id": "CAM-003", "zone": "Zone C", "location": "Vehicle parking area", "latitude": 37.7751, "longitude": -122.4193},
        {"name": "Warehouse East", "camera_id": "CAM-004", "zone": "Zone D", "location": "Eastern warehouse facility", "latitude": 37.7748, "longitude": -122.4192},
        {"name": "South Fence", "camera_id": "CAM-005", "zone": "Zone E", "location": "Southern perimeter fence", "latitude": 37.7747, "longitude": -122.4194},
        {"name": "Building A", "camera_id": "CAM-006", "zone": "Zone F", "location": "Building A main entrance", "latitude": 37.7752, "longitude": -122.4196},
    ]

    for cam_data in sample_cameras:
        new_camera = Camera(**cam_data)
        db.add(new_camera)

    await db.commit()
    return {"message": "Sample cameras created", "count": len(sample_cameras)}
