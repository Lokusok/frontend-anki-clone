import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const CSRF_TOKEN_ERROR_CODE = 419;

    if (error.status === CSRF_TOKEN_ERROR_CODE) {
        apiClient.get('/sanctum/csrf-cookie');
        return apiClient(error.config);
    }

    return Promise.reject(error);
  }
);
