import axios from "axios";

// One axios instance for the whole app. Set VITE_API_URL when the server is hosted elsewhere.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3002",
});

// send the login token (admin token wins) with every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
