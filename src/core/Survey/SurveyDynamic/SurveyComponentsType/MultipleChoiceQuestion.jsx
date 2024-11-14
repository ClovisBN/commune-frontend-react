// MultipleChoiceQuestion.js
import React from "react";
import InputField from "../../../../shared/components/InputComponents/InputField";
import ButtonDefault from "../../../../shared/components/ButtonComponents/ButtonDefault";
import useMultipleChoiceActions from "./useMultipleChoiceActions";

const MultipleChoiceQuestion = ({ question, onChange }) => {
  const { inputRefs, handleOptionChange, handleAddOption, removeOption } =
    useMultipleChoiceActions(question, onChange);

  return (
    <div className="multiple-choice-question">
      {question.options.map((option, index) => (
        <div className="option" key={option.id} data-id={option.id}>
          <div className="sub-option">
            <svg
              width="18.5"
              height="18.5"
              className="option-sicle-checkBox-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18.5 18.5"
            >
              <circle cx="9.25" cy="9.25" r="8" strokeWidth="1.5" />
            </svg>

            <InputField
              ref={(el) => (inputRefs.current[index] = el)}
              name={`input-option-${question.id}-${index}`}
              type="text"
              value={option.text || ""}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              variant="variant2"
            />

            <ButtonDefault
              onClick={() => removeOption(option.id)}
              variant="variant2"
              title="Remove Choice"
            >
              <svg role="graphics-symbol" viewBox="0 0 16 16" className="trash">
                {/* SVG Path */}
              </svg>
            </ButtonDefault>
          </div>
        </div>
      ))}

      <div
        className="create-option"
        onClick={handleAddOption}
        style={{ cursor: "pointer" }}
      >
        <svg viewBox="0 0 16 16" className="plus">
          {/* SVG Path */}
        </svg>
        Ajouter une option
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
