// DateQuestionSurveyPreview.jsx
import React from "react";

const DateQuestionSurveyPreview = ({ question }) => {
  return (
    <div className="date-question-survey-answer">
      <h3 className={question.isRequired ? "required" : ""}>{question.text}</h3>
      <div className="cont-answare-survey">
        <div className="prview-survey-question">Reponse date</div>
      </div>
    </div>
  );
};

export default DateQuestionSurveyPreview;
