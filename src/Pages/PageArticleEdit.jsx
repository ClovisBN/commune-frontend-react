// PageArticleEdit.jsx
import React from "react";
import Navbar from "../navbar/components/Navbar";
import AdminArticleBuilder from "../AdminArticles/AdminArticleBuilder";

const PageArticleEdit = () => {
  return (
    <div className="page-documents">
      <Navbar />
      <main className="main-content-commune">
        <AdminArticleBuilder />
      </main>
    </div>
  );
};

export default PageArticleEdit;
