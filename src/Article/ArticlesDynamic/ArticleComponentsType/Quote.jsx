import React from "react";
import InputField from "../../../shared/components/InputComponents/InputField";

const Quote = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-quote">
      <InputField
        type="textarea"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter quote text"
        variant="variant4 Quote"
        disabled={false}
      />
    </div>
  );
};

export default Quote;
