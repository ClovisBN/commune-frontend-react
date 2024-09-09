import React from "react";
import InputField from "../InputComponents/InputField";

const DateQuestion = ({ question, onChange }) => {
  return (
    <div className="date-question">
      <InputField
        type="date"
        value={question.date || ""}
        onChange={(e) => onChange({ ...question, date: e.target.value })}
      />
    </div>
  );
};

export default DateQuestion;
