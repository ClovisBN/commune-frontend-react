// DocumentHeader.jsx
import React from "react";
import InputField from "./InputComponents/InputField";

const DocumentHeaderEdit = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  titlePlaceholder = "Document Title",
  descriptionPlaceholder = "Document Description",
  variant = "variant3",
  disabled = false,
}) => {
  return (
    <div className="document-header-container-edit">
      <InputField
        type="textarea"
        name="documentTitle"
        value={title || ""}
        onChange={onTitleChange}
        placeholder={titlePlaceholder}
        variant={variant}
        disabled={disabled}
      />
      <InputField
        type="textarea"
        name="documentDescription"
        value={description || ""}
        onChange={onDescriptionChange}
        placeholder={descriptionPlaceholder}
        variant={variant}
        disabled={disabled}
      />
    </div>
  );
};

export default DocumentHeaderEdit;
