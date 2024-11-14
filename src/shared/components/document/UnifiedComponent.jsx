// UnifiedComponent.jsx
import React from "react";
import DocumentFooter from "./DocumentFooter";
import componentTypes, {
  articleComponentTypes,
  surveyComponentTypes,
} from "./componentTypes";
import InputField from "../InputComponents/InputField";

const UnifiedComponent = ({
  item,
  onChange,
  onDelete,
  onDuplicate,
  onTypeChange,
  toggleRequired,
  isSurvey = false,
}) => {
  const Component = componentTypes[item.type];

  if (!Component) {
    return null;
  }

  const handleContentChange = (content) => {
    if (isSurvey) {
      onChange({ ...item, content_survey: content });
    } else {
      onChange({ ...item, content_article: content });
    }
  };

  return (
    <div className="container-unified-component">
      {isSurvey ? (
        <>
          <InputField
            type="textarea"
            value={item.text}
            onChange={(e) => onChange({ ...item, text: e.target.value })}
            placeholder="Question text"
            variant="variant3 header-question-survey"
          />
          <Component question={item} onChange={onChange} />
        </>
      ) : (
        <Component
          content={item.content_article}
          onChange={handleContentChange}
        />
      )}

      <DocumentFooter
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onToggleRequired={toggleRequired}
        currentType={item.type}
        onTypeChange={(newType) => onTypeChange(newType)}
        showRequiredToggle={isSurvey}
        selectOptions={isSurvey ? surveyComponentTypes : articleComponentTypes}
      />
    </div>
  );
};

export default UnifiedComponent;
