import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSurveyById } from "../../../services/surveyService";
import DocumentHeaderPreview from "../../../shared/components/document/DocumentHeaderPreview";
import DateQuestionSurveyPreview from "./DateQuestionSurveyPreview";
import MultipleChoiceSurveyPreview from "./MultipleChoiceSurveyPreview";
import ShortAnswerSurveyPreview from "./ShortAnswerSurveyPreview";
import TimeQuestionSurveyPreview from "./TimeQuestionSurveyPreview";

const SurveyPreview = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        const data = await fetchSurveyById(id);
        setSurvey(data);
      } catch (error) {
        console.error("Error fetching survey:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!survey) return <div>Survey not found</div>;

  return (
    <div className="layout-content-commune container-scroll-element">
      <div className="grid-column gape24">
        <DocumentHeaderPreview
          title={survey.title_survey}
          description={survey.description_survey}
        />

        {survey.content_survey.map((question) => {
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
