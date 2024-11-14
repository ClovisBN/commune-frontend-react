// services/grievanceService.jsx
import api from "./Api";
import { handleError } from "../shared/utils/errorHandler";

export const fetchGrievances = async (navigate) => {
  try {
    const response = await api.get("/grievances");
    return response.data.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const createGrievance = async (title_grievance, navigate) => {
  try {
    const response = await api.post("/grievances", { title_grievance });
    return response.data.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création de la doléance :",
      error.response?.data
    );
    handleError(error, navigate);
  }
};

export const fetchAllGrievances = async (navigate) => {
  try {
    const response = await api.get("/grievances/all");
    return response.data.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const closeGrievance = async (id, navigate) => {
  try {
    await api.put(`/grievances/${id}/close`);
  } catch (error) {
    handleError(error, navigate);
  }
};

export const fetchMessages = async (grievanceId, navigate) => {
  try {
    const response = await api.get(`/grievances/${grievanceId}/messages`);
    return response.data.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const sendMessage = async (grievanceId, content_message, navigate) => {
  try {
    const response = await api.post(`/grievances/${grievanceId}/messages`, {
      content_message,
    });
    return response.data.data;
  } catch (error) {
    handleError(error, navigate);
  }
};
