import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/navbar/components/Navbar";
import AdminNewsNavbar from "../Navigation/navbar/components/DocumentsNavbar";
import TemplateListDocuments from "./TemplateListDocuments";
import { fetchSurveys, createSurvey } from "../services/surveyService";
import { fetchArticles, createArticle } from "../services/articleService";
import { v4 as uuidv4 } from "uuid";

const PageDocuments = () => {
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [groupBy, setGroupBy] = useState("month");
  const [surveyCount, setSurveyCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [surveys, articles] = await Promise.all([
          fetchSurveys(),
          fetchArticles(),
        ]);
        setSurveyCount(surveys.length);
        setArticleCount(articles.length);
      } catch (error) {
        console.error("Error fetching documents and articles:", error);
      }
    };

    loadCounts();
  }, []);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleGroupChange = (group) => {
    setGroupBy(group);
  };

  const handleCreateSurvey = async () => {
    try {
      const newSurvey = await createSurvey({
        title_survey: "untitled-form",
        description_survey: "Add Description",
        content_survey: [
          {
            id: uuidv4(),
            type: "multiple-choice",
            text: "",
            options: [
              { id: uuidv4(), text: "Option 1" },
              { id: uuidv4(), text: "Option 2" },
            ],
            isRequired: false,
          },
        ],
      });

      if (newSurvey.id) {
        navigate(`/admin/survey/${newSurvey.id}/edit`);
      } else {
        throw new Error("Survey ID is missing");
      }
    } catch (error) {
      console.error("Erreur lors de la création du Survey", error);
    }
  };

  const handleCreateArticle = async () => {
    try {
      const newArticle = await createArticle({
        title_article: "Untitled Article",
        description_article: "Add Description",
        content_article: [{ id: uuidv4(), type: "paragraph", content: null }],
      });

      if (newArticle.id) {
        navigate(`/admin/article/${newArticle.id}/edit`);
      } else {
        throw new Error("Article ID is missing");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'article", error);
    }
  };

  return (
    <div className="page-documents">
      <Navbar
        customContent={
          <AdminNewsNavbar
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onGroupChange={handleGroupChange}
          />
        }
      />
      <main className="main-content-commune">
        <div className="layout-content-commune">
          <div className="title-document-cont grid-column">
            <div className="title-page-commune">Liste des documents</div>
            <div className="numeric-documents">
              Vous avez créé
              <span className="documentCount">
                {surveyCount} formulaires
              </span>{" "}
              et <span className="articleCount">{articleCount} articles</span>
            </div>
          </div>
          <div className="actions-buttons-documents grid-column">
            <div className="cont-action-button">
              <button
                onClick={handleCreateSurvey}
                className="action-button-document hover-action-survey"
              >
                <div className="title-action-button">Créer un formulaire</div>
              </button>
            </div>
            <div className="cont-action-button">
              <button
                onClick={handleCreateArticle}
                className="action-button-document hover-action-article"
              >
                <div className="title-action-button">Créer un article</div>
              </button>
            </div>
          </div>
          <TemplateListDocuments
            filterType={filterType}
            sortOrder={sortOrder}
            groupBy={groupBy}
          />
        </div>
      </main>
    </div>
  );
};

export default PageDocuments;
