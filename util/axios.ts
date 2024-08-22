import axios from 'axios';
import { getLocalStorageItem } from './localStorage';
const token = getLocalStorageItem('token');


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {'Content-Type': 'application/json'}
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axiosInstance;