// ImagePreview.jsx
import React from "react";

const ImagePreview = ({ content }) => {
  return (
    <div className="cont-component-article-preview">
      <img className="image-preview" src={content} alt="Article Image" />{" "}
    </div>
  );
};

export default ImagePreview;
