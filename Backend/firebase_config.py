# Backend/backend/firebase_config.py
import firebase_admin
from firebase_admin import credentials
import os

# IMPORTANT: Path to your service account key JSON file
SERVICE_ACCOUNT_KEY_PATH = os.path.join(os.path.dirname(__file__), 'your-service-account-key.json')

cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred)