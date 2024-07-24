import { useState, useEffect } from "react";
import api from "./Api";

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
        if (savedDoc) {
          setDoc(JSON.parse(savedDoc));
        } else {
          const response = await api.get(`/documents/${id}`);
          setDoc(response.data);
        }

        const savedSelectedQuestionId =
          localStorage.getItem("selectedQuestionId");
        if (savedSelectedQuestionId) {
          setSelectedQuestionId(savedSelectedQuestionId);
        }
      } catch (error) {
        if (error.message === "Token expired") {
          console.log("Your token expired");
          navigate("/login");
        } else {
          console.error("Error fetching document:", error);
        }
      }
    };

    fetchDocument();
  }, [id, navigate]);

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

  const saveDocument = async (redirectToPreview = false) => {
    try {
      await api.put(`/documents/${id}`, doc);
      localStorage.removeItem(`document-${id}`);
      if (redirectToPreview) {
        navigate(`/documents/preview/${id}`);
      }
    } catch (error) {
      if (error.message === "Token expired") {
        console.log("Your token expired");
        navigate("/login");
      } else {
        console.error("Error saving document:", error);
      }
    }
  };

  return {
    doc,
    setDoc,
    selectedQuestionId,
    setSelectedQuestionId,
    saveDocument,
  };
};

export default useDocument;
