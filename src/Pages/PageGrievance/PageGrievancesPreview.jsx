// PageSurveyEdit.jsx
import React from "react";
import Navbar from "../../Navigation/navbar/components/Navbar";
import GrievanceList from "../../core/Grievance/GrievanceList";
import { useWindowWidth } from "../../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageGrievancesPreview = () => {
  const windowWidth = useWindowWidth();
  const isTabletOrBelow = windowWidth <= 768; // iPad width threshold in pixels

  return (
    <div className="page-documents">
      {isTabletOrBelow ? (
        <Navbar />
      ) : (
        <Navbar />
        // <Navbar customContent={<SurveyEditNavbar />} />
      )}
      <main className="main-content-commune">
        <GrievanceList />
      </main>
    </div>
  );
};

export default PageGrievancesPreview;
