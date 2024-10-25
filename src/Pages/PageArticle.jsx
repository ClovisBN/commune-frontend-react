// PageArticle.jsx
import React from "react";
import Navbar from "../navbar/components/Navbar";
import PageArticleBuilder from "../AdminArticles/AdminArticleBuilder";

const PageArticle = () => {
  return (
    <div className="page-documents">
      <Navbar />
      <main className="main-content-commune">
        <PageArticleBuilder />
      </main>
    </div>
  );
};

export default PageArticle;
