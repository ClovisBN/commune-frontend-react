import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import SelectQuestionType from "./SelectQuestionType";
import "./QuestionUI.css"; // Assurez-vous que les styles sont inclus

const QuestionHeader = ({ text, type, onTextChange, onTypeChange }) => {
  return (
    <div className="question-header">
      <div className="drag-end-drop-header">
        <HiDotsHorizontal />
      </div>
      <div className="cnt-btn-question-header">
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your question"
        />
        <SelectQuestionType currentType={type} onTypeChange={onTypeChange} />
      </div>
    </div>
  );
};

export default QuestionHeader;
