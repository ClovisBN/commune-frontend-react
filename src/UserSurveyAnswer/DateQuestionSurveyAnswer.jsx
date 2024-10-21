// DateQuestionSurveyAnswer.jsx
import React from "react";

const DateQuestionSurveyAnswer = ({ question }) => {
  return (
    <div className="date-question-survey-answer">
      <h3>{question.text}</h3>
      <p>Date: {question.date}</p>
    </div>
  );
};

export default DateQuestionSurveyAnswer;
