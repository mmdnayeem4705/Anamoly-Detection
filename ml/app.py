from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
import os

app = Flask(__name__)

ANOMALY_IMG_DIR = os.path.join(os.path.dirname(__file__), "anomaly_images")

# Home route
@app.route('/')
def home():
    # List all PNG images in the anomaly_images directory
    images = [f for f in os.listdir(ANOMALY_IMG_DIR) if f.lower().endswith('.png')]
    return render_template('gallery.html', images=images)

@app.route('/anomaly_images/<filename>')
def anomaly_image(filename):
    return send_from_directory(ANOMALY_IMG_DIR, filename)

@app.route('/anomaly_images_list')
def anomaly_images_list():
    if not os.path.exists(ANOMALY_IMG_DIR):
        return jsonify([])
    images = [f for f in os.listdir(ANOMALY_IMG_DIR) if f.lower().endswith('.png')]
    return jsonify(images)

@app.route('/ml/anomaly_images/<filename>')
def anomaly_images_static(filename):
    return send_from_directory(ANOMALY_IMG_DIR, filename)

@app.route('/anomaly_excel')
def anomaly_excel():
    excel_path = os.path.join(os.path.dirname(__file__), 'alerts.xlsx')
    return send_file(excel_path, as_attachment=True)

# Example API route (optional: use this to connect to your ML later)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # You can send data from JS to here
    # Load model and run prediction using `ml/` and `model weights and metrics/` later
    return jsonify({'message': 'Prediction logic not yet implemented'})

if __name__ == '__main__':
    app.run(debug=True)
video_path = "/Users/apple/Desktop/MakeUC2024/demo_videos/demo.mp4"
cap = cv2.VideoCapture(video_path)
import cv2
from ultralytics import YOLO
from twilio.rest import Client
import boto3