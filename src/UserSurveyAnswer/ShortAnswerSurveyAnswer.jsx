// ShortAnswerSurveyAnswer.jsx
import React from "react";

const ShortAnswerSurveyAnswer = ({ question }) => {
  return (
    <div className="short-answer-survey-answer">
      <h3>{question.text}</h3>
      <input type="text" placeholder="Your answer here..." disabled />
    </div>
  );
};

export default ShortAnswerSurveyAnswer;
