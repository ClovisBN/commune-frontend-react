// QuestionUI.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocument from "../../hooks/useDocument";
import InputField from "../../shared/components/InputComponents/InputField";
import AddQuestionButton from "./AddQuestionButton";
import UnifiedQuestion from "./UnifiedQuestion";
import useQuestionActions from "./useQuestionActions"; // Importation du hook

const QuestionUI = () => {
  const { id } = useParams();
  const [hoveredGapIndex, setHoveredGapIndex] = useState(null);

  const {
    doc,
    setDoc,
    selectedQuestionId,
    setSelectedQuestionId,
    updateQuestions,
  } = useDocument(id);
  const { addQuestionAtIndex, handleDeleteQuestion, handleDuplicateQuestion } =
    useQuestionActions(
      selectedQuestionId,
      setSelectedQuestionId,
      updateQuestions
    );

  useEffect(() => {
    const currentFormRef = document.querySelector(".container-scroll-element");

    const scrollToSelectedQuestion = () => {
      const selectedElement = document.getElementById(
        `question-${selectedQuestionId}`
      );
      if (selectedElement && currentFormRef) {
        const rect = selectedElement.getBoundingClientRect();
        const containerRect = currentFormRef.getBoundingClientRect();

        if (
          rect.top < containerRect.top ||
          rect.bottom > containerRect.bottom
        ) {
          const offset =
            rect.top < containerRect.top
              ? rect.top - containerRect.top
              : rect.bottom - containerRect.bottom;

          currentFormRef.scrollTo({
            top: currentFormRef.scrollTop + offset,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToSelectedQuestion();
  }, [selectedQuestionId]);

  if (!doc) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="layout-content-commune container-scroll-element"
      style={{ position: "relative", overflowY: "auto" }}
    >
      <div className="grid-column cont-form-doc">
        <div className="survey-header-contnaire">
          <InputField
            type="textarea"
            name="documentName"
            value={doc.name}
            onChange={(e) => setDoc({ ...doc, name: e.target.value })}
            placeholder="Document Name"
            variant="variant3"
          />
          <InputField
            type="textarea"
            name="documentDescription"
            value={doc.description}
            onChange={(e) => setDoc({ ...doc, description: e.target.value })}
            placeholder="Document Description"
            variant="variant3"
          />
        </div>

        {/* Affichage des questions avec gaps */}
        <div className="question-list">
          {/* Gap avant la première question */}
          <div
            className="question-gap"
            onMouseEnter={() => setHoveredGapIndex(0)}
            onMouseLeave={() => setHoveredGapIndex(null)}
          >
            <div className="cont-question-gap">
              {hoveredGapIndex === 0 && (
                <AddQuestionButton onClick={() => addQuestionAtIndex(0)} />
              )}
            </div>
          </div>

          {doc.questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <div
                id={`question-${question.id}`}
                className={`question-wrapper ${
                  selectedQuestionId === question.id ? "selected" : ""
                }`}
                onClick={() => setSelectedQuestionId(question.id)}
              >
                <UnifiedQuestion
                  question={question}
                  onChange={(updatedQuestion) =>
                    setDoc((prevState) => ({
                      ...prevState,
                      questions: prevState.questions.map((q) =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                      ),
                    }))
                  }
                  onDelete={() => handleDeleteQuestion(question.id)}
                  onDuplicate={() => handleDuplicateQuestion(question)}
                  isSelected={selectedQuestionId === question.id}
                />
              </div>
              {/* Gap après chaque question */}
              <div
                className="question-gap"
                onMouseEnter={() => setHoveredGapIndex(index + 1)}
                onMouseLeave={() => setHoveredGapIndex(null)}
              >
                <div className="cont-question-gap">
                  {hoveredGapIndex === index + 1 && (
                    <AddQuestionButton
                      onClick={() => addQuestionAtIndex(index + 1)}
                    />
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionUI;
