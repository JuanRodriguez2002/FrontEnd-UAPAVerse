import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-uapaverse.onrender.com/api", // Tu URL base real
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor esencial para evitar el error 401 Unauthorized
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); // Lee la key "token"
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Inserta el Bearer token
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;