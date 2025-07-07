import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    
    // Show error message
    const message = error.response?.data?.message || 
                   error.response?.data?.detail || 
                   'An error occurred';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  adminLogin: '/api/admin/login/',
  doctorLogin: '/api/doctor/login/',
  patientLogin: '/api/patient/login/',
  
  // Registration
  doctorRegister: '/api/doctor/registration/',
  patientRegister: '/api/patient/registration/',
  
  // Admin endpoints
  admin: {
    doctors: '/api/admin/doctors/',
    patients: '/api/admin/patients/',
    appointments: '/api/admin/appointments/',
    approveDoctors: '/api/admin/approve/doctors/',
    approvePatients: '/api/admin/approve/patients/',
    approveAppointments: '/api/admin/approve/appointments/',
  },
  
  // Doctor endpoints
  doctor: {
    profile: '/api/doctor/profile/',
    appointments: '/api/doctor/appointments/',
  },
  
  // Patient endpoints
  patient: {
    profile: '/api/patient/profile/',
    appointments: '/api/patient/appointments/',
    history: '/api/patient/history/',
  }
};

export default api;