import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDocuments } from "../services/documentService";
import UserCardSurvey from "../shared/components/CardComponents/UserCardSurvey";

// Fonction pour grouper et trier les documents par date de création
const groupDocumentsByDate = (documents) => {
  const grouped = documents.reduce((acc, doc) => {
    const date = new Date(doc.created_at)
      .toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(doc);
    return acc;
  }, {});

  // Trier les groupes de dates du plus récent au plus ancien
  return Object.keys(grouped)
    .sort(
      (a, b) =>
        new Date(b.split(".").reverse().join("-")) -
        new Date(a.split(".").reverse().join("-"))
    )
    .reduce((acc, date) => {
      acc[date] = grouped[date];
      return acc;
    }, {});
};

const UserTemplateListSurvey = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleView = (id) => {
    navigate(`/documents/${id}/answer`);
  };

  if (loading) return <div>Loading...</div>;

  const groupedDocuments = groupDocumentsByDate(documents);

  return (
    <div className="user-template-list-survey">
      {Object.keys(groupedDocuments).length > 0 ? (
        Object.keys(groupedDocuments).map((date) => (
          <div key={date} className="document-group">
            <h4>{date}</h4>
            {groupedDocuments[date].map((doc) => (
              <UserCardSurvey key={doc.id} document={doc} onView={handleView} />
            ))}
          </div>
        ))
      ) : (
        <p>No documents found.</p>
      )}
    </div>
  );
};

export default UserTemplateListSurvey;
