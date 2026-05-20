from ultralytics import YOLO
import cv2
import serial
import time

# =========================
# KONEKSI ESP32 SERVO
# =========================
arduino = serial.Serial('COM6', 115200)

time.sleep(2)

# =========================
# LOAD MODEL YOLO
# =========================
model = YOLO("runs/detect/train-2/weights/best.pt")

# =========================
# 3 ESP32-CAM STREAM
# =========================
cam1_url = "http://192.168.1.10/stream"
cam2_url = "http://192.168.1.11/stream"
cam3_url = "http://192.168.1.12/stream"

cap1 = cv2.VideoCapture(cam1_url)
cap2 = cv2.VideoCapture(cam2_url)
cap3 = cv2.VideoCapture(cam3_url)

# =========================
# DETECTION FUNCTION
# =========================
def detect_camera(frame):

    results = model(frame, conf=0.2)

    detected_rusak = False
    detected_object = False

    for r in results:

        boxes = r.boxes

        if len(boxes) > 0:
            detected_object = True

        for box in boxes:

            cls = int(box.cls[0])

            label = model.names[cls]

            print("Detected:", label)

            # GANTI kalau class kamu beda
            if label == "deform":

                detected_rusak = True

    return detected_rusak, detected_object, results

# =========================
# MAIN LOOP
# =========================
while True:

    ret1, frame1 = cap1.read()
    ret2, frame2 = cap2.read()
    ret3, frame3 = cap3.read()

    if not ret1 or not ret2 or not ret3:

        print("Camera Failed")
        break

    # =========================
    # DETECT TIAP CAMERA
    # =========================
    rusak1, obj1, res1 = detect_camera(frame1)
    rusak2, obj2, res2 = detect_camera(frame2)
    rusak3, obj3, res3 = detect_camera(frame3)

    # =========================
    # FINAL DECISION
    # =========================
    if rusak1 or rusak2 or rusak3:

        print("FINAL: BARANG RUSAK")

        arduino.write(b'1')

    elif obj1 or obj2 or obj3:

        print("FINAL: BARANG AMAN")

        arduino.write(b'0')

    else:

        print("FINAL: TIDAK TERDETEKSI")

    # =========================
    # TAMPILKAN SEMUA CAMERA
    # =========================
    cv2.imshow("CAM 1", res1[0].plot())
    cv2.imshow("CAM 2", res2[0].plot())
    cv2.imshow("CAM 3", res3[0].plot())

    # ESC untuk keluar
    if cv2.waitKey(1) == 27:
        break

# =========================
# CLOSE
# =========================
cap1.release()
cap2.release()
cap3.release()

cv2.destroyAllWindows()