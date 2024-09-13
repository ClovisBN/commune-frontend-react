import React from "react";
import InputField from "../../shared/components/InputComponents/InputField";

const TimeQuestion = ({ question, onChange }) => {
  return (
    <div className="time-question">
      <InputField
        type="time"
        value={question.time || ""}
        onChange={(e) => onChange({ ...question, time: e.target.value })}
      />
    </div>
  );
};

export default TimeQuestion;
