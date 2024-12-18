// ArticleEditNavbar.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArticleEditNavbar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSave = () => {
    navigate("/admin/documents"); // Naviguer vers la page précédente après l'enregistrement
  };

  const handlePreview = () => {
    navigate(`/admin/article/${id}/preview`);
  };

  return (
    <div className="survey-actions">
      <button onClick={handleSave} className="button-default save-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <path
            d="m28.426 93.523-25.582-83.754c-1.3516-4.4297 2.9297-8.5 7.2852-6.9258l83.574 30.242c4.8203 1.7422 4.9766 8.5039 0.24609 10.469l-37.543 15.605-17.578 35.23c-2.2695 4.543-8.918 3.9883-10.402-0.86719z"
            transform="rotate(90, 50, 50)"
          />
        </svg>
        Sauvegarder
      </button>
      <button onClick={handlePreview} className="button-default preview-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <g>
            <path d="M59.4887893,49.8151186 C59.4887893,55.0558637 55.2399321,59.3030949 50.000813,59.3030949 C44.7600679,59.3030949 40.5112107,55.0558637 40.5112107,49.8151186 C40.5112107,44.5743735 44.7600679,40.3271423 50.000813,40.3271423 C55.2399321,40.3271423 59.4887893,44.5743735 59.4887893,49.8151186 M49.999187,67.7812969 C40.0770565,67.7812969 32.0330087,59.7372491 32.0330087,49.8151186 C32.0330087,39.8929881 40.0770565,31.8489404 49.999187,31.8489404 C59.9229435,31.8489404 67.9669913,39.8929881 67.9669913,49.8151186 C67.9669913,59.7372491 59.9229435,67.7812969 49.999187,67.7812969 M50.000813,23 C25.1467055,23 5,49.6834089 5,49.6834089 C5,49.6834089 25.1467055,76.6302372 50.000813,76.6302372 C74.8532945,76.6302372 95,49.6834089 95,49.6834089 C95,49.6834089 74.8532945,23 50.000813,23" />
          </g>
        </svg>
        Previsualiser
      </button>
    </div>
  );
};

export default ArticleEditNavbar;
