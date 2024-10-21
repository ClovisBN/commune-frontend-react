import React from "react";
import InputField from "../../shared/components/InputComponents/InputField";

const QuestionHeader = ({
  text,
  onTextChange,
  setActivatorNodeRef,
  listeners,
}) => {
  return (
    <div className="header-question-survey">
      <div className="row-element-survey-header">
        <div
          className="dnd-question-header"
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <svg
            width="18.5"
            height="18.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18.5 18.5"
          >
            <circle cx="5.5" cy="3.5" r="1" />
            <circle cx="5.5" cy="9.25" r="1" />
            <circle cx="5.5" cy="15" r="1" />
            <circle cx="13" cy="3.5" r="1" />
            <circle cx="13" cy="9.25" r="1" />
            <circle cx="13" cy="15" r="1" />
          </svg>
        </div>
        <InputField
          name="question-survey-title"
          type="text"
          value={text || ""}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your question title"
          variant="variant2"
        />
      </div>
    </div>
  );
};

export default QuestionHeader;
