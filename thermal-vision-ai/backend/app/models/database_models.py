from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    officer = "officer"

class AlertSeverity(str, enum.Enum):
    info = "info"
    warning = "warning"
    critical = "critical"

class AlertStatus(str, enum.Enum):
    active = "active"
    acknowledged = "acknowledged"
    resolved = "resolved"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.officer, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Camera(Base):
    __tablename__ = "cameras"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    camera_id = Column(String(50), unique=True, nullable=False)
    zone = Column(String(50), nullable=False)
    location = Column(String(255))
    status = Column(String(20), default="online")
    stream_url = Column(String(500))
    latitude = Column(Float)
    longitude = Column(Float)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    alert_id = Column(String(50), unique=True, nullable=False)
    alert_type = Column(String(50), nullable=False)
    severity = Column(Enum(AlertSeverity), default=AlertSeverity.info, nullable=False)
    status = Column(Enum(AlertStatus), default=AlertStatus.active, nullable=False)
    location = Column(String(255), nullable=False)
    camera_id = Column(String(50), ForeignKey("cameras.camera_id"))
    confidence = Column(Float, nullable=False)
    description = Column(Text)
    screenshot_path = Column(String(500))
    acknowledged_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    detection_id = Column(String(50), unique=True, nullable=False)
    camera_id = Column(String(50), ForeignKey("cameras.camera_id"))
    class_name = Column(String(50), nullable=False)
    confidence = Column(Float, nullable=False)
    bbox_x = Column(Float)
    bbox_y = Column(Float)
    bbox_width = Column(Float)
    bbox_height = Column(Float)
    threat_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)

class AnalyticsLog(Base):
    __tablename__ = "analytics_logs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    metric_name = Column(String(100), nullable=False)
    metric_value = Column(Float, nullable=False)
    metadata = Column(Text)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
