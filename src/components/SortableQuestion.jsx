import React from "react";
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : "auto",
    opacity: isDragging ? 0 : 1, // Appliquer l'opacité 0 si l'élément est en train d'être déplacé
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`question-wrapper ${
        selectedQuestionId === question.id ? "selected" : ""
      }`}
      onClick={() => setSelectedQuestionId(question.id)}
    >
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
