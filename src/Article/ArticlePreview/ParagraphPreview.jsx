// ParagraphPreview.jsx
import React from "react";

const ParagraphPreview = ({ content }) => {
  return (
    <div className="cont-component-article-preview">
      <p className="paragraph-preview">{content}</p>{" "}
    </div>
  );
};

export default ParagraphPreview;
