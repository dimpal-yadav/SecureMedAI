import axios from "axios";
import { getBaseURL } from "../apiConfig";  

const baseURL = getBaseURL();

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL,
  });

  // Request interceptor to add token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle auth errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;