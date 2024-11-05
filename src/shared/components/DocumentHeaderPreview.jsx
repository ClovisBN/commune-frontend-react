// shared/components/DocumentHeaderPreview.jsx
import React from "react";

const DocumentHeaderPreview = ({ title, description }) => {
  return (
    <div className="document-header-container-preview">
      <h1 className="title-header-preview">{title}</h1>
      <p className="description-header-preview">{description}</p>
    </div>
  );
};

export default DocumentHeaderPreview;
