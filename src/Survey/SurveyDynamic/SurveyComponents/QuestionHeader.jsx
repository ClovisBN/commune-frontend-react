// QuestionHeader.js
import React from "react";
import InputField from "../../../shared/components/InputComponents/InputField";
// import { LuGrip } from "react-icons/lu";

const QuestionHeader = ({ text, onTextChange, isRequired }) => {
  return (
    <div className="header-question-survey">
      <div className="top-header-survey">
        <InputField
          name="question-survey-title"
          type="textarea"
          value={text || ""}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter your question title"
          variant="variant2"
          disabled={false} // Vous pouvez ajuster cette valeur si nécessaire
        />
        {/* <div className="dnd-question">
          <LuGrip />
        </div> */}
      </div>
      {isRequired && (
        <div className="required-message">(question obligatoire)</div>
      )}
    </div>
  );
};

export default QuestionHeader;
