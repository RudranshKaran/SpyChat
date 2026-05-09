import axios from "axios";

import { getToken, isTokenExpired, removeToken } from "../utils/tokenManager.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (isTokenExpired(token)) {
      removeToken();
      window.dispatchEvent(new CustomEvent("spychat:auth-expired"));
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeToken();
      window.dispatchEvent(new CustomEvent("spychat:auth-expired"));
    }
    return Promise.reject(error);
  }
);

export default api;
