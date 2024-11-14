import React, { useEffect, useState } from "react";
import { fetchArticles } from "../services/articleService";
import { fetchSurveys } from "../services/surveyService";
import TimelineCardItem from "../shared/components/CardComponents/TimelineCardItem";

const TimelineView = ({ navigate }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const articles = await fetchArticles(navigate);
        const surveys = await fetchSurveys(navigate);

        // Ajouter le type pour chaque élément
        const allItems = [
          ...articles.map((article) => ({ ...article, type: "article" })),
          ...surveys.map((survey) => ({ ...survey, type: "survey" })),
        ];

        // Trier les éléments par date de création
        allItems.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setItems(allItems);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des articles et sondages",
          error
        );
      }
    };

    loadItems();
  }, [navigate]);

  return (
    <div className="layout-content-commune">
      <div className="grid-column">
        <h1 className="title-page-commune">Les nouvelles de la commune</h1>
      </div>

      <div className="grid-column timeline-view">
        <div className="timeline-items">
          {items.map((item) => (
            <TimelineCardItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
