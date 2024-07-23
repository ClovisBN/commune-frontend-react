import React from "react";
import SelectQuestionType from "./SelectQuestionType";
import QuestionFooter from "./QuestionFooter";
import "./QuestionUI.css";

const UnifiedQuestion = ({
  question,
  onChange,
  onDelete,
  onDuplicate,
  onToggleRequired,
  isSelected,
}) => {
  const handleTextChange = (text) => {
    onChange({ ...question, text });
  };

  const handleTypeChange = (type) => {
    onChange({ ...question, type });
  };

  const handleOptionChange = (index, value) => {
    const options = [...question.options];
    options[index] = value;
    onChange({ ...question, options });
  };

  const addOption = () => {
    onChange({ ...question, options: [...question.options, ""] });
  };

  const removeOption = (index) => {
    const options = question.options.filter((_, i) => i !== index);
    onChange({ ...question, options });
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <input
          type="text"
          value={question.text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Enter your question"
        />
        <SelectQuestionType
          currentType={question.type}
          onTypeChange={handleTypeChange}
        />
      </div>
      {question.type === "multiple-choice" && (
        <div className="multiple-choice-question">
          {question.options.map((option, index) => (
            <div className="option" key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <button onClick={() => removeOption(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addOption}>Add Option</button>
        </div>
      )}
      {question.type === "short-answer" && (
        <div className="short-answer-question">
          <input type="text" placeholder="Short answer text" disabled />
        </div>
      )}
      {question.type === "date" && (
        <div className="date-question">
          <input
            type="date"
            value={question.date || ""}
            onChange={(e) => onChange({ ...question, date: e.target.value })}
          />
        </div>
      )}
      {question.type === "time" && (
        <div className="time-question">
          <input
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
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <button onClick={() => removeOption(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addOption}>Add Option</button>
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
