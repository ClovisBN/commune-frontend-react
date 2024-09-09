import React from "react";
import InputField from "../InputComponents/InputField";

const CheckboxQuestion = ({ question, onChange }) => {
  return (
    <div className="checkbox-question">
      {question.options.map((option, index) => (
        <div className="option" key={index}>
          <InputField
            type="text"
            value={option}
            onChange={(e) => {
              const options = [...question.options];
              options[index] = e.target.value;
              onChange({ ...question, options });
            }}
            placeholder={`Option ${index + 1}`}
          />
        </div>
      ))}
      <button
        onClick={() =>
          onChange({ ...question, options: [...question.options, ""] })
        }
      >
        Add Option
      </button>
    </div>
  );
};

export default CheckboxQuestion;
