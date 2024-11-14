// services/articleService.jsx
import api from "./Api";
import { handleError } from "../shared/utils/errorHandler";

export const fetchArticles = async (navigate) => {
  try {
    const response = await api.get("/articles");
    // Ajouter le champ 'type' pour identifier qu'il s'agit d'un article
    return response.data.data.map((article) => ({
      ...article,
      type: "article",
    }));
  } catch (error) {
    handleError(error, navigate);
  }
};

export const fetchArticleById = async (id, navigate) => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const createArticle = async (articleData, navigate) => {
  try {
    // Assurez-vous que articleData utilise les bons noms de champs avec suffixes
    const response = await api.post("/articles", articleData);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const updateArticle = async (id, updatedData, navigate) => {
  try {
    // Assurez-vous que updatedData utilise les bons noms de champs avec suffixes
    const response = await api.put(`/articles/${id}`, updatedData);
    return response.data;
  } catch (error) {
    handleError(error, navigate);
  }
};

export const deleteArticle = async (id, navigate) => {
  try {
    await api.delete(`/articles/${id}`);
  } catch (error) {
    handleError(error, navigate);
  }
};
