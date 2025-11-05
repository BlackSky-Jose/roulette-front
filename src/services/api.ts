import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://roulette-back-production-4a0a.up.railway.app", // backend server
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
