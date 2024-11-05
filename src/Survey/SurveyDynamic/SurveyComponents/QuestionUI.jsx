// QuestionUI.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDocument from "../../../hooks/useDocument";
import DocumentHeaderEdit from "../../../shared/components/DocumentHeaderEdit"; // Import du composant partagé
import DocumentStatusMessage from "../../../shared/components/DocumentStatusMessage"; // Import du nouveau composant
import AddComponentButton from "../../../shared/components/AddComponentButton"; // Import du composant générique
import UnifiedComponent from "../../../shared/components/UnifiedComponent"; // Utiliser le nouveau composant
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

  if (!doc) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="layout-content-commune container-scroll-element"
      style={{ position: "relative", overflowY: "auto" }}
    >
      <div className="grid-column cont-form-doc">
        <DocumentHeaderEdit
          title={doc.name}
          description={doc.description}
          onTitleChange={(e) => setDoc({ ...doc, name: e.target.value })}
          onDescriptionChange={(e) =>
            setDoc({ ...doc, description: e.target.value })
          }
          titlePlaceholder="Document Name"
          descriptionPlaceholder="Document Description"
          variant="variant3"
          disabled={false}
        />

        {/* Ajout du composant DocumentStatusMessage */}
        <DocumentStatusMessage
          status={doc.status || "unpublished"}
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

          {doc.questions.map((question, index) => (
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
                    setDoc((prevState) => ({
                      ...prevState,
                      questions: prevState.questions.map((q) =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                      ),
                    }))
                  }
                  onDelete={() => handleDeleteQuestion(question.id)}
                  onDuplicate={() => handleDuplicateQuestion(question)}
                  isSurvey={true} // Indique qu'il s'agit d'un survey
                  toggleRequired={() => {
                    // Fonction pour basculer 'isRequired'
                    const updatedQuestion = {
                      ...question,
                      isRequired: !question.isRequired,
                    };
                    setDoc((prevState) => ({
                      ...prevState,
                      questions: prevState.questions.map((q) =>
                        q.id === updatedQuestion.id ? updatedQuestion : q
                      ),
                    }));
                  }}
                  onTypeChange={(newType) => {
                    const updatedQuestion = { ...question, type: newType };
                    setDoc((prevState) => ({
                      ...prevState,
                      questions: prevState.questions.map((q) =>
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
