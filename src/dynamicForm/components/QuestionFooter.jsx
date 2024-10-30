// QuestionFooter.js
import React from "react";
import ButtonDefault from "../../shared/components/ButtonComponents/ButtonDefault";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";
import SelectQuestionType from "./SelectQuestionType"; // Importer le composant

const QuestionFooter = ({
  onDelete,
  onDuplicate,
  onToggleRequired,
  isRequired,
  currentType,
  onTypeChange,
}) => {
  return (
    <div className="question-footer">
      <SelectQuestionType
        currentType={currentType}
        onTypeChange={onTypeChange}
      />

      <div className="spacer"></div>

      <ButtonDefault
        onClick={onToggleRequired}
        variant="variant5 btn-required"
        title="Toggle Required"
      >
        <div>
          <IoAlertCircle
            style={{ width: "16px", height: "16px" }}
            color={isRequired ? "red" : "gray"}
          />
          <span>requier</span>
        </div>
      </ButtonDefault>

      <span className="separator-vertical"></span>

      <ButtonDefault
        onClick={onDuplicate}
        variant="variant5 btn-duplicate"
        title="Duplicate Question"
      >
        <div>
          <HiMiniDocumentDuplicate style={{ width: "16px", height: "16px" }} />
          <span>duplicate</span>
        </div>
      </ButtonDefault>

      <ButtonDefault
        onClick={onDelete}
        variant="variant5 btn-delete"
        title="Delete Question"
      >
        <div>
          <MdDelete style={{ width: "16px", height: "16px" }} />
          <span>delete</span>
        </div>
      </ButtonDefault>
    </div>
  );
};

export default QuestionFooter;
