import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Templates = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get("http://localhost:8000/api/documents");
      setDocuments(response.data);
    };

    fetchDocuments();
  }, []);

  const createDocument = async () => {
    const response = await axios.post("http://localhost:8000/api/documents", {
      name: "untitled-form",
      description: "Add Description",
      questions: [],
    });
    navigate(`/documents/${response.data.id}`);
  };

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map((doc) => (
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
