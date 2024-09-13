import React, { forwardRef } from "react";

const AddQuestionButton = forwardRef(({ onClick, questionPosition }, ref) => {
  return (
    <button
      ref={ref}
      className="add-question-button"
      onClick={onClick}
      style={{ position: "absolute", top: `${questionPosition}px` }}
    >
      Add
    </button>
  );
});

export default AddQuestionButton;
