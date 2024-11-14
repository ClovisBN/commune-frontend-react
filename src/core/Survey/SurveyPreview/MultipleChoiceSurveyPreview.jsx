import React from "react";

const MultipleChoiceSurveyPreview = ({ question }) => {
  return (
    <div className="multiple-choice-survey-answer">
      <h3 className={question.isRequired ? "required" : ""}>{question.text}</h3>
      <div className="cont-answare-survey">
        {question.options.map((option) => (
          <div className="option-answare" key={option.id}>
            <svg
              width="18.5"
              height="18.5"
              className="option-sicle-checkBox-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18.5 18.5"
            >
              <circle cx="9.25" cy="9.25" r="8" strokeWidth="1.5" />
            </svg>
            <div>{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceSurveyPreview;
