// useDocument.js
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchDocumentById,
  updateDocument as updateDocumentService,
} from "../services/documentService";
import { handleError } from "../shared/utils/errorHandler";
import debounce from "lodash/debounce";

const useDocument = (id, navigate) => {
  const [doc, setDoc] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const saveDocument = useRef(
    debounce(async (docToSave, docId) => {
      try {
        await updateDocumentService(docId, docToSave);
      } catch (error) {
        handleError(error, navigate);
      }
    }, 1000)
  ).current;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const fetchedDoc = await fetchDocumentById(id);
        setDoc(fetchedDoc);

        if (fetchedDoc.questions && fetchedDoc.questions.length > 0) {
          setSelectedQuestionId(fetchedDoc.questions[0].id);
        }
      } catch (error) {
        handleError(error, navigate);
      }
    };

    fetchDocument();
  }, [id, navigate]);

  useEffect(() => {
    if (doc) {
      saveDocument(doc, id);
    }
  }, [doc, id, saveDocument]);

  useEffect(() => {
    return () => {
      saveDocument.flush();
      saveDocument(doc, id);
    };
  }, [doc, id, saveDocument]);

  const updateQuestions = useCallback((updateFn) => {
    setDoc((prevState) => ({
      ...prevState,
      questions: updateFn(prevState.questions),
    }));
  }, []);

  return {
    doc,
    setDoc,
    selectedQuestionId,
    setSelectedQuestionId,
    updateQuestions,
  };
};

export default useDocument;
