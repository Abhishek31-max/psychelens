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
  createEntry: (data) => api.post('/journal', data),
  analyze: (content) => api.post('/journal/analyze', { content })
};

export default api;
