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
import InputField from "./InputComponents/InputField";
import AddQuestionButton from "./AddQuestionButton";
import { useScreenshot } from "../hooks/useScreenshot"; // Importing the hook

const QuestionUI = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formRef, takeScreenshot } = useScreenshot(); // Using the hook
  const addButtonRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const { doc, setDoc, selectedQuestionId, setSelectedQuestionId } =
    useDocument(id, navigate);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const updateQuestions = (updateFn) => {
    setDoc((prevState) => ({
      ...prevState,
      questions: updateFn(prevState.questions),
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      type: "multiple-choice",
      text: "",
      options: [""],
      isRequired: false,
    };

    updateQuestions((questions) => {
      const selectedQuestionIndex = questions.findIndex(
        (q) => q.id === selectedQuestionId
      );
      return [
        ...questions.slice(0, selectedQuestionIndex + 1),
        newQuestion,
        ...questions.slice(selectedQuestionIndex + 1),
      ];
    });

    setSelectedQuestionId(newQuestion.id);
  };

  const handleQuestionAction = (questionId, action) => {
    updateQuestions((questions) => {
      if (action === "delete") {
        return questions.filter((q) => q.id !== questionId);
      } else if (action === "duplicate") {
        const question = questions.find((q) => q.id === questionId);
        const duplicatedQuestion = { ...question, id: uuidv4() };
        const index = questions.indexOf(question);
        return [
          ...questions.slice(0, index + 1),
          duplicatedQuestion,
          ...questions.slice(index + 1),
        ];
      }
      return questions;
    });
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      updateQuestions((questions) => {
        const oldIndex = questions.findIndex((q) => q.id === active.id);
        const newIndex = questions.findIndex((q) => q.id === over.id);
        return arrayMove(questions, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    const updateButtonPosition = () => {
      const selectedQuestion = document.querySelector(
        `.question-wrapper.selected`
      );

      if (selectedQuestion && addButtonRef.current) {
        const questionTop = selectedQuestion.offsetTop;

        requestAnimationFrame(() => {
          addButtonRef.current.style.top = `${questionTop}px`;
        });
      }
    };

    updateButtonPosition();
  }, [selectedQuestionId, doc.questions]);

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
        onDragCancel={() => setActiveId(null)}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={doc.questions}
          strategy={verticalListSortingStrategy}
        >
          <div className="question-list-container">
            <div className="questions-list">
              {doc.questions.map((question) => (
                <SortableQuestion
                  key={question.id}
                  question={question}
                  selectedQuestionId={selectedQuestionId}
                  setSelectedQuestionId={setSelectedQuestionId}
                  setDoc={setDoc}
                  handleDeleteQuestion={() =>
                    handleQuestionAction(question.id, "delete")
                  }
                  handleDuplicateQuestion={() =>
                    handleQuestionAction(question.id, "duplicate")
                  }
                  onToggleRequired={() =>
                    updateQuestions((questions) =>
                      questions.map((q) =>
                        q.id === question.id
                          ? { ...q, isRequired: !q.isRequired }
                          : q
                      )
                    )
                  }
                />
              ))}
            </div>
            <AddQuestionButton ref={addButtonRef} onClick={addQuestion} />
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId && (
            <SortableQuestion
              question={doc.questions.find((q) => q.id === activeId)}
              selectedQuestionId={selectedQuestionId}
              setSelectedQuestionId={setSelectedQuestionId}
              setDoc={setDoc}
              handleDeleteQuestion={() =>
                handleQuestionAction(activeId, "delete")
              }
              handleDuplicateQuestion={() =>
                handleQuestionAction(activeId, "duplicate")
              }
              onToggleRequired={() =>
                updateQuestions((questions) =>
                  questions.map((q) =>
                    q.id === activeId ? { ...q, isRequired: !q.isRequired } : q
                  )
                )
              }
            />
          )}
        </DragOverlay>
      </DndContext>
      <button onClick={() => takeScreenshot(doc, id, false, navigate)}>
        Save
      </button>
      <button
        onClick={() => takeScreenshot(doc, id, true, navigate)}
        className="preview-button"
      >
        Preview Document
      </button>
    </div>
  );
};

export default QuestionUI;
