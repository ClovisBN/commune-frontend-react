// useSurvey.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchSurveyById,
  updateSurvey as updateSurveyService,
} from "../services/surveyService";
import { handleError } from "../shared/utils/errorHandler";
import debounce from "lodash/debounce";

const useSurvey = (id, navigate) => {
  const [survey, setSurvey] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const hasUnsavedChanges = useRef(false);
  const hasUserInteracted = useRef(false);

  const saveSurveyToBackend = async (surveyToSave, surveyId) => {
    try {
      await updateSurveyService(surveyId, surveyToSave);
      hasUnsavedChanges.current = false; // La sauvegarde est terminée
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const debouncedSaveSurveyToBackend = useRef(
    debounce(saveSurveyToBackend, 500)
  ).current;

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const localSurvey = localStorage.getItem(`survey_${id}`);

        if (localSurvey) {
          const parsedSurvey = JSON.parse(localSurvey);
          setSurvey(parsedSurvey);
          if (
            parsedSurvey.content_survey &&
            parsedSurvey.content_survey.length > 0
          ) {
            setSelectedQuestionId(parsedSurvey.content_survey[0].id);
          }
        } else {
          const fetchedSurvey = await fetchSurveyById(id);
          setSurvey(fetchedSurvey);
          if (
            fetchedSurvey.content_survey &&
            fetchedSurvey.content_survey.length > 0
          ) {
            setSelectedQuestionId(fetchedSurvey.content_survey[0].id);
          }
          localStorage.setItem(`survey_${id}`, JSON.stringify(fetchedSurvey));
        }
      } catch (error) {
        handleError(error, navigate);
      }
    };

    fetchSurvey();
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
        debouncedSaveSurveyToBackend.flush();

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
      debouncedSaveSurveyToBackend.flush();
    };
  }, [debouncedSaveSurveyToBackend]);

  useEffect(() => {
    if (survey) {
      localStorage.setItem(`survey_${id}`, JSON.stringify(survey));
      hasUnsavedChanges.current = true; // Marque les modifications comme non sauvegardées
      debouncedSaveSurveyToBackend(survey, id); // Planifie la sauvegarde
    }
  }, [survey, id, debouncedSaveSurveyToBackend]);

  const updateQuestions = useCallback((updateFn) => {
    setSurvey((prevState) => ({
      ...prevState,
      content_survey: updateFn(prevState.content_survey),
    }));
  }, []);

  return {
    survey,
    setSurvey,
    selectedQuestionId,
    setSelectedQuestionId,
    updateQuestions,
  };
};

export default useSurvey;
