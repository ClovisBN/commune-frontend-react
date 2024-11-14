// QuestionUI.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSurvey from "../../../../hooks/useSurvey"; // Assurez-vous que le hook s'appelle 'useSurvey'
import DocumentHeaderEdit from "../../../../shared/components/document/DocumentHeaderEdit";
import DocumentStatusMessage from "../../../../shared/components/document/DocumentStatusMessage";
import AddComponentButton from "../../../../shared/components/document/AddComponentButton";
import UnifiedComponent from "../../../../shared/components/document/UnifiedComponent";
import useQuestionActions from "./useQuestionActions";

const QuestionUI = () => {
  const { id } = useParams();
  const [hoveredGapIndex, setHoveredGapIndex] = useState(null);

  const {
    survey,
    setSurvey,
    selectedQuestionId,
    setSelectedQuestionId,
    updateQuestions,
  } = useSurvey(id);

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
              ? rect.top - containerRect.top - 44
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

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="layout-content-commune container-scroll-element"
      style={{ position: "relative", overflowY: "auto" }}
    >
      <div className="grid-column cont-form-doc">
        <DocumentHeaderEdit
          title={survey.title_survey}
          description={survey.description_survey}
          onTitleChange={(e) =>
            setSurvey({ ...survey, title_survey: e.target.value })
          }
          onDescriptionChange={(e) =>
            setSurvey({ ...survey, description_survey: e.target.value })
          }
          titlePlaceholder="Titre du formulaire"
          descriptionPlaceholder="Description du formulaire"
          variant="variant3"
          disabled={false}
        />

        <DocumentStatusMessage
          status={survey.status_id === 1 ? "unpublished" : "published"}
          documentType="formulaire"
        />

        {/* Affichage des questions avec gaps */}
        <div className="question-list">
          {/* Gap avant la première question */}
          <div
            className="component-gap"
            onMouseEnter={() => setHoveredGapIndex(0)}
            onMouseLeave={() => setHoveredGapIndex(null)}
          >
            <div className="cont-component-gap">
              {hoveredGapIndex === 0 && (
                <AddComponentButton onClick={() => addQuestionAtIndex(0)} />
              )}
            </div>
          </div>

          {survey.content_survey.map((question, index) => (
            <React.Fragment key={question.id}>
              <div
                id={`question-${question.id}`}
                className={`question-wrapper ${
                  selectedQuestionId === question.id ? "selected" : ""
                }`}
                onClick={() => setSelectedQuestionId(question.id)}
              >
                <UnifiedComponent
                  item={question}
                  onChange={(updatedQuestion) =>
                    setSurvey((prevState) => ({
                      ...prevState,
                      content_survey: prevState.content_survey.map((q) =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                      ),
                    }))
                  }
                  onDelete={() => handleDeleteQuestion(question.id)}
                  onDuplicate={() => handleDuplicateQuestion(question)}
                  isSurvey={true}
                  toggleRequired={() => {
                    const updatedQuestion = {
                      ...question,
                      isRequired: !question.isRequired,
                    };
                    setSurvey((prevState) => ({
                      ...prevState,
                      content_survey: prevState.content_survey.map((q) =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                      ),
                    }));
                  }}
                  onTypeChange={(newType) => {
                    const updatedQuestion = { ...question, type: newType };
                    setSurvey((prevState) => ({
                      ...prevState,
                      content_survey: prevState.content_survey.map((q) =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                      ),
                    }));
                  }}
                />
              </div>
              {/* Gap après chaque question */}
              <div
                className="component-gap"
                onMouseEnter={() => setHoveredGapIndex(index + 1)}
                onMouseLeave={() => setHoveredGapIndex(null)}
              >
                <div className="cont-component-gap">
                  {hoveredGapIndex === index + 1 && (
                    <AddComponentButton
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
