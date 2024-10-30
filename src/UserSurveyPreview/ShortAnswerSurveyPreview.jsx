// ShortAnswerSurveyPreview.jsx
import React from "react";

const ShortAnswerSurveyPreview = ({ question }) => {
  return (
    <div className="short-answer-survey-answer">
      <h3 className={question.isRequired ? "required" : ""}>{question.text}</h3>
      <div className="cont-answare-survey">
        <div className="prview-survey-question">Reponse courte</div>
      </div>
    </div>
  );
};

export default ShortAnswerSurveyPreview;
