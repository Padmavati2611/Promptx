from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import get_settings
from app.core.database import init_db, engine
from app.api import auth, alerts, cameras, analytics, detections

settings = get_settings()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing ThermalVision AI Surveillance System...")
    await init_db()
    logger.info("Database initialized successfully")
    yield
    logger.info("Shutting down ThermalVision AI...")
    await engine.dispose()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered thermal surveillance platform with YOLOv8 detection",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(cameras.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(detections.router, prefix="/api")

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }

@app.get("/api/seed-all")
async def seed_all_data():
    """Seed all sample data for testing"""
    from app.api.auth import seed_admin
    from app.api.cameras import seed_cameras
    from app.api.alerts import seed_alerts

    from app.core.database import async_session

    async with async_session() as db:
        await seed_admin(db)
        await seed_cameras(db)
        await seed_alerts(db)

    return {"message": "All sample data seeded successfully"}
