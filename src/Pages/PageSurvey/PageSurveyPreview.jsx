// PageSurveyPreview.jsx
import React from "react";
import Navbar from "../../Navigation/navbar/components/Navbar";
import SurveyPreviewNavbar from "../../Navigation/navbar/components/SurveyPreviewNavbar";
import SurveyPreview from "../../core/Survey/SurveyPreview/SurveyPreview";
import { useWindowWidth } from "../../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageSurveyPreview = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // Seuil de largeur pour les tablettes en pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        <Navbar customContent={<SurveyPreviewNavbar />} />
      )}
      <main className="main-content-commune">
        <SurveyPreview />
      </main>
    </div>
  );
};

export default PageSurveyPreview;
