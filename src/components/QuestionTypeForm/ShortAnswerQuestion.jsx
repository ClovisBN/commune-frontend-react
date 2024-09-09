import React from "react";
import InputField from "../InputComponents/InputField";

const ShortAnswerQuestion = ({ question }) => {
  return (
    <div className="short-answer-question">
      <InputField type="text" placeholder="Short answer text" disabled />
    </div>
  );
};

export default ShortAnswerQuestion;
