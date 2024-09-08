import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import SortableQuestion from "./SortableQuestion";
import useDocument from "../hooks/useDocument";
import html2canvas from "html2canvas";
import api from "../services/Api"; // Importer api pour les requêtes
import InputField from "./InputComponents/InputField"; // Import du composant InputField

const QuestionUI = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const addButtonRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [questionPosition, setQuestionPosition] = useState(0);
  const { doc, setDoc, selectedQuestionId, setSelectedQuestionId } =
    useDocument(id, navigate); // Supprimé saveDocument, car non utilisé

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addQuestion = () => {
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
  };

  const handleDeleteQuestion = (questionId) => {
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
          newSelectedQuestionId = newQuestions[deletedQuestionIndex - 1].id;
        }
      }

      setSelectedQuestionId(newSelectedQuestionId);

      return {
        ...prevState,
        questions: newQuestions,
      };
    });
  };

  const handleDuplicateQuestion = (question) => {
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

    setSelectedQuestionId(newQuestion.id);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over.id) {
      setDoc((prevState) => {
        const oldIndex = prevState.questions.findIndex(
          (q) => q.id === active.id
        );
        const newIndex = prevState.questions.findIndex((q) => q.id === over.id);

        const newQuestions = arrayMove(prevState.questions, oldIndex, newIndex);

        return {
          ...prevState,
          questions: newQuestions,
        };
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const saveDocumentWithScreenshot = async (redirectToPreview = false) => {
    try {
      let screenshot = null;
      if (formRef.current) {
        const canvas = await html2canvas(formRef.current);
        screenshot = canvas.toDataURL("image/png");
      }

      // Envoyer le document et le screenshot au backend
      await api.put(`/documents/${id}`, {
        ...doc,
        screenshot, // Envoyer le screenshot avec les autres données du document
      });

      // Nettoyer le localStorage si nécessaire
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

  useEffect(() => {
    if (addButtonRef.current) {
      addButtonRef.current.style.top = `${questionPosition}px`;
    }
  }, [questionPosition]);

  return (
    <div className="document-container container-scroll-element" ref={formRef}>
      <div className="survey-header-contnaire">
        <InputField
          type="text"
          name="documentName"
          value={doc.name}
          onChange={(e) => setDoc({ ...doc, name: e.target.value })}
          placeholder="Document Name"
          variant="variant3"
        />
        <InputField
          type="textarea"
          name="documentDescription"
          value={doc.description}
          onChange={(e) => setDoc({ ...doc, description: e.target.value })}
          placeholder="Document Description"
          variant="variant3"
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={doc.questions}
          strategy={verticalListSortingStrategy}
        >
          <div className="questions-list">
            {doc.questions.map((question) => (
              <SortableQuestion
                key={question.id}
                question={question}
                selectedQuestionId={selectedQuestionId}
                setSelectedQuestionId={setSelectedQuestionId}
                setDoc={setDoc}
                handleDeleteQuestion={handleDeleteQuestion}
                handleDuplicateQuestion={handleDuplicateQuestion}
                onToggleRequired={() =>
                  setDoc((prevState) => ({
                    ...prevState,
                    questions: prevState.questions.map((q) =>
                      q.id === question.id
                        ? { ...q, isRequired: !q.isRequired }
                        : q
                    ),
                  }))
                }
                setQuestionPosition={setQuestionPosition} // Pass setQuestionPosition to SortableQuestion
              />
            ))}
            <button
              ref={addButtonRef}
              className="add-question-button"
              onClick={addQuestion}
              style={{ position: "absolute" }}
            >
              Add
            </button>
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <SortableQuestion
              question={doc.questions.find((q) => q.id === activeId)}
              selectedQuestionId={selectedQuestionId}
              setSelectedQuestionId={setSelectedQuestionId}
              setDoc={setDoc}
              handleDeleteQuestion={handleDeleteQuestion}
              handleDuplicateQuestion={handleDuplicateQuestion}
              onToggleRequired={() =>
                setDoc((prevState) => ({
                  ...prevState,
                  questions: prevState.questions.map((q) =>
                    q.id === activeId ? { ...q, isRequired: !q.isRequired } : q
                  ),
                }))
              }
              setQuestionPosition={setQuestionPosition} // Pass setQuestionPosition to SortableQuestion
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <button onClick={() => saveDocumentWithScreenshot(false)}>Save</button>
      <button
        onClick={() => saveDocumentWithScreenshot(true)}
        className="preview-button"
      >
        Preview Document
      </button>
    </div>
  );
};

export default QuestionUI;
