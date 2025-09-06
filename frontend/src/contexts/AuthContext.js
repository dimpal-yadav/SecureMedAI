import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { getBaseURL } from '../services/api'; // Assuming getBaseURL is in api.js
import toast from 'react-hot-toast';
import axios from 'axios';

// --- Firebase Imports ---
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; // Your firebase.js configuration file

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  // Effect to listen for Firebase auth changes and initialize state
  useEffect(() => {
    // This listener handles the user's session persistence
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // If a user is logged in via Firebase, we can fetch their app-specific data
        // For now, we'll rely on the localStorage set during login
        const storedToken = localStorage.getItem('authToken');
        const storedRole = localStorage.getItem('userRole');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedToken && storedRole && storedUser) {
            setUser(storedUser);
            setRole(storedRole);
            setToken(storedToken);
        }
      } else {
        // No user is signed in via Firebase
        setUser(null);
        setRole(null);
        setToken(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // --- Reusable Success Handler ---
  const handleLoginSuccess = (data) => {
    const { token, role, user_details } = data; // Assuming backend returns user details
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(user_details));

    setToken(token);
    setRole(role);
    setUser(user_details);
    
    toast.success('Login successful!');
    return { success: true };
  };

  // --- Email & Password Login ---
  const login = async (credentials, userRole) => {
    try {
      setLoading(true);
      const response = await api.post(`/user/login/`, { ...credentials, role: userRole }); // Assuming single login endpoint
      return handleLoginSuccess(response.data);
    } catch (error) {
      setLoading(false);
      const message = error.response?.data?.errors?.non_field_errors?.[0] || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // --- Google Sign-In with Firebase ---
  const googleSignIn = async () => {
    try {
        setLoading(true);
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();

        // Send the Firebase ID token to your Django backend
        const response = await axios.post(`${getBaseURL()}/firebase-auth/`, {
            id_token: idToken,
        });

        return handleLoginSuccess(response.data);
    } catch (error) {
        setLoading(false);
        const message = error.response?.data?.detail || 'Google Sign-in failed. Please try again.';
        toast.error(message);
        signOut(auth); // Sign out from Firebase if backend validation fails
        return { success: false, error: message };
    }
  };


  // --- Registration ---
  const register = async (userData, profileData, userRole) => {
    try {
      const endpoint = userRole === 'doctor' 
        ? '/doctor/register/' // Example endpoint
        : '/patient/register/'; // Example endpoint

      const response = await api.post(endpoint, {
        user_data: userData,
        profile_data: profileData
      });

      toast.success('Registration successful! Please wait for admin approval.');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // --- Logout ---
  const logout = async () => {
    await signOut(auth); // Sign out from Firebase
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setRole(null);
    toast.success('Logged out successfully');
  };

  // --- Update User Profile ---
  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    token,
    role,
    loading,
    isAuthenticated: !!token,
    login,
    googleSignIn,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
