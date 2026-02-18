import axios from "axios";
import { auth } from "../firebase";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: apiUrl+'/api',
  withCredentials: false,
});

// INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  
  if (user) {
    // 1. Pide token actual a Firebase
    const token = await user.getIdToken();
    
    // 2. Pega en la cabecera "Authorization"
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;