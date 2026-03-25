import axios from 'axios';

const api = axios.create({
  // TODO: In production, this would be the deployed URL.
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// The Interceptor: Automatically attach the token to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('thrift_user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
