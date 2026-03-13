import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data)
};

export const journalAPI = {
  getEntries: () => api.get('/journal'),
  getAnalysis: () => api.get('/journal?type=analysis'),
  createEntry: (data) => api.post('/journal', data),
  analyze: (content) => {
    // Simulated AI logic for clarity/energy
    const clarity = Math.floor(Math.random() * 40) + 60; // 60-100
    const energy = Math.floor(Math.random() * 50) + 30;  // 30-80
    return api.post('/journal/analyze', { content, clarity, energy });
  }
};

export default api;
