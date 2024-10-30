// TemplateListDocuments.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDocuments } from "../services/documentService";
import { fetchArticles } from "../services/articleService";
import UserCardItem from "../shared/components/CardComponents/UserCardItem";

// Fonction pour obtenir une chaîne lisible pour les dates
const formatDate = (dateString, groupBy) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  const dayBeforeYesterday = new Date();

  yesterday.setDate(today.getDate() - 1);
  dayBeforeYesterday.setDate(today.getDate() - 2);

  if (groupBy === "day") {
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else if (date.toDateString() === dayBeforeYesterday.toDateString()) {
      return "Avant-hier";
    } else {
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  } else if (groupBy === "month") {
    return date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  } else if (groupBy === "year") {
    return date.getFullYear().toString();
  }
};

// Fonction pour grouper et trier les items (documents et articles) par date de création
const groupItemsByDate = (items, sortOrder, groupBy) => {
  const grouped = items.reduce((acc, item) => {
    const dateLabel = formatDate(item.created_at, groupBy);

    if (!acc[dateLabel]) {
      acc[dateLabel] = [];
    }
    acc[dateLabel].push(item);
    return acc;
  }, {});

  // Trier les groupes de dates selon l'ordre spécifié
  return Object.keys(grouped)
    .sort((a, b) => {
      const dateA = new Date(grouped[a][0].created_at);
      const dateB = new Date(grouped[b][0].created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    })
    .reduce((acc, date) => {
      acc[date] = grouped[date];
      return acc;
    }, {});
};

const TemplateListDocuments = ({ filterType, sortOrder, groupBy }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const [documents, articles] = await Promise.all([
          fetchDocuments(),
          fetchArticles(),
        ]);

        const documentsWithType = documents.map((doc) => ({
          ...doc,
          type: "document",
        }));
        const articlesWithType = articles.map((article) => ({
          ...article,
          type: "article",
        }));

        const combinedItems = [...documentsWithType, ...articlesWithType];
        setItems(combinedItems);
        setFilteredItems(combinedItems);
      } catch (error) {
        console.error("Error fetching documents and articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    // Filtrer les éléments en fonction du type sélectionné
    if (filterType === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.type === filterType));
    }
  }, [filterType, items]);

  const handleView = (item) => {
    if (item.type === "document") {
      navigate(`/survey/${item.id}/edit`);
    } else if (item.type === "article") {
      navigate(`/articles/${item.id}/edit`);
    }
  };

  if (loading) return <div>Loading...</div>;

  const groupedItems = groupItemsByDate(filteredItems, sortOrder, groupBy);

  return (
    <div className="grid-column">
      {Object.keys(groupedItems).length > 0 ? (
        Object.keys(groupedItems).map((date) => (
          <div key={date} className="items-groups">
            <h4>{date}</h4>
            <div className="item-group">
              {groupedItems[date].map((item) => (
                <UserCardItem
                  key={item.id}
                  item={item}
                  onView={() => handleView(item)}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No documents or articles found.</p>
      )}
    </div>
  );
};

export default TemplateListDocuments;
