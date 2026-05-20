from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from typing import List, Optional
from datetime import datetime, timedelta
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.database_models import Alert, AlertSeverity, AlertStatus, Camera
from app.schemas import AlertCreate, AlertResponse, AlertStats
import uuid

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/", response_model=List[AlertResponse])
async def get_alerts(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    severity: Optional[str] = None,
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    query = select(Alert)
    if severity:
        query = query.where(Alert.severity == AlertSeverity(severity))
    if status:
        query = query.where(Alert.status == AlertStatus(status))
    query = query.order_by(desc(Alert.created_at)).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/stats", response_model=AlertStats)
async def get_alert_stats(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)

    total = await db.execute(select(func.count(Alert.id)))
    active = await db.execute(select(func.count(Alert.id)).where(Alert.status == AlertStatus.active))
    critical = await db.execute(select(func.count(Alert.id)).where(Alert.severity == AlertSeverity.critical))
    today_alerts = await db.execute(select(func.count(Alert.id)).where(Alert.created_at >= today))
    avg_conf = await db.execute(select(func.avg(Alert.confidence)))

    return AlertStats(
        total_alerts=total.scalar() or 0,
        active_alerts=active.scalar() or 0,
        critical_alerts=critical.scalar() or 0,
        alerts_today=today_alerts.scalar() or 0,
        avg_confidence=round(avg_conf.scalar() or 0, 2),
    )

@router.get("/{alert_id}", response_model=AlertResponse)
async def get_alert(
    alert_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Alert).where(Alert.id == alert_id))
    alert = result.scalar_one_or_none()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.post("/", response_model=AlertResponse)
async def create_alert(
    alert_data: AlertCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    new_alert = Alert(
        alert_id=f"ALT-{uuid.uuid4().hex[:6].upper()}",
        alert_type=alert_data.alert_type,
        severity=AlertSeverity(alert_data.severity),
        location=alert_data.location,
        camera_id=alert_data.camera_id,
        confidence=alert_data.confidence,
        description=alert_data.description,
    )
    db.add(new_alert)
    await db.commit()
    await db.refresh(new_alert)
    return new_alert

@router.put("/{alert_id}/acknowledge", response_model=AlertResponse)
async def acknowledge_alert(
    alert_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(select(Alert).where(Alert.id == alert_id))
    alert = result.scalar_one_or_none()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.status = AlertStatus.acknowledged
    alert.acknowledged_by = int(current_user["id"])
    await db.commit()
    await db.refresh(alert)
    return alert

@router.post("/seed")
async def seed_alerts(db: AsyncSession = Depends(get_db)):
    """Create sample alerts for testing"""
    sample_alerts = [
        {
            "alert_type": "Intrusion Detected",
            "severity": AlertSeverity.critical,
            "location": "Perimeter North - Zone A",
            "camera_id": "CAM-001",
            "confidence": 94.2,
            "description": "Unauthorized human activity detected in restricted zone",
        },
        {
            "alert_type": "Suspicious Movement",
            "severity": AlertSeverity.warning,
            "location": "Parking Lot - Zone C",
            "camera_id": "CAM-003",
            "confidence": 87.5,
            "description": "Unusual movement pattern detected near vehicle area",
        },
        {
            "alert_type": "Restricted Zone Breach",
            "severity": AlertSeverity.critical,
            "location": "Warehouse East - Zone D",
            "camera_id": "CAM-004",
            "confidence": 96.1,
            "description": "Entry detected in high-security restricted area",
        },
        {
            "alert_type": "Motion Detected",
            "severity": AlertSeverity.info,
            "location": "Main Gate - Zone B",
            "camera_id": "CAM-002",
            "confidence": 72.3,
            "description": "Standard motion detection at entry point",
        },
    ]

    for alert_data in sample_alerts:
        new_alert = Alert(
            alert_id=f"ALT-{uuid.uuid4().hex[:6].upper()}",
            **alert_data,
        )
        db.add(new_alert)

    await db.commit()
    return {"message": "Sample alerts created", "count": len(sample_alerts)}
