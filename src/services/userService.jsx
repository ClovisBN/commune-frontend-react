// userService.jsx
import api from "./Api";
import { handleError } from "../shared/utils/errorHandler";

// Récupérer tous les utilisateurs
export const fetchUsers = async (navigate) => {
  try {
    const response = await api.get("/users");
    return response.data.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Récupérer un utilisateur par ID
export const fetchUserById = async (id, navigate) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Créer un nouvel utilisateur
export const createUser = async (userData, navigate) => {
  try {
    const response = await api.post("/users", userData);
    return response.data.user;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (id, userData, navigate) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data.user;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id, navigate) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    handleError(error, navigate);
  }
};
