import React, { useEffect, useState } from "react";
import api from "./Api"; // Assurez-vous que le chemin est correct
import { Link, useNavigate } from "react-router-dom";

const Templates = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      <ul>
        {documents &&
          documents.map((doc) => (
            <li key={doc.id}>
              <Link to={`/documents/${doc.id}`}>{doc.name}</Link>
            </li>
          ))}
      </ul>
      <button onClick={createDocument}>Create Document</button>
    </div>
  );
};

export default Templates;
