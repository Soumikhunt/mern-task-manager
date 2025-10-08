// frontend/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Attach token automatically if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // login থেকে token save করবো
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
