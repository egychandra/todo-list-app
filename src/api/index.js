import axios from 'axios';

const API_BASE_URL = 'http://94.74.86.174:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use(config => {
  console.log('Request:', config.method.toUpperCase(), config.url);
  
  if (!config.url.includes('/register') && !config.url.includes('/login')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('Response error:', error);
    
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }
    
    const errorMessage = error.response?.data?.message || 
    error.message || 
    'An unknown error occurred';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;