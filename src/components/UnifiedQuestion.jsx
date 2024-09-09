import React from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionFooter from "./QuestionFooter";
import MultipleChoiceQuestion from "./QuestionTypeForm/MultipleChoiceQuestion";
import ShortAnswerQuestion from "./QuestionTypeForm/ShortAnswerQuestion";
import DateQuestion from "./QuestionTypeForm/DateQuestion";
import TimeQuestion from "./QuestionTypeForm/TimeQuestion";
import CheckboxQuestion from "./QuestionTypeForm/CheckboxQuestion";

const UnifiedQuestion = ({
  question,
  onChange,
  onDelete,
  onDuplicate,
  onToggleRequired,
  isSelected,
}) => {
  return (
    <div className="question-container">
      <QuestionHeader
        text={question.text}
        type={question.type}
        onTextChange={(text) => onChange({ ...question, text })}
        onTypeChange={(type) => onChange({ ...question, type })}
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
      {question.type === "checkbox" && (
        <CheckboxQuestion question={question} onChange={onChange} />
      )}

      {isSelected && (
        <QuestionFooter
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onToggleRequired={onToggleRequired}
          isRequired={question.isRequired}
        />
      )}
    </div>
  );
};

export default UnifiedQuestion;
