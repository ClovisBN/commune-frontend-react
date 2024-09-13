import React from "react";
import ButtonDefault from "../../shared/components/ButtonComponents/ButtonDefault"; // Assure-toi que le chemin est correct
import {
  HiOutlineDocumentDuplicate,
  HiOutlineExclamationCircle,
  HiOutlineTrash,
} from "react-icons/hi";

const QuestionFooter = ({
  onDelete,
  onDuplicate,
  onToggleRequired,
  isRequired,
}) => {
  return (
    <div className="question-footer">
      <ButtonDefault
        onClick={onDelete}
        variant="variant3"
        title="Delete Question"
      >
        <HiOutlineTrash
          style={{ width: "16px", height: "16px", fill: "#9198a1" }}
        />
      </ButtonDefault>
      <ButtonDefault
        onClick={onDuplicate}
        variant="variant3"
        title="Duplicate Question"
      >
        <HiOutlineDocumentDuplicate
          style={{ width: "16px", height: "16px", fill: "#9198a1" }}
        />
      </ButtonDefault>
      <ButtonDefault
        onClick={onToggleRequired}
        variant="variant3"
        title="Toggle Required"
      >
        <HiOutlineExclamationCircle
          style={{ width: "16px", height: "16px", fill: "#9198a1" }}
          color={isRequired ? "red" : "gray"}
        />
      </ButtonDefault>
    </div>
  );
};

export default QuestionFooter;
