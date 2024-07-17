import React from "react";

const SelectQuestionType = ({ currentType, onTypeChange }) => {
  const handleChange = (e) => {
    onTypeChange(e.target.value);
  };

  return (
    <select value={currentType} onChange={handleChange}>
      <option value="multiple-choice">Multiple Choice</option>
      <option value="short-answer">Short Answer</option>
      <option value="date">Date</option>
      <option value="time">Time</option>
      <option value="checkbox">Checkbox</option>
    </select>
  );
};

export default SelectQuestionType;
