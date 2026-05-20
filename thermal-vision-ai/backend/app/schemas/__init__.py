from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    officer = "officer"

class AlertSeverity(str, Enum):
    info = "info"
    warning = "warning"
    critical = "critical"

class AlertStatus(str, Enum):
    active = "active"
    acknowledged = "acknowledged"
    resolved = "resolved"

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: UserRole = UserRole.officer

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class CameraBase(BaseModel):
    name: str
    camera_id: str
    zone: str
    location: Optional[str] = None
    stream_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class CameraCreate(CameraBase):
    pass

class CameraResponse(CameraBase):
    id: int
    status: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    alert_type: str
    severity: AlertSeverity
    location: str
    camera_id: str
    confidence: float
    description: Optional[str] = None

class AlertCreate(AlertBase):
    pass

class AlertResponse(AlertBase):
    id: int
    alert_id: str
    status: AlertStatus
    screenshot_path: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class DetectionBase(BaseModel):
    camera_id: str
    class_name: str
    confidence: float
    bbox_x: Optional[float] = None
    bbox_y: Optional[float] = None
    bbox_width: Optional[float] = None
    bbox_height: Optional[float] = None
    threat_score: float = 0.0

class DetectionResponse(DetectionBase):
    id: int
    detection_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class AlertStats(BaseModel):
    total_alerts: int
    active_alerts: int
    critical_alerts: int
    alerts_today: int
    avg_confidence: float

class DashboardStats(BaseModel):
    total_cameras: int
    active_cameras: int
    total_alerts: int
    active_alerts: int
    detection_rate: float
    system_uptime: float
    recent_alerts: List[AlertResponse]

class ThreatScore(BaseModel):
    overall_score: float
    intrusion_score: float
    motion_score: float
    weapon_score: float
    threat_level: str
