import React from "react";
import { FaTrash, FaCopy, FaExclamationCircle } from "react-icons/fa";

const QuestionFooter = ({
  onDelete,
  onDuplicate,
  onToggleRequired,
  isRequired,
}) => {
  return (
    <div className="question-footer">
      <button onClick={onDelete} title="Delete Question">
        <FaTrash />
      </button>
      <button onClick={onDuplicate} title="Duplicate Question">
        <FaCopy />
      </button>
      <button onClick={onToggleRequired} title="Toggle Required">
        <FaExclamationCircle color={isRequired ? "red" : "gray"} />
      </button>
    </div>
  );
};

export default QuestionFooter;
