import cv2
import numpy as np
from typing import List, Dict, Optional, Tuple
from datetime import datetime
import uuid
import os

class DetectionResult:
    def __init__(self, class_name: str, confidence: float, bbox: Tuple[int, int, int, int]):
        self.class_name = class_name
        self.confidence = confidence
        self.bbox = bbox
        self.detection_id = f"DET-{uuid.uuid4().hex[:8].upper()}"
        self.timestamp = datetime.utcnow()

class ThermalDetector:
    """YOLOv8-based thermal image detector with OpenCV processing"""

    def __init__(self, model_path: str = "yolov8n.pt", confidence_threshold: float = 0.5):
        self.confidence_threshold = confidence_threshold
        self.model = None
        self.model_path = model_path
        self._load_model()

    def _load_model(self):
        """Load YOLOv8 model"""
        try:
            from ultralytics import YOLO
            self.model = YOLO(self.model_path)
            print(f"[ThermalDetector] Model loaded: {self.model_path}")
        except Exception as e:
            print(f"[ThermalDetector] Warning: Could not load YOLO model: {e}")
            self.model = None

    def preprocess_thermal_frame(self, frame: np.ndarray) -> np.ndarray:
        """Apply thermal image preprocessing"""
        if frame is None:
            raise ValueError("Invalid frame")

        grayscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) if len(frame.shape) == 3 else frame

        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(grayscale)

        blurred = cv2.GaussianBlur(enhanced, (5, 5), 0)

        return cv2.cvtColor(blurred, cv2.COLOR_GRAY2BGR)

    def detect_objects(self, frame: np.ndarray) -> List[DetectionResult]:
        """Run detection on a frame"""
        if self.model is None:
            return self._mock_detection()

        processed = self.preprocess_thermal_frame(frame)
        results = self.model(processed, conf=self.confidence_threshold, verbose=False)

        detections = []
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])
                class_name = self.model.names[int(box.cls[0])]
                detections.append(DetectionResult(
                    class_name=class_name,
                    confidence=conf,
                    bbox=(x1, y1, x2 - x1, y2 - y1),
                ))

        return detections

    def _mock_detection(self) -> List[DetectionResult]:
        """Return mock detections for testing without model"""
        return [
            DetectionResult("person", 0.94, (120, 80, 200, 350)),
            DetectionResult("person", 0.87, (400, 100, 180, 320)),
        ]

    def draw_detections(self, frame: np.ndarray, detections: List[DetectionResult]) -> np.ndarray:
        """Draw detection boxes on frame"""
        output = frame.copy()
        for det in detections:
            x, y, w, h = det.bbox
            color = (0, 0, 255) if det.class_name == "person" else (0, 255, 255)
            cv2.rectangle(output, (x, y), (x + w, y + h), color, 2)

            label = f"{det.class_name} {det.confidence:.2f}"
            (label_w, label_h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
            cv2.rectangle(output, (x, y - 25), (x + label_w, y), color, -1)
            cv2.putText(output, label, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

        return output

    def detect_motion(self, frame1: np.ndarray, frame2: np.ndarray, threshold: int = 25) -> Optional[np.ndarray]:
        """Detect motion between two frames"""
        if frame1 is None or frame2 is None:
            return None

        gray1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY) if len(frame1.shape) == 3 else frame1
        gray2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY) if len(frame2.shape) == 3 else frame2

        diff = cv2.absdiff(gray1, gray2)
        _, thresh = cv2.threshold(diff, threshold, 255, cv2.THRESH_BINARY)

        kernel = np.ones((5, 5), np.uint8)
        dilated = cv2.dilate(thresh, kernel, iterations=2)

        contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        motion_regions = []
        for contour in contours:
            if cv2.contourArea(contour) > 500:
                x, y, w, h = cv2.boundingRect(contour)
                motion_regions.append((x, y, w, h))

        return motion_regions if motion_regions else None

    def generate_heatmap(self, frame: np.ndarray, detections: List[DetectionResult]) -> np.ndarray:
        """Generate thermal heatmap from detections"""
        heatmap = np.zeros((frame.shape[0], frame.shape[1]), dtype=np.float32)

        for det in detections:
            x, y, w, h = det.bbox
            center_x, center_y = x + w // 2, y + h // 2
            cv2.circle(heatmap, (center_x, center_y), max(w, h) // 2, det.confidence, -1)

        heatmap = cv2.GaussianBlur(heatmap, (0, 0), sigmaX=30, sigmaY=30)
        heatmap = cv2.normalize(heatmap, None, 0, 255, cv2.NORM_MINMAX)
        heatmap_colored = cv2.applyColorMap(heatmap.astype(np.uint8), cv2.COLORMAP_JET)

        return cv2.addWeighted(frame, 0.7, heatmap_colored, 0.3, 0)


class StreamProcessor:
    """Process video streams for real-time detection"""

    def __init__(self, detector: ThermalDetector):
        self.detector = detector
        self.active_streams: Dict[str, bool] = {}
        self.frame_history: Dict[str, Optional[np.ndarray]] = {}

    def process_frame(self, stream_id: str, frame: np.ndarray) -> Tuple[np.ndarray, List[DetectionResult]]:
        """Process a single frame from stream"""
        detections = self.detector.detect_objects(frame)
        output_frame = self.detector.draw_detections(frame, detections)

        prev_frame = self.frame_history.get(stream_id)
        if prev_frame is not None:
            motion = self.detector.detect_motion(prev_frame, frame)
            if motion:
                for x, y, w, h in motion:
                    cv2.rectangle(output_frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

        self.frame_history[stream_id] = frame.copy()
        return output_frame, detections

    def start_stream(self, stream_id: str):
        self.active_streams[stream_id] = True

    def stop_stream(self, stream_id: str):
        self.active_streams[stream_id] = False
        if stream_id in self.frame_history:
            del self.frame_history[stream_id]
