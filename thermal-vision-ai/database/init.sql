-- ThermalVision AI Database Initialization
-- Creates necessary extensions and initial setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The tables will be created automatically by SQLAlchemy on startup
-- This script is for any custom initialization needed

-- Create index for faster alert queries
-- Note: These will be created by SQLAlchemy models, but documented here for reference
-- CREATE INDEX idx_alerts_created_at ON alerts(created_at);
-- CREATE INDEX idx_alerts_severity ON alerts(severity);
-- CREATE INDEX idx_alerts_status ON alerts(status);
-- CREATE INDEX idx_detections_created_at ON detections(created_at);
-- CREATE INDEX idx_detections_camera_id ON detections(camera_id);
