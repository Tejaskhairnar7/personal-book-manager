import axios from 'axios';

const API = axios.create({
  // Use empty baseURL so API calls are always relative to the same origin
  // This works for both localhost and Vercel deployments
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default API;