// useMultipleChoiceActions.js
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useMultipleChoiceActions = (question, onChange) => {
  const inputRefs = useRef([]);

  const handleOptionChange = (index, value) => {
    const options = [...question.options];
    options[index].text = value || "";
    onChange({ ...question, options });
  };

  const handleAddOption = () => {
    const newOption = { id: uuidv4(), text: "Nouvelle option" };
    const newOptions = [...question.options, newOption];
    onChange({ ...question, options: newOptions });
  };

  const removeOption = (id) => {
    const updatedOptions = question.options.filter(
      (option) => option.id !== id
    );
    onChange({ ...question, options: updatedOptions });
  };

  return {
    inputRefs,
    handleOptionChange,
    handleAddOption,
    removeOption,
  };
};

export default useMultipleChoiceActions;
