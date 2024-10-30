// UnifiedQuestion.js
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
  isSelected,
}) => {
  // Fonction pour basculer l'état isRequired dans le JSON de la question
  const toggleRequired = () => {
    onChange({ ...question, isRequired: !question.isRequired });
  };

  return (
    <div className="contanier-question-surveys">
      <QuestionHeader
        text={question.text}
        onTextChange={(text) => onChange({ ...question, text })}
        isRequired={question.isRequired}
      />

      {question.type === "multiple-choice" && (
        <MultipleChoiceQuestion question={question} onChange={onChange} />
      )}
      {question.type === "short-answer" && (
        <ShortAnswerQuestion question={question} onChange={onChange} />
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
        onToggleRequired={toggleRequired} // Passe toggleRequired ici
        isRequired={question.isRequired}
        currentType={question.type}
        onTypeChange={(type) => onChange({ ...question, type })}
      />
    </div>
  );
};

export default UnifiedQuestion;
