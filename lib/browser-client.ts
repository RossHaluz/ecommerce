import axios from "axios";
import Cookies from "js-cookie";

/**
 * Axios-інстанс для викликів ІЗ БРАУЗЕРА.
 *
 * Серверний код ходить через `lib/api/` (fetch + кеш Next). Тут axios лишається
 * тимчасово: ці виклики переїдуть у TanStack Query разом із кроком 3.2, і тоді
 * файл зникне. Нового сюди не додаємо.
 */
const browserClient = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api`,
});

browserClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default browserClient;
