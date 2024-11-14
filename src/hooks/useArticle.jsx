// useArticle.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchArticleById,
  createArticle,
  updateArticle as updateArticleService,
} from "../services/articleService";
import { handleError } from "../shared/utils/errorHandler";
import debounce from "lodash/debounce";

const useArticle = (id, navigate) => {
  const [article, setArticle] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  const hasUnsavedChanges = useRef(false);
  const hasUserInteracted = useRef(false);

  const saveArticleToBackend = async (articleToSave, articleId) => {
    try {
      if (articleId) {
        // Mise à jour de l'article existant
        await updateArticleService(articleId, articleToSave);
      } else {
        // Création d'un nouvel article
        const createdArticle = await createArticle(articleToSave);
        setArticle(createdArticle);
        navigate(`/admin/articles/${createdArticle.id}/edit`);
      }
      hasUnsavedChanges.current = false; // La sauvegarde est terminée
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const debouncedSaveArticleToBackend = useRef(
    debounce(saveArticleToBackend, 500)
  ).current;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const localArticle = localStorage.getItem(`article_${id}`);

        if (localArticle) {
          const parsedArticle = JSON.parse(localArticle);
          setArticle(parsedArticle);
          if (
            parsedArticle.content_article &&
            parsedArticle.content_article.length > 0
          ) {
            setSelectedComponentId(parsedArticle.content_article[0].id);
          }
        } else if (id) {
          const fetchedArticle = await fetchArticleById(id);
          setArticle(fetchedArticle);
          if (
            fetchedArticle.content_article &&
            fetchedArticle.content_article.length > 0
          ) {
            setSelectedComponentId(fetchedArticle.content_article[0].id);
          }
          localStorage.setItem(`article_${id}`, JSON.stringify(fetchedArticle));
        } else {
          // Nouvel article
          const newArticle = {
            title_article: "",
            description_article: "",
            content_article: [],
            status_id: 1, // Assurez-vous que le statut correspond à 'unpublished'
          };
          setArticle(newArticle);
          localStorage.setItem(`article_new`, JSON.stringify(newArticle));
        }
      } catch (error) {
        handleError(error, navigate);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  // Détecter l'interaction utilisateur
  useEffect(() => {
    const handleUserInteraction = () => {
      hasUserInteracted.current = true;

      // Ajouter le gestionnaire beforeunload après l'interaction
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Supprimer les détecteurs d'interaction
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges.current) {
        // Forcer la sauvegarde immédiate
        debouncedSaveArticleToBackend.flush();

        if (hasUnsavedChanges.current) {
          e.preventDefault();
          e.returnValue = ""; // Nécessaire pour certains navigateurs
        }
      }
    };

    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      debouncedSaveArticleToBackend.flush();
    };
  }, [debouncedSaveArticleToBackend]);

  useEffect(() => {
    if (article) {
      const storageKey = id ? `article_${id}` : `article_new`;
      localStorage.setItem(storageKey, JSON.stringify(article));
      hasUnsavedChanges.current = true; // Marque les modifications comme non sauvegardées
      debouncedSaveArticleToBackend(article, id); // Planifie la sauvegarde
    }
  }, [article, id, debouncedSaveArticleToBackend]);

  const updateComponents = useCallback((updateFn) => {
    setArticle((prevState) => ({
      ...prevState,
      content_article: updateFn(prevState.content_article || []),
    }));
  }, []);

  return {
    article,
    setArticle,
    selectedComponentId,
    setSelectedComponentId,
    updateComponents,
  };
};

export default useArticle;
