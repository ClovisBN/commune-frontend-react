import React from "react";
import "./DocumentPreview.css";

const DocumentPreview = ({ document }) => {
  return (
    <div className="document-preview">
      <h3>{document.name}</h3>
      <p>{document.description}</p>
      <ul>
        {document.questions.map((question, index) => (
          <li key={index}>
            <strong>Q: {question.text}</strong>
            <ul>
              {question.type === "multiple-choice" && (
                <div className="multiple-choice-preview">
                  {question.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </div>
              )}
              {question.type === "short-answer" && (
                <div className="short-answer-preview">
                  <input type="text" placeholder="Short answer text" disabled />
                </div>
              )}
              {question.type === "date" && (
                <div className="date-preview">
                  <input type="date" disabled />
                </div>
              )}
              {question.type === "time" && (
                <div className="time-preview">
                  <input type="time" disabled />
                </div>
              )}
              {question.type === "checkbox" && (
                <div className="checkbox-preview">
                  {question.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </div>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentPreview;
