import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const LOCALSTORAGE_TOKEN_PATH = 'lance_token';

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(LOCALSTORAGE_TOKEN_PATH) ||
      sessionStorage.getItem(LOCALSTORAGE_TOKEN_PATH);
    if (token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
