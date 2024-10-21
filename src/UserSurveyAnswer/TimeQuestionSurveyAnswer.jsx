// TimeQuestionSurveyAnswer.jsx
import React from "react";

const TimeQuestionSurveyAnswer = ({ question }) => {
  return (
    <div className="time-question-survey-answer">
      <h3>{question.text}</h3>
      <p>Time: {question.time}</p>
    </div>
  );
};

export default TimeQuestionSurveyAnswer;
