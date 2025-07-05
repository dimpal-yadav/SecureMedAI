import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If no specific roles are required, allow access
  if (allowedRoles.length === 0) {
    return children;
  }

  // Check if user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    // Redirect based on user's role
    switch (userRole) {
      case 'PATIENT':
        return <Navigate to="/patient-dashboard" replace />;
      case 'DOCTOR':
        return <Navigate to="/doctor-dashboard" replace />;
      case 'HOSPITAL_ADMIN':
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
