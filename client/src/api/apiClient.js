import axios from "axios";

const TOKEN_KEY = "velora_auth_token";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authStorage = {
  getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
      return;
    }

    window.localStorage.removeItem(TOKEN_KEY);
  },
};

export const getApiErrorMessage = (error, fallback = "Something went wrong.") =>
  error.response?.data?.message || fallback;

