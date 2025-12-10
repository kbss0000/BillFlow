import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
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

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login on 401 (unauthorized/invalid token)
    // 403 (forbidden) means permission denied but user is still logged in
    if (error.response?.status === 401) {
      // Check if we're NOT already on the login page to prevent infinite loop
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;


