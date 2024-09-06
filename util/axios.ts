import axios from 'axios';
import { getAuthCookies } from './helpers';

const { token } = getAuthCookies();
console.log(token, 'the access token')

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axiosInstance;
