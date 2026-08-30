from ultralytics import YOLO

# =========================
# LOAD MODEL DASAR YOLO
# =========================
model = YOLO("yolov8n.pt")

# =========================
# TRAINING
# =========================
model.train(
    data="data.yaml",
    epochs=200,
    imgsz=640,
    batch=8
)

# =========================
# TEST WEBCAM
# =========================
model.predict(
    source=0,
    show=True,
    conf=0.5
)