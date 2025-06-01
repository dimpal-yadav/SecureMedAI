// Import required Firebase functions
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuFKlmvRFpV-pU-UhRIudTWmlMB3g_bhU",
  authDomain: "email-7c1bf.firebaseapp.com",
  projectId: "email-7c1bf",
  storageBucket: "email-7c1bf.firebasestorage.app",
  messagingSenderId: "241392668015",
  appId: "1:241392668015:web:bb5e088c7cb0148ee56c9a",
  measurementId: "G-CH9F8VB5HY"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Correct usage of getAuth

// Export Firebase authentication instance
export { auth, app };