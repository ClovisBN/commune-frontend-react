// PageSurveyEdit.jsx
import React from "react";
import Navbar from "../../Navigation/navbar/components/Navbar";
import UsersPreview from "../../core/user/UserList";
import { useWindowWidth } from "../../hooks/useWindow"; // Importer le hook de largeur de fenêtre

const PageSurveyEdit = () => {
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
        <UsersPreview />
      </main>
    </div>
  );
};

export default PageSurveyEdit;
