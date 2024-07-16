import React from "react";

const QuestionCourte = ({ register }) => {
  return (
    <div>
      <label>Question Courte:</label>
      <input
        {...register("questionCourte")}
        placeholder="Réponse courte ici..."
      />
    </div>
  );
};

export default QuestionCourte;
