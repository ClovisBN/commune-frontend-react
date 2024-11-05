import api from "./Api";
import { handleError } from "../shared/utils/errorHandler";

// Fetch un document par ID
export const fetchDocumentById = async (id, navigate) => {
  try {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Fetch tous les documents
export const fetchDocuments = async (navigate) => {
  try {
    const response = await api.get("/documents");
    return response.data.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Créer un nouveau document
export const createDocument = async (documentData, navigate) => {
  try {
    const response = await api.post("/documents", documentData);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Mettre à jour un document
export const updateDocument = async (id, updatedData, navigate) => {
  try {
    const response = await api.put(`/documents/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

// Supprimer un document
export const deleteDocument = async (id, navigate) => {
  try {
    await api.delete(`/documents/${id}`);
  } catch (error) {
    handleError(error, navigate);
  }
};
