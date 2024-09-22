import axios from 'axios';
import { getAuthCookies } from './helpers';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to set the Authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = getAuthCookies(); // Fetch the token dynamically before each request

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
