import React, { useRef, useEffect } from "react";
import InputField from "../../shared/components/InputComponents/InputField";
import ButtonDefault from "../../shared/components/ButtonComponents/ButtonDefault";
import { GoX } from "react-icons/go";

const MultipleChoiceQuestion = ({ question, onChange }) => {
  const inputRefs = useRef([]);

  const addOptionAtIndex = (index) => {
    const updatedOptions = [
      ...question.options.slice(0, index + 1),
      "",
      ...question.options.slice(index + 1),
    ];
    onChange({ ...question, options: updatedOptions });
  };

  const saveCursorPosition = (questionId, index) => {
    const activeElement = document.activeElement;
    if (activeElement && inputRefs.current[index]) {
      const cursorPosition = activeElement.selectionStart;
      localStorage.setItem("focusedQuestionId", questionId);
      localStorage.setItem("focusedOptionIndex", index);
      localStorage.setItem("cursorPosition", cursorPosition);
    }
  };
  useEffect(() => {
    const restoreCursorPosition = () => {
      const focusedQuestionId = localStorage.getItem("focusedQuestionId");
      const focusedOptionIndex = localStorage.getItem("focusedOptionIndex");
      const cursorPosition = localStorage.getItem("cursorPosition");

      if (focusedQuestionId && focusedOptionIndex && cursorPosition !== null) {
        const input = inputRefs.current[focusedOptionIndex];
        if (input && question.id === focusedQuestionId) {
          input.focus();
          input.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    };

    restoreCursorPosition();

    window.addEventListener("beforeunload", () =>
      saveCursorPosition(question.id, -1)
    );

    return () => {
      window.removeEventListener("beforeunload", () =>
        saveCursorPosition(question.id, -1)
      );
    };
  }, [question.id]);

  const handleOptionChange = (index, value) => {
    const options = [...question.options];
    options[index] = value || ""; // Ensure value is never null
    onChange({ ...question, options });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      addOptionAtIndex(index);
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      }, 0);
      e.preventDefault();
    }
  };

  const removeOption = (index) => {
    const options = question.options.filter((_, i) => i !== index);
    onChange({ ...question, options });
  };

  return (
    <div className="multiple-choice-question">
      {question.options.map((option, index) => (
        <div className="option" key={index}>
          <svg
            width="18.5"
            height="18.5"
            className="option-dnd-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18.5 18.5"
          >
            <circle cx="5.5" cy="3.5" r="1" />
            <circle cx="5.5" cy="9.25" r="1" />
            <circle cx="5.5" cy="15" r="1" />
            <circle cx="13" cy="3.5" r="1" />
            <circle cx="13" cy="9.25" r="1" />
            <circle cx="13" cy="15" r="1" />
          </svg>

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
            value={option || ""} // Ensure value is never null
            onChange={(e) => handleOptionChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder={`Option ${index + 1}`}
            variant="variant1"
          />

          <ButtonDefault
            onClick={() => removeOption(index)}
            variant="variant2"
            title="Remove Choice"
          >
            <GoX />
          </ButtonDefault>
        </div>
      ))}
      <div
        className="option"
        onClick={() => addOptionAtIndex(question.options.length - 1)}
        style={{ cursor: "pointer" }}
      >
        <svg
          width="18.5"
          height="18.5"
          className="option-dnd-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18.5 18.5"
        >
          <circle cx="5.5" cy="3.5" r="1" />
          <circle cx="5.5" cy="9.25" r="1" />
          <circle cx="5.5" cy="15" r="1" />
          <circle cx="13" cy="3.5" r="1" />
          <circle cx="13" cy="9.25" r="1" />
          <circle cx="13" cy="15" r="1" />
        </svg>

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
          type="text"
          disabled
          placeholder="Create another option"
          style={{ pointerEvents: "none" }}
          variant="variant1"
        />
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
