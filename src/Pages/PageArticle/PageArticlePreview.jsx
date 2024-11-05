// PageSurveyAnswar.jsx
import React from "react";
import Navbar from "../../Navigation/navbar/components/Navbar";
import ArticlePreviewNavbar from "../../Navigation/navbar/components/ArticlePreviewNavbar";
import ArticlePreview from "../../Article/ArticlePreview/ArticlePreview";
import { useWindowWidth } from "../../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageSurveyAnswar = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // Seuil de largeur pour les tablettes en pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        <Navbar customContent={<ArticlePreviewNavbar />} />
      )}
      <main className="main-content-commune">
        <ArticlePreview />
      </main>
    </div>
  );
};

export default PageSurveyAnswar;
