from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.database_models import Detection
from app.schemas import DetectionResponse, ThreatScore
import random

router = APIRouter(prefix="/detections", tags=["Detections"])

@router.get("/latest", response_model=List[DetectionResponse])
async def get_latest_detections(
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Detection).order_by(desc(Detection.created_at)).limit(limit)
    )
    return result.scalars().all()

@router.get("/threat-score", response_model=ThreatScore)
async def get_threat_score(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    recent_result = await db.execute(
        select(Detection).order_by(desc(Detection.created_at)).limit(50)
    )
    recent = recent_result.scalars().all()

    if not recent:
        return ThreatScore(
            overall_score=15.0,
            intrusion_score=12.0,
            motion_score=18.0,
            weapon_score=5.0,
            threat_level="LOW",
        )

    avg_conf = sum(d.confidence for d in recent) / len(recent)
    high_conf = sum(1 for d in recent if d.confidence > 90)

    intrusion_score = min(100, high_conf * 10 + avg_conf * 0.5)
    motion_score = min(100, len(recent) * 2 + random.randint(5, 15))
    weapon_score = max(0, sum(1 for d in recent if d.class_name == "weapon") * 20)

    overall = (intrusion_score * 0.4 + motion_score * 0.35 + weapon_score * 0.25)

    if overall < 25:
        level = "LOW"
    elif overall < 50:
        level = "MODERATE"
    elif overall < 75:
        level = "ELEVATED"
    else:
        level = "CRITICAL"

    return ThreatScore(
        overall_score=round(overall, 1),
        intrusion_score=round(intrusion_score, 1),
        motion_score=round(motion_score, 1),
        weapon_score=round(weapon_score, 1),
        threat_level=level,
    )

@router.post("/process-frame")
async def process_frame(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Simulate frame processing with YOLOv8 detection"""
    return {
        "detections": [
            {"class": "person", "confidence": 0.94, "bbox": [120, 80, 200, 350]},
            {"class": "person", "confidence": 0.87, "bbox": [400, 100, 180, 320]},
        ],
        "processing_time_ms": 45,
        "fps": 30,
    }
