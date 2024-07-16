import React from "react";

const MultiChoice = ({ register, index }) => {
  return (
    <div>
      <label>Choix Multiple:</label>
      <input
        type="text"
        {...register(`questions[${index}].question`)}
        placeholder="Question"
      />
      <div>
        <input
          type="checkbox"
          {...register(`questions[${index}].options.option1`)}
        />
        <label>Option 1</label>
      </div>
      <div>
        <input
          type="checkbox"
          {...register(`questions[${index}].options.option2`)}
        />
        <label>Option 2</label>
      </div>
      <div>
        <input
          type="checkbox"
          {...register(`questions[${index}].options.option3`)}
        />
        <label>Option 3</label>
      </div>
    </div>
  );
};

export default MultiChoice;
