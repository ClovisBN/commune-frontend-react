// shared/AdminArticleCard.jsx
import React from "react";

const AdminArticleCard = ({ article, onView, onDelete }) => {
  return (
    <div className="admin-article-card">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <button onClick={() => onView(article.id)}>View</button>
      <button onClick={() => onDelete(article.id)}>Delete</button>
    </div>
  );
};

export default AdminArticleCard;
