// services/articleService.js
import api from "./api";

export const fetchArticles = async () => {
  const response = await api.get("/articles");
  return response.data.data; // Retourne le tableau des articles directement
};

export const fetchArticleById = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};

export const createArticle = async (article) => {
  const response = await api.post("/articles", article);
  return response.data;
};

export const updateArticle = async (id, article) => {
  const response = await api.put(`/articles/${id}`, article);
  return response.data;
};

export const deleteArticle = async (id) => {
  await api.delete(`/articles/${id}`);
};
