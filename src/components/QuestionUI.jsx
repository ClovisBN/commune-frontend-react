import React, { useState, useEffect, useRef } from "react";
import api from "./Api"; // Utilisez api pour les requêtes
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import UnifiedQuestion from "./UnifiedQuestion";
import "./QuestionUI.css";

const QuestionUI = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState({
    name: "untitled-form",
    description: "Add Description",
    questions: [],
  });
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const addButtonRef = useRef(null);

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

  const addQuestion = () => {
    try {
      const newQuestion = {
        id: uuidv4(),
        type: "multiple-choice",
        text: "",
        options: [""],
        isRequired: false,
      };

      setDoc((prevState) => {
        const selectedQuestionIndex = prevState.questions.findIndex(
          (q) => q.id === selectedQuestionId
        );
        const newQuestions = [...prevState.questions];
        newQuestions.splice(selectedQuestionIndex + 1, 0, newQuestion);
        return {
          ...prevState,
          questions: newQuestions,
        };
      });

      setSelectedQuestionId(newQuestion.id);
    } catch (error) {
      if (error.message === "Token expired") {
        console.log("Your token expired");
        navigate("/login");
      } else {
        console.error("Error adding question:", error);
      }
    }
  };

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

  const handleQuestionChange = (updatedQuestion) => {
    setDoc((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
  };

  const handleNameChange = (e) => {
    setDoc({ ...doc, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setDoc({ ...doc, description: e.target.value });
  };

  const handleQuestionClick = (questionId) => {
    setSelectedQuestionId(questionId);
  };

  const handleDeleteQuestion = (questionId) => {
    try {
      setDoc((prevState) => {
        const newQuestions = prevState.questions.filter(
          (q) => q.id !== questionId
        );
        let newSelectedQuestionId = null;

        if (newQuestions.length > 0) {
          const deletedQuestionIndex = prevState.questions.findIndex(
            (q) => q.id === questionId
          );
          if (deletedQuestionIndex === 0) {
            newSelectedQuestionId = newQuestions[0].id;
          } else {
            newSelectedQuestionId =
              newQuestions[Math.max(0, deletedQuestionIndex - 1)].id;
          }
        }

        setSelectedQuestionId(newSelectedQuestionId);

        return {
          ...prevState,
          questions: newQuestions,
        };
      });
    } catch (error) {
      if (error.message === "Token expired") {
        console.log("Your token expired");
        navigate("/login");
      } else {
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleDuplicateQuestion = (question) => {
    try {
      const newQuestion = { ...question, id: uuidv4() };
      setDoc((prevState) => {
        const questionIndex = prevState.questions.findIndex(
          (q) => q.id === question.id
        );
        const newQuestions = [...prevState.questions];
        newQuestions.splice(questionIndex + 1, 0, newQuestion);
        return {
          ...prevState,
          questions: newQuestions,
        };
      });
      setTimeout(() => setSelectedQuestionId(newQuestion.id), 0);
    } catch (error) {
      if (error.message === "Token expired") {
        console.log("Your token expired");
        navigate("/login");
      } else {
        console.error("Error duplicating question:", error);
      }
    }
  };

  const handleToggleRequired = (question) => {
    const updatedQuestion = { ...question, isRequired: !question.isRequired };
    handleQuestionChange(updatedQuestion);
  };

  useEffect(() => {
    if (selectedQuestionId && addButtonRef.current) {
      const selectedElement = document.getElementById(selectedQuestionId);
      if (selectedElement) {
        const rect = selectedElement.getBoundingClientRect();
        addButtonRef.current.style.top = `${rect.top + window.scrollY}px`;
      }
    }
  }, [selectedQuestionId, doc.questions]);

  return (
    <div className="document-container">
      <input
        type="text"
        value={doc.name}
        onChange={handleNameChange}
        className="document-title"
      />
      <textarea
        value={doc.description}
        onChange={handleDescriptionChange}
        className="document-description"
      />
      <div className="questions-container">
        <div className="questions-list">
          {doc.questions.map((question) => (
            <div
              key={question.id}
              id={question.id}
              className={`question-wrapper ${
                selectedQuestionId === question.id ? "selected" : ""
              }`}
              onClick={() => handleQuestionClick(question.id)}
            >
              <UnifiedQuestion
                question={question}
                onChange={handleQuestionChange}
                onDelete={() => handleDeleteQuestion(question.id)}
                onDuplicate={() => handleDuplicateQuestion(question)}
                onToggleRequired={() => handleToggleRequired(question)}
                isSelected={selectedQuestionId === question.id}
              />
            </div>
          ))}
        </div>
        <button
          ref={addButtonRef}
          className="add-question-button"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </div>
      <button onClick={() => saveDocument(false)}>Save</button>
      <button onClick={() => saveDocument(true)} className="preview-button">
        Preview Document
      </button>
    </div>
  );
};

export default QuestionUI;
