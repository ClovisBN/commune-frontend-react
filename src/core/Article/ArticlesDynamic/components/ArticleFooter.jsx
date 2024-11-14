// ArticleFooter.jsx
import React from "react";
import DocumentFooter from "../../../shared/components/document/DocumentFooter";

const ArticleFooter = ({
  onDelete,
  onDuplicate,
  currentType,
  onTypeChange,
}) => {
  // Options pour les types de composants d'article
  const componentTypes = [
    { label: "Heading 1", value: "heading1" },
    { label: "Heading 2", value: "heading2" },
    { label: "Paragraph", value: "paragraph" },
    { label: "Quote", value: "quote" },
    { label: "Image", value: "image" },
    { label: "List", value: "list" },
  ];

  return (
    <DocumentFooter
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      currentType={currentType}
      onTypeChange={onTypeChange}
      selectOptions={componentTypes}
      selectClassName="cont-select-component-type-article"
    />
  );
};

export default ArticleFooter;
