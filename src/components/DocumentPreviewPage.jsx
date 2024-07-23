import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./Api"; // Assurez-vous que le chemin est correct
import DocumentPreview from "./DocumentPreview";

const DocumentPreviewPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await api.get(`/documents/${id}`);
        setDocument(response.data);
      } catch (error) {
        setError(error);
        console.error("Failed to fetch document", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Document Preview</h1>
      {document ? (
        <DocumentPreview document={document} />
      ) : (
        <div>No document found</div>
      )}
    </div>
  );
};

export default DocumentPreviewPage;
