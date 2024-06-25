import axios from 'axios';

const api = axios.create({
  baseURL: 'http://157.230.43.225:8080',
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')?.replaceAll('"', '');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
