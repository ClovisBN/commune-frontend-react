// MultipleChoiceQuestion.js
import React, { useRef } from "react";
import DraggableList from "../../shared/components/DraggableList";
import InputField from "../../shared/components/InputComponents/InputField";
import ButtonDefault from "../../shared/components/ButtonComponents/ButtonDefault";
import { GoX } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";

const MultipleChoiceQuestion = ({ question, onChange }) => {
  const inputRefs = useRef([]);

  const handleOptionChange = (index, value) => {
    const options = [...question.options];
    options[index].text = value || "";
    onChange({ ...question, options });
  };

  const handleAddOption = () => {
    const newOption = { id: uuidv4(), text: "Nouvelle option" };
    const newOptions = [...question.options, newOption];
    onChange({ ...question, options: newOptions });
  };

  const removeOption = (id) => {
    const updatedOptions = question.options.filter(
      (option) => option.id !== id
    );
    onChange({ ...question, options: updatedOptions });
  };

  const handleReorderOptions = (newOptions) => {
    onChange({ ...question, options: newOptions });
  };

  return (
    <div className="multiple-choice-question">
      <DraggableList
        items={question.options}
        onItemsReordered={handleReorderOptions}
        renderItem={(
          option,
          index,
          { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging }
        ) => (
          <div
            className="option"
            key={option.id}
            data-id={option.id}
            ref={setNodeRef}
            style={{
              opacity: isDragging ? 0 : 1,
            }}
          >
            {/* Poignée de drag */}
            <div
              className="drag-handle"
              ref={setActivatorNodeRef}
              {...listeners}
              {...attributes}
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
            </div>

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
              variant="variant1"
            />

            <ButtonDefault
              onClick={() => removeOption(option.id)}
              variant="variant2"
              title="Remove Choice"
            >
              <GoX />
            </ButtonDefault>
          </div>
        )}
      />

      <div
        className="option"
        onClick={handleAddOption}
        style={{ cursor: "pointer", padding: "0 0 0 30px" }}
      >
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
