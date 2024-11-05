// PageArticleEdit.jsx
import React from "react";
import Navbar from "../../Navigation/navbar/components/Navbar";
import ArticleEditNavbar from "../../Navigation/navbar/components/ArticleEditNavbar";
import AdminArticleBuilder from "../../Article/ArticlesDynamic/ArticleComponents/AdminArticleBuilder";
import { useWindowWidth } from "../../hooks/useWindow"; // Importer le hook de largeur de fenêtre
import ArticlePreview from "../../Article/ArticlePreview/ArticlePreview";

const PageArticleEdit = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // iPad width threshold in pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        <Navbar customContent={<ArticleEditNavbar />} />
      )}
      <main className="main-content-commune">
        {isTabletOrBelow ? <ArticlePreview /> : <AdminArticleBuilder />}
      </main>
    </div>
  );
};

export default PageArticleEdit;
