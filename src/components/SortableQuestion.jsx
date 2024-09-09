import React, { useEffect, useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import UnifiedQuestion from "./UnifiedQuestion";

const SortableQuestion = ({
  question,
  selectedQuestionId,
  setSelectedQuestionId,
  setDoc,
  handleDeleteQuestion,
  handleDuplicateQuestion,
  onToggleRequired,
}) => {
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: question.id });

  const questionRef = useRef(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : "auto",
    opacity: isDragging ? 0 : 1,
  };

  useEffect(() => {
    if (selectedQuestionId === question.id && questionRef.current) {
      // Peut-être d'autres effets ici si nécessaire
    }
  }, [selectedQuestionId, question.id]);

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        questionRef.current = node;
      }}
      style={style}
      className={`question-wrapper ${
        selectedQuestionId === question.id ? "selected" : ""
      }`}
      onClick={() => setSelectedQuestionId(question.id)}
    >
      <div {...listeners} className="dnd-kit-handle"></div>
      <UnifiedQuestion
        question={question}
        onChange={(updatedQuestion) =>
          setDoc((prevState) => ({
            ...prevState,
            questions: prevState.questions.map((q) =>
              q.id === updatedQuestion.id ? updatedQuestion : q
            ),
          }))
        }
        onDelete={() => handleDeleteQuestion(question.id)}
        onDuplicate={() => handleDuplicateQuestion(question)}
        onToggleRequired={onToggleRequired}
        isSelected={selectedQuestionId === question.id}
      />
    </div>
  );
};

export default SortableQuestion;
