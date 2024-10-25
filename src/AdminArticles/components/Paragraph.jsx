import React from "react";

const Paragraph = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-paragraph">
      <textarea
        className=".input-element"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter paragraph text"
        rows="4"
      />
    </div>
  );
};

export default Paragraph;
