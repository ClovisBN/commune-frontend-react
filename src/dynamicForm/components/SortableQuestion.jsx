import React from "react";
import UnifiedQuestion from "./UnifiedQuestion";

const SortableQuestion = ({
  question,
  selectedQuestionId,
  setSelectedQuestionId,
  setDoc,
  handleDeleteQuestion,
  handleDuplicateQuestion,
  onToggleRequired,
  attributes,
  listeners,
  setNodeRef,
  setActivatorNodeRef,
  isDragging,
}) => {
  return (
    <div
      id={`question-${question.id}`}
      className={`question-wrapper ${
        selectedQuestionId === question.id ? "selected" : ""
      }`}
      onClick={() => setSelectedQuestionId(question.id)}
      ref={setNodeRef}
      {...attributes}
      style={{
        opacity: isDragging ? 0 : 1,
        position: "relative",
        width: "100%",
        height: "auto",
      }}
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
        setActivatorNodeRef={setActivatorNodeRef}
        listeners={listeners}
      />
    </div>
  );
};

export default SortableQuestion;
