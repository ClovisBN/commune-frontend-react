import React from "react";

const HeadingLevel1 = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-heading-level-1">
      <input
        className=".input-element"
        type="text"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Level 1 Heading"
      />
    </div>
  );
};

export default HeadingLevel1;
