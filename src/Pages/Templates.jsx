import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchDocuments,
  createDocument,
  deleteDocument,
} from "../services/documentService";
import Card from "../shared/components/CardComponents/Card";

const Templates = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des documents", error);
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  // Remplace l'ancienne fonction handleCreate par celle-ci
  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const newDocument = await createDocument({
        name: "untitled-form",
        description: "Add Description",
        questions: [],
      });

      // Vérifie que l'ID est bien retourné avant la navigation
      if (newDocument.id) {
        navigate(`/documents/${newDocument.id}`);
      } else {
        throw new Error("Document ID is missing");
      }
    } catch (error) {
      console.error("Erreur lors de la création du document", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du document", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="document-list">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            document={doc}
            onDelete={() => handleDelete(doc.id)}
          />
        ))}
      </div>
      <button onClick={handleCreate} disabled={isCreating}>
        {isCreating ? "Creating Document..." : "Create Document"}
      </button>
    </div>
  );
};

export default Templates;
