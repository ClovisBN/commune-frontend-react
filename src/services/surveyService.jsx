// services/surveyService.jsx
import api from "./Api";
import { handleError } from "../shared/utils/errorHandler";

// Récupérer un sondage par ID
export const fetchSurveyById = async (id, navigate) => {
  try {
    const response = await api.get(`/surveys/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Récupérer tous les sondages
export const fetchSurveys = async (navigate) => {
  try {
    const response = await api.get("/surveys");
    // Ajouter le champ 'type' pour identifier qu'il s'agit d'un sondage
    return response.data.data.map((survey) => ({
      ...survey,
      type: "survey",
    }));
  } catch (error) {
    handleError(error, navigate);
  }
};

// Créer un nouveau sondage
export const createSurvey = async (surveyData, navigate) => {
  try {
    const response = await api.post("/surveys", surveyData);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Mettre à jour un sondage
export const updateSurvey = async (id, updatedData, navigate) => {
  try {
    const response = await api.put(`/surveys/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Supprimer un sondage
export const deleteSurvey = async (id, navigate) => {
  try {
    await api.delete(`/surveys/${id}`);
  } catch (error) {
    handleError(error, navigate);
  }
};
