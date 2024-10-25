// ShortAnswerSurveyPreview.jsx
import React from "react";

const ShortAnswerSurveyPreview = ({ question }) => {
  return (
    <div className="short-answer-survey-answer">
      <h3>{question.text}</h3>
      <input type="text" placeholder="Your answer here..." disabled />
    </div>
  );
};

export default ShortAnswerSurveyPreview;
