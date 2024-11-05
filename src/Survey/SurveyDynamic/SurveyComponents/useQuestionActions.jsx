// useQuestionActions.jsx
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useQuestionActions = (
  selectedQuestionId,
  setSelectedQuestionId,
  updateQuestions
) => {
  const [pendingAction, setPendingAction] = useState(null);

  const addQuestionAtIndex = (index) => {
    const newQuestion = {
      id: uuidv4(),
      type: "multiple-choice",
      text: "",
      options: [
        { id: uuidv4(), text: "Option 1" },
        { id: uuidv4(), text: "Option 2" },
      ],
      isRequired: false, // Initialiser isRequired à false
    };

    updateQuestions((questions) => [
      ...questions.slice(0, index),
      newQuestion,
      ...questions.slice(index),
    ]);

    setSelectedQuestionId(newQuestion.id);
  };

  const handleDeleteQuestion = (questionId) => {
    setPendingAction({ type: "delete", questionId });
  };

  const handleDuplicateQuestion = (question) => {
    setPendingAction({ type: "duplicate", question });
  };

  useEffect(() => {
    if (pendingAction) {
      if (pendingAction.type === "delete") {
        const { questionId } = pendingAction;

        updateQuestions((questions) => {
          const idx = questions.findIndex((q) => q.id === questionId);
          const newQuestions = questions.filter((q) => q.id !== questionId);

          if (selectedQuestionId === questionId) {
            let newSelectedQuestionIndex = idx > 0 ? idx - 1 : 0;

            if (newQuestions.length > 0) {
              setSelectedQuestionId(newQuestions[newSelectedQuestionIndex].id);
            } else {
              setSelectedQuestionId(null);
            }
          }

          return newQuestions;
        });
      } else if (pendingAction.type === "duplicate") {
        const { question } = pendingAction;
        const duplicatedQuestion = {
          ...question,
          id: uuidv4(),
          options: question.options.map((opt) => ({ ...opt, id: uuidv4() })),
        };

        updateQuestions((questions) => {
          const idx = questions.findIndex((q) => q.id === question.id);
          const newQuestions = [
            ...questions.slice(0, idx + 1),
            duplicatedQuestion,
            ...questions.slice(idx + 1),
          ];

          setSelectedQuestionId(duplicatedQuestion.id);
          return newQuestions;
        });
      }

      setPendingAction(null);
    }
  }, [
    pendingAction,
    updateQuestions,
    selectedQuestionId,
    setSelectedQuestionId,
  ]);

  return {
    addQuestionAtIndex,
    handleDeleteQuestion,
    handleDuplicateQuestion,
  };
};

export default useQuestionActions;
