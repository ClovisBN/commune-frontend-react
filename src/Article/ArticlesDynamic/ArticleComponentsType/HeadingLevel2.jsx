import React from "react";
import InputField from "../../../shared/components/InputComponents/InputField";

const HeadingLevel2 = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-heading-level-2">
      <InputField
        type="textarea"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Level 2 Heading"
        variant="variant4 HeadingLevel2"
        disabled={false}
      />
    </div>
  );
};

export default HeadingLevel2;
