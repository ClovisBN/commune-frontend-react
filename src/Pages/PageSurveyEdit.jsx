// PageSurveyEdit.jsx
import React from "react";
import Navbar from "../navbar/components/Navbar";
import AdminSurveyNavbarActions from "../navbar/components/AdminSurveyNavbarActions";
import QuestionUI from "../dynamicForm/components/QuestionUI";
import SurveyPreview from "../UserSurveyPreview/SurveyPreview";
import { useWindowWidth } from "../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageSurveyEdit = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // iPad width threshold in pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        <Navbar customContent={<AdminSurveyNavbarActions />} />
      )}
      <main className="main-content-commune">
        {isTabletOrBelow ? <SurveyPreview /> : <QuestionUI />}
      </main>
    </div>
  );
};

export default PageSurveyEdit;
