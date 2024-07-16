import React from "react";

const QuestionLongue = ({ register }) => {
  return (
    <div>
      <label>Question Longue:</label>
      <textarea
        {...register("questionLongue")}
        placeholder="Réponse longue ici..."
      />
    </div>
  );
};

export default QuestionLongue;
