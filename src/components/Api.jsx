import axios from "axios";
import { checkAndRefreshToken } from "./tokenService";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getCsrfCookie = async () => {
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

const redirectToLogin = () => {
  window.location.href = "/login";
};

api.interceptors.request.use(
  async (config) => {
    if (
      config.url.includes("/login") ||
      config.url.includes("/register") ||
      config.url.includes("/sanctum/csrf-cookie")
    ) {
      return config;
    }

    try {
      const accessToken = await checkAndRefreshToken(redirectToLogin);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    } catch (error) {
      return Promise.reject(error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await checkAndRefreshToken(redirectToLogin);
        if (newToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.clear();
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export { getCsrfCookie };
export default api;
