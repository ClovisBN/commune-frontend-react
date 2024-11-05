// SurveyPreview.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDocumentById } from "../../services/documentService";
import DocumentHeaderPreview from "../../shared/components/DocumentHeaderPreview";
import DateQuestionSurveyPreview from "./DateQuestionSurveyPreview";
import MultipleChoiceSurveyPreview from "./MultipleChoiceSurveyPreview";
import ShortAnswerSurveyPreview from "./ShortAnswerSurveyPreview";
import TimeQuestionSurveyPreview from "./TimeQuestionSurveyPreview";

const SurveyPreview = () => {
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
    <div className="layout-content-commune container-scroll-element">
      <div className="grid-column gape24">
        <DocumentHeaderPreview
          title={document.name}
          description={document.description}
        />

        {document.questions.map((question) => {
          switch (question.type) {
            case "date":
              return (
                <DateQuestionSurveyPreview
                  key={question.id}
                  question={question}
                />
              );
            case "multiple-choice":
              return (
                <MultipleChoiceSurveyPreview
                  key={question.id}
                  question={question}
                />
              );
            case "short-answer":
              return (
                <ShortAnswerSurveyPreview
                  key={question.id}
                  question={question}
                />
              );
            case "time":
              return (
                <TimeQuestionSurveyPreview
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

export default SurveyPreview;
