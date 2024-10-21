import React, { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import DraggableList from "../../shared/components/DraggableList";
import SortableQuestion from "./SortableQuestion";
import useDocument from "../../hooks/useDocument";
import InputField from "../../shared/components/InputComponents/InputField";
import AddQuestionButton from "./AddQuestionButton";
import { useScreenshot } from "../../hooks/useScreenshot";

const QuestionUI = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formRef, takeScreenshot } = useScreenshot();
  const addButtonRef = useRef(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [adjustedPosition, setAdjustedPosition] = useState(0);
  const {
    doc,
    setDoc,
    selectedQuestionId,
    setSelectedQuestionId,
    updateQuestions,
  } = useDocument(id, navigate);

  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      type: "multiple-choice",
      text: "",
      options: [
        { id: uuidv4(), text: "Option 1" },
        { id: uuidv4(), text: "Option 2" },
      ],
      isRequired: false,
    };

    updateQuestions((questions) => {
      const selectedQuestionIndex = questions.findIndex(
        (q) => q.id === selectedQuestionId
      );
      const insertIndex =
        selectedQuestionIndex !== -1
          ? selectedQuestionIndex + 1
          : questions.length;
      return [
        ...questions.slice(0, insertIndex),
        newQuestion,
        ...questions.slice(insertIndex),
      ];
    });

    setSelectedQuestionId(newQuestion.id);
  };

  const handleReorderQuestions = (newQuestions) => {
    setDoc((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleDeleteQuestion = (questionId) => {
    setPendingAction({ type: "delete", questionId });
  };

  const handleDuplicateQuestion = (question) => {
    setPendingAction({ type: "duplicate", question });
  };

  useEffect(() => {
    if (pendingAction) {
      if (pendingAction.type === "delete") {
        const { questionId } = pendingAction;

        updateQuestions((questions) => {
          const idx = questions.findIndex((q) => q.id === questionId);
          const newQuestions = questions.filter((q) => q.id !== questionId);

          if (selectedQuestionId === questionId) {
            let newSelectedQuestionIndex = idx > 0 ? idx - 1 : 0;

            if (newQuestions.length > 0) {
              setSelectedQuestionId(newQuestions[newSelectedQuestionIndex].id);
            } else {
              setSelectedQuestionId(null);
            }
          }

          return newQuestions;
        });
      } else if (pendingAction.type === "duplicate") {
        const { question } = pendingAction;
        const duplicatedQuestion = {
          ...question,
          id: uuidv4(),
          options: question.options.map((opt) => ({ ...opt, id: uuidv4() })),
        };

        updateQuestions((questions) => {
          const idx = questions.findIndex((q) => q.id === question.id);
          const newQuestions = [
            ...questions.slice(0, idx + 1),
            duplicatedQuestion,
            ...questions.slice(idx + 1),
          ];

          setSelectedQuestionId(duplicatedQuestion.id);
          return newQuestions;
        });
      }

      setPendingAction(null);
    }
  }, [
    selectedQuestionId,
    pendingAction,
    updateQuestions,
    setSelectedQuestionId,
  ]);

  useEffect(() => {
    const currentFormRef = formRef.current;

    const scrollToSelectedQuestion = () => {
      const selectedElement = document.getElementById(
        `question-${selectedQuestionId}`
      );
      if (selectedElement && currentFormRef) {
        const rect = selectedElement.getBoundingClientRect();
        const containerRect = currentFormRef.getBoundingClientRect();

        if (
          rect.top < containerRect.top ||
          rect.bottom > containerRect.bottom
        ) {
          const offset =
            rect.top < containerRect.top
              ? rect.top - containerRect.top
              : rect.bottom - containerRect.bottom;

          currentFormRef.scrollTo({
            top: currentFormRef.scrollTop + offset,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToSelectedQuestion();
  }, [selectedQuestionId, formRef]);

  useEffect(() => {
    const currentFormRef = formRef.current;

    const updateButtonPosition = () => {
      const selectedElement = document.getElementById(
        `question-${selectedQuestionId}`
      );
      if (selectedElement && currentFormRef) {
        const rect = selectedElement.getBoundingClientRect();
        const containerRect = currentFormRef.getBoundingClientRect();
        const position =
          rect.top -
          containerRect.top +
          selectedElement.offsetHeight / 2 -
          20 +
          currentFormRef.scrollTop;

        const adjustedTop = Math.min(
          Math.max(position, currentFormRef.scrollTop + 20),
          currentFormRef.scrollTop + containerRect.height - 40
        );

        setAdjustedPosition(adjustedTop);
      }
    };

    updateButtonPosition();

    window.addEventListener("resize", updateButtonPosition);
    currentFormRef?.addEventListener("scroll", updateButtonPosition);

    return () => {
      window.removeEventListener("resize", updateButtonPosition);
      currentFormRef?.removeEventListener("scroll", updateButtonPosition);
    };
  }, [selectedQuestionId, formRef]);

  if (!doc) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="document-container container-scroll-element"
      ref={formRef}
      style={{ position: "relative", overflowY: "auto" }}
    >
      <div className="cont-form-doc">
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
        <DraggableList
          items={doc.questions}
          onItemsReordered={handleReorderQuestions}
          renderItem={(question, index, dndProps) => (
            <SortableQuestion
              key={question.id}
              question={question}
              selectedQuestionId={selectedQuestionId}
              setSelectedQuestionId={setSelectedQuestionId}
              setDoc={setDoc}
              handleDeleteQuestion={handleDeleteQuestion}
              handleDuplicateQuestion={handleDuplicateQuestion}
              {...dndProps}
            />
          )}
        />
        <AddQuestionButton
          ref={addButtonRef}
          onClick={addQuestion}
          questionPosition={adjustedPosition}
        />
      </div>
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
