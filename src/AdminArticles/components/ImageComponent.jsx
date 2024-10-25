// ImageComponent.jsx
import React from "react";

const ImageComponent = ({ url, onChange }) => {
  return (
    <div className="create-arcticle-component-image">
      <input
        className=".input-element"
        type="text"
        value={url || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter image URL"
      />
      <img src={url} alt="Article content" style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default ImageComponent;
