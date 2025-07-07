import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api, { endpoints } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  role: null,
  loading: true,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, role, user: null }
      });
      // Optionally fetch user profile here
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (credentials, userRole) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      let endpoint;
      switch (userRole) {
        case 'admin':
          endpoint = endpoints.adminLogin;
          break;
        case 'doctor':
          endpoint = endpoints.doctorLogin;
          break;
        case 'patient':
          endpoint = endpoints.patientLogin;
          break;
        default:
          throw new Error('Invalid user role');
      }

      const response = await api.post(endpoint, credentials);
      const { token } = response.data;

      // Store in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', userRole);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, role: userRole, user: null }
      });

      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData, profileData, userRole) => {
    try {
      const endpoint = userRole === 'doctor' 
        ? endpoints.doctorRegister 
        : endpoints.patientRegister;

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

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
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