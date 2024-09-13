import React from "react";
// import { HiDotsHorizontal } from "react-icons/hi";
import SelectQuestionType from "./SelectQuestionType";
import InputField from "../../shared/components/InputComponents/InputField"; // Import du composant InputField

const QuestionHeader = ({ text, type, onTextChange, onTypeChange }) => {
  return (
    <div className="header-question-survey">
      <div className="row-element-survey-header">
        <InputField
          name="question-survey-title"
          type="text"
          value={text || ""}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your question title"
          variant="variant2"
        />
        <SelectQuestionType currentType={type} onTypeChange={onTypeChange} />
      </div>
    </div>
  );
};

export default QuestionHeader;
