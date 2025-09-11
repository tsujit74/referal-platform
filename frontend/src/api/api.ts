// src/api/api.ts
import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const getErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case 400:
      case 401:
        return "Invalid email or password. Please try again.";
      case 403:
        return "Access denied. You don’t have permission to perform this action.";
      case 404:
        return "Requested resource not found. Please try again later.";
      case 408:
        return "Request timed out. Please check your internet connection.";
      case 429:
        return "Too many requests. Please wait a moment before retrying.";
      case 500:
        return "Internal server error. Please try again after some time.";
      case 503:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return (
          (error.response.data as any)?.message ||
          `Unexpected error occurred (code: ${status}).`
        );
    }
  } else if (error.request) {
    return "Unable to reach the server. Please check your network connection.";
  } else {
    return `Request setup failed: ${error.message}`;
  }
};

// Axios instance with sensible defaults
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const friendlyMessage = getErrorMessage(error);
    return Promise.reject(new Error(friendlyMessage));
  }
);

export default api;
