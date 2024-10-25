import React from "react";

const Quote = ({ content, onChange }) => {
  return (
    <div className="create-arcticle-component-quote">
      <textarea
        className=".input-element"
        value={content || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter quote text"
        rows="2"
      />
    </div>
  );
};

export default Quote;
