import React from "react";
import SelectQuestionType from "./SelectQuestionType";

const QuestionHeader = ({ text, type, onTextChange, onTypeChange }) => {
  return (
    <div className="question-header">
      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter your question"
      />
      <SelectQuestionType currentType={type} onTypeChange={onTypeChange} />
    </div>
  );
};

export default QuestionHeader;
