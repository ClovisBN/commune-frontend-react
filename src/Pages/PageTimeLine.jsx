// PageSurveyAnswar.jsx
import React from "react";
import Navbar from "../Navigation/navbar/components/Navbar";
import TimeLine from "./TimelineView";
import { useWindowWidth } from "../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageSurveyAnswar = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // Seuil de largeur pour les tablettes en pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        // <Navbar customContent={<ArticlePreviewNavbar />} />
        <Navbar />
      )}
      <main className="main-content-commune">
        <TimeLine />
      </main>
    </div>
  );
};

export default PageSurveyAnswar;
