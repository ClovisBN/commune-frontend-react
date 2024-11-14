import React from "react";
import InputField from "../../../../shared/components/InputComponents/InputField";

const HeadingLevel1 = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-heading-level-1">
      <InputField
        type="textarea"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Level 1 Heading"
        variant="variant4 HeadingLevel1"
        disabled={false}
      />
    </div>
  );
};

export default HeadingLevel1;
