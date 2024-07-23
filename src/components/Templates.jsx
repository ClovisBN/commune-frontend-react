import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import api from "./Api"; // Assurez-vous que le chemin est correct
import { Link, useNavigate } from "react-router-dom";
import DocumentPreview from "./DocumentPreview"; // Importez la composante
import { toPng } from "html-to-image";

const Templates = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previews, setPreviews] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/documents");
        setDocuments(response.data.data); // Assuming the API response contains the documents in response.data.data
      } catch (error) {
        setError(error);
        console.error("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const generatePreviews = async () => {
      const newPreviews = {};
      for (const doc of documents) {
        const previewElement = document.createElement("div");
        document.body.appendChild(previewElement);

        ReactDOM.render(<DocumentPreview document={doc} />, previewElement);

        const dataUrl = await toPng(previewElement);
        newPreviews[doc.id] = dataUrl;

        document.body.removeChild(previewElement);
      }
      setPreviews(newPreviews);
    };

    if (documents.length > 0) {
      generatePreviews();
    }
  }, [documents]);

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
        navigate("/login"); // Redirect to login if the token is expired
      } else {
        console.error("Failed to create document", error);
      }
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
      <h1>Documents</h1>
      <div className="document-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <h2>{doc.name}</h2>
            <p>Created on: {new Date(doc.created_at).toLocaleDateString()}</p>
            {previews[doc.id] ? (
              <img src={previews[doc.id]} alt={`${doc.name} preview`} />
            ) : (
              <div>Loading preview...</div>
            )}
            <Link to={`/documents/${doc.id}`}>Edit Document</Link>
          </div>
        ))}
      </div>
      <button onClick={createDocument}>Create Document</button>
    </div>
  );
};

export default Templates;
