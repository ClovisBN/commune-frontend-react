import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchDocumentById,
  updateDocument as updateDocumentService,
} from "../services/documentService"; // Centralisation des appels API
import { handleError } from "../shared/utils/errorHandler";
import debounce from "lodash/debounce";

const useDocument = (id, navigate) => {
  const [doc, setDoc] = useState({
    name: "untitled-form",
    description: "Add Description",
    questions: [],
  });
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const savedDoc = localStorage.getItem(`document-${id}`);
        if (savedDoc && isValidDocumentId(id)) {
          setDoc(JSON.parse(savedDoc));
        } else {
          const fetchedDoc = await fetchDocumentById(id); // Utilisation du service
          setDoc(fetchedDoc);
        }

        const savedSelectedQuestionId =
          localStorage.getItem("selectedQuestionId");
        if (savedSelectedQuestionId) {
          setSelectedQuestionId(savedSelectedQuestionId);
        }
      } catch (error) {
        handleError(error, navigate);
      }
    };

    if (!doc || !doc.id || doc.id !== id) {
      fetchDocument();
    }
  }, [id, navigate, doc]);

  const updateQuestions = useCallback((updateFn) => {
    setDoc((prevState) => ({
      ...prevState,
      questions: updateFn(prevState.questions),
    }));
  }, []);

  const saveDocument = useRef(
    debounce(async (doc, id) => {
      try {
        await updateDocumentService(id, doc); // Utilisation du service pour mettre à jour le document
        localStorage.removeItem(`document-${id}`);
      } catch (error) {
        handleError(error, navigate);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(`document-${id}`, JSON.stringify(doc));
      localStorage.setItem("selectedQuestionId", selectedQuestionId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id, doc, selectedQuestionId]);

  const isValidDocumentId = (id) => {
    return true; // Logique de validation d'ID
  };

  return {
    doc,
    setDoc,
    selectedQuestionId,
    setSelectedQuestionId,
    saveDocument,
    updateQuestions,
  };
};

export default useDocument;
