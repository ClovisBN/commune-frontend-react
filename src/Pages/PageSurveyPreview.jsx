// PageSurveyAnswar.jsx
import React from "react";
import Navbar from "../navbar/components/Navbar";
import SurveyPreview from "../UserSurveyPreview/SurveyPreview";

const PageSurveyAnswar = () => {
  return (
    <div className="page-documents">
      <Navbar />
      <main className="main-content-commune">
        <SurveyPreview />
      </main>
    </div>
  );
};

export default PageSurveyAnswar;
