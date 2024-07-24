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
import useDocument from "./useDocument";
import "./QuestionUI.css";

const QuestionUI = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addButtonRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const {
    doc,
    setDoc,
    selectedQuestionId,
    setSelectedQuestionId,
    saveDocument,
  } = useDocument(id, navigate);

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
        onChange={(e) => setDoc({ ...doc, name: e.target.value })}
        className="document-title"
      />
      <textarea
        value={doc.description}
        onChange={(e) => setDoc({ ...doc, description: e.target.value })}
        className="document-description"
      />
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
          <div className="questions-container">
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
                />
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
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <button onClick={() => saveDocument(false)}>Save</button>
      <button onClick={() => saveDocument(true)} className="preview-button">
        Preview Document
      </button>
    </div>
  );
};

export default QuestionUI;
