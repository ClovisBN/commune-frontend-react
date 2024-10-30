// TimeQuestionSurveyPreview.jsx
import React from "react";

const TimeQuestionSurveyPreview = ({ question }) => {
  return (
    <div className="time-question-survey-answer">
      <h3 className={question.isRequired ? "required" : ""}>{question.text}</h3>
      <div className="cont-answare-survey">
        <div className="prview-survey-question">Reponse horaire</div>
      </div>
    </div>
  );
};

export default TimeQuestionSurveyPreview;
