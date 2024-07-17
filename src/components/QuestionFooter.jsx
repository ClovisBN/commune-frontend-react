import React from "react";

const QuestionFooter = ({
  onDelete,
  onDuplicate,
  onToggleRequired,
  isRequired,
}) => {
  return (
    <div className="question-footer">
      <button onClick={onDelete}>Delete</button>
      <button onClick={onDuplicate}>Duplicate</button>
      <button onClick={onToggleRequired}>
        {isRequired ? "Unmark Required" : "Mark Required"}
      </button>
    </div>
  );
};

export default QuestionFooter;
