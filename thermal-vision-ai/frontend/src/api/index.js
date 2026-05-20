import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (data) => api.post('/auth/signup', data),
  getMe: () => api.get('/auth/me'),
}

export const alertsAPI = {
  getAll: (params) => api.get('/alerts', { params }),
  getById: (id) => api.get(`/alerts/${id}`),
  acknowledge: (id) => api.put(`/alerts/${id}/acknowledge`),
  getStats: () => api.get('/alerts/stats'),
}

export const camerasAPI = {
  getAll: () => api.get('/cameras'),
  getById: (id) => api.get(`/cameras/${id}`),
  getStatus: () => api.get('/cameras/status'),
  getStream: (id) => `/api/cameras/${id}/stream`,
}

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getIntrusions: (period) => api.get(`/analytics/intrusions?period=${period}`),
  getAlertsHistory: () => api.get('/analytics/alerts-history'),
  getAccuracy: () => api.get('/analytics/accuracy'),
  getHeatmap: () => api.get('/analytics/heatmap'),
}

export const detectionAPI = {
  getDetections: () => api.get('/detections/latest'),
  getThreatScore: () => api.get('/detections/threat-score'),
}

export default api
