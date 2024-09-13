// /auth/services/authService.js

import api from "./api";
import { handleError } from "../shared/utils/errorHandler";
import axios from "axios";

export const getCsrfCookie = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });
};

export const login = async (email, password) => {
  try {
    await getCsrfCookie();
    const response = await api.post("/login", { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    await getCsrfCookie(); // Appelle la
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    throw error;
  }
};

export const fetchUserInfo = async (navigate) => {
  try {
    const response = await api.get("/user-info");
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const logout = async (navigate) => {
  try {
    await api.post("/logout"); // Appel API pour déconnexion
    localStorage.removeItem("access_token"); // Suppression du token d'authentification
    navigate("/login"); // Redirection vers la page login
  } catch (error) {
    handleError(error, navigate);
  }
};
