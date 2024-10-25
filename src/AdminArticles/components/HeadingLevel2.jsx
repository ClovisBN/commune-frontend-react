import React from "react";

const HeadingLevel2 = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-heading-level-2">
      <input
        className=".input-element"
        type="text"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Level 2 Heading"
      />
    </div>
  );
};

export default HeadingLevel2;
