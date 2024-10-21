// AddQuestionButton.js
import React, { forwardRef } from "react";

const AddQuestionButton = forwardRef(({ onClick, questionPosition }, ref) => {
  return (
    <button
      ref={ref}
      className="button-default add-question-button"
      onClick={onClick}
      style={{
        position: "absolute",
        right: "-30px",
        top: `${questionPosition}px`,
        transition: "top 0.5s",
      }}
    >
      Add
    </button>
  );
});

export default AddQuestionButton;
