// TimeQuestionSurveyPreview.jsx
import React from "react";

const TimeQuestionSurveyPreview = ({ question }) => {
  return (
    <div className="time-question-survey-answer">
      <h3>{question.text}</h3>
      <p>Time: {question.time}</p>
    </div>
  );
};

export default TimeQuestionSurveyPreview;
