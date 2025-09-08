import axios from "axios";
import { getBaseURL } from "../apiConfig";
// --- Firebase Imports ---
import { auth } from '../firebase'; // Assuming firebase.js is in the src/ directory
import { signOut } from 'firebase/auth';

const baseURL = getBaseURL();

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL,
  });

  // Request interceptor to dynamically add the correct auth token
  axiosInstance.interceptors.request.use(
    async (config) => {
      const firebaseUser = auth.currentUser;

      if (firebaseUser) {
        // If a user is logged in via Firebase (e.g., Google Sign-In),
        // get their ID token and use it for authorization.
        const token = await firebaseUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Otherwise, fall back to the JWT from localStorage for
        // standard email/password authentication.
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle auth errors and logout the user
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // If the token is invalid or expired, log the user out completely.

        // Sign out from Firebase if there's an active session
        if (auth.currentUser) {
          signOut(auth);
        }

        // Clear all session-related items from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        
        // Redirect to the login page
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
