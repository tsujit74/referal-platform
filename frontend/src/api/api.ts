import axios, { type AxiosInstance } from "axios";
import { useError } from "../context/ErrorContext";
import { useSuccess } from "../context/SuccessContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const useApi = () => {
  const { setErrors } = useError();
  const { addMessage, clearMessages } = useSuccess();

  // Response interceptor – only handle success messages dynamically
  api.interceptors.response.use(
    (response) => {
      setErrors([]);
      if (response.data?.message) addMessage(response.data.message);
      return response;
    },
    (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (Array.isArray(data.errors)) setErrors(data.errors);
        else if (typeof data.message === "string") setErrors([data.message]);
        else setErrors(["An unexpected server error occurred."]);
      } else {
        setErrors(["Network error. Please check your connection."]);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default api;
