// SurveyAnswer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDocumentById } from "../services/documentService";
import DateQuestionSurveyAnswer from "../UserSurveyAnswer/DateQuestionSurveyAnswer";
import MultipleChoiceSurveyAnswer from "../UserSurveyAnswer/MultipleChoiceSurveyAnswer";
import ShortAnswerSurveyAnswer from "../UserSurveyAnswer/ShortAnswerSurveyAnswer";
import TimeQuestionSurveyAnswer from "../UserSurveyAnswer/TimeQuestionSurveyAnswer";

const SurveyAnswer = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const data = await fetchDocumentById(id);
        setDocument(data);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!document) return <div>Document not found</div>;

  return (
    <div className="survey-answer">
      <div className="survey-cont-answer">
        <h1>{document.name}</h1>
        <p>{document.description}</p>

        {document.questions.map((question) => {
          switch (question.type) {
            case "date":
              return (
                <DateQuestionSurveyAnswer
                  key={question.id}
                  question={question}
                />
              );
            case "multiple-choice":
              return (
                <MultipleChoiceSurveyAnswer
                  key={question.id}
                  question={question}
                />
              );
            case "short-answer":
              return (
                <ShortAnswerSurveyAnswer
                  key={question.id}
                  question={question}
                />
              );
            case "time":
              return (
                <TimeQuestionSurveyAnswer
                  key={question.id}
                  question={question}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default SurveyAnswer;
