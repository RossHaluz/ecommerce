import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

// Додаємо токен до заголовків для кожного запиту
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
