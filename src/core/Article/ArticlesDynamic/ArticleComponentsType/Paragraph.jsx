import React from "react";
import InputField from "../../../../shared/components/InputComponents/InputField";

const Paragraph = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-paragraph">
      <InputField
        type="textarea"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter paragraph text"
        variant="variant4 Paragraph"
        disabled={false}
      />
    </div>
  );
};

export default Paragraph;
