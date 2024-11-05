// PageSurveyEdit.jsx
import React from "react";
import Navbar from "../../Navigation/navbar/components/Navbar";
import SurveyEditNavbar from "../../Navigation/navbar/components/SurveyEditNavbar";
import QuestionUI from "../../Survey/SurveyDynamic/SurveyComponents/QuestionUI";
import SurveyPreview from "../../Survey/SurveyPreview/SurveyPreview";
import { useWindowWidth } from "../../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageSurveyEdit = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // iPad width threshold in pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        <Navbar customContent={<SurveyEditNavbar />} />
      )}
      <main className="main-content-commune">
        {isTabletOrBelow ? <SurveyPreview /> : <QuestionUI />}
      </main>
    </div>
  );
};

export default PageSurveyEdit;
