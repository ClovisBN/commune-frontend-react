import axios from "axios";
import { handleError } from "../shared/utils/errorHandler";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur de réponse pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion de l'erreur avec handleError sans useNavigate
    handleError(error);
    return Promise.reject(error);
  }
);

export default api;
