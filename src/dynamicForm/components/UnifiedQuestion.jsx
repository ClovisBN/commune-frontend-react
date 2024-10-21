import React from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionFooter from "./QuestionFooter";
import MultipleChoiceQuestion from "../QuestionTypeForm/MultipleChoiceQuestion";
import ShortAnswerQuestion from "../QuestionTypeForm/ShortAnswerQuestion";
import DateQuestion from "../QuestionTypeForm/DateQuestion";
import TimeQuestion from "../QuestionTypeForm/TimeQuestion";

const UnifiedQuestion = ({
  question,
  onChange,
  onDelete,
  onDuplicate,
  onToggleRequired,
  isSelected,
  setActivatorNodeRef,
  listeners,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <QuestionHeader
        text={question.text}
        onTextChange={(text) => onChange({ ...question, text })}
        setActivatorNodeRef={setActivatorNodeRef}
        listeners={listeners}
      />

      {question.type === "multiple-choice" && (
        <MultipleChoiceQuestion question={question} onChange={onChange} />
      )}
      {question.type === "short-answer" && (
        <ShortAnswerQuestion question={question} />
      )}
      {question.type === "date" && (
        <DateQuestion question={question} onChange={onChange} />
      )}
      {question.type === "time" && (
        <TimeQuestion question={question} onChange={onChange} />
      )}

      <QuestionFooter
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onToggleRequired={onToggleRequired}
        isRequired={question.isRequired}
        currentType={question.type} // Passer le type actuel de la question
        onTypeChange={(type) => onChange({ ...question, type })} // Gestion du changement de type
      />
    </div>
  );
};

export default UnifiedQuestion;
