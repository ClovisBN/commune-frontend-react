// Templates.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchDocuments,
  createDocument,
  deleteDocument,
} from "../services/documentService";
import Card from "../shared/components/CardComponents/Card";
import { v4 as uuidv4 } from "uuid";

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

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const newDocument = await createDocument({
        name: "untitled-form",
        description: "Add Description",
        questions: [
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

      if (newDocument.id) {
        navigate(`/survey/${newDocument.id}`);
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
    <div className="layout-content-commune">
      <div className="grid-column document-list">
        {documents.map((doc) => (
          <Card
            key={doc.id}
            document={doc}
            onDelete={() => handleDelete(doc.id)}
          />
        ))}
      </div>
      <div className="grid-column">
        <button onClick={handleCreate} disabled={isCreating}>
          {isCreating ? "Creating Document..." : "Create Document"}
        </button>
      </div>
    </div>
  );
};

export default Templates;
