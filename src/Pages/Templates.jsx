import React, { useEffect, useState } from "react";
import api from "../services/Api";
import { useNavigate } from "react-router-dom";
import Card from "../components/CardComponents/Card";

const Templates = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/documents");
        setDocuments(response.data.data);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const createDocument = async () => {
    try {
      const response = await api.post("/documents", {
        name: "untitled-form",
        description: "Add Description",
        questions: [],
      });
      navigate(`/documents/${response.data.id}`);
    } catch (error) {
      if (error.message === "Token expired") {
        console.log("Token expired, redirecting to login");
        navigate("/login");
      } else {
        console.error("Failed to create document", error);
      }
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await api.delete(`/documents/${id}`);
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Failed to delete document", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="document-list">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            document={doc}
            onDelete={() => handleDeleteDocument(doc.id)}
          />
        ))}
      </div>
      <button onClick={createDocument}>Create Document</button>
    </div>
  );
};

export default Templates;
