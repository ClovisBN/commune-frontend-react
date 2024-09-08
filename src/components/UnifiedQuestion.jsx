import React, { useRef, useEffect } from "react";
import QuestionHeader from "./QuestionHeader";
import QuestionFooter from "./QuestionFooter";
import InputField from "./InputComponents/InputField";
import ButtonDefault from "./ButtonComponents/ButtonDefault";
import { GoX } from "react-icons/go";

const UnifiedQuestion = ({
  question,
  onChange,
  onDelete,
  onDuplicate,
  onToggleRequired,
  isSelected,
}) => {
  const inputRefs = useRef([]); // Refs pour chaque input d'option

  // Ajoute une option à l'index spécifié
  const addOptionAtIndex = (index) => {
    const updatedOptions = [
      ...question.options.slice(0, index + 1),
      "",
      ...question.options.slice(index + 1),
    ];
    onChange({ ...question, options: updatedOptions });
  };

  // Place automatiquement le curseur sur la dernière option ajoutée
  useEffect(() => {
    if (inputRefs.current[question.options.length - 1]) {
      inputRefs.current[question.options.length - 1].focus();
    }
  }, [question.options.length]);

  // Gestion du changement d'option
  const handleOptionChange = (index, value) => {
    const options = [...question.options];
    options[index] = value;
    onChange({ ...question, options });
  };

  // Gestion de la touche "Enter" pour ajouter une nouvelle option
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      console.log("dssvdsdvds");
      addOptionAtIndex(index);
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      }, 0);
      e.preventDefault();
    }
  };

  // Suppression d'une option
  const removeOption = (index) => {
    const options = question.options.filter((_, i) => i !== index);
    onChange({ ...question, options });
  };

  return (
    <div className="question-container">
      <QuestionHeader
        text={question.text}
        type={question.type}
        onTextChange={(text) => onChange({ ...question, text })}
        onTypeChange={(type) => onChange({ ...question, type })}
      />
      {question.type === "multiple-choice" && (
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
                name="input-option"
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)} // Vérifie que ça fonctionne ici
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
      )}
      {question.type === "short-answer" && (
        <div className="short-answer-question">
          <InputField type="text" placeholder="Short answer text" disabled />
        </div>
      )}
      {question.type === "date" && (
        <div className="date-question">
          <InputField
            type="date"
            value={question.date || ""}
            onChange={(e) => onChange({ ...question, date: e.target.value })}
          />
        </div>
      )}
      {question.type === "time" && (
        <div className="time-question">
          <InputField
            type="time"
            value={question.time || ""}
            onChange={(e) => onChange({ ...question, time: e.target.value })}
          />
        </div>
      )}
      {question.type === "checkbox" && (
        <div className="checkbox-question">
          {question.options.map((option, index) => (
            <div className="option" key={index}>
              <InputField
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <button onClick={() => removeOption(index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addOptionAtIndex(question.options.length - 1)}>
            Add Option
          </button>
        </div>
      )}
      {isSelected && (
        <QuestionFooter
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onToggleRequired={onToggleRequired}
          isRequired={question.isRequired}
        />
      )}
    </div>
  );
};

export default UnifiedQuestion;
