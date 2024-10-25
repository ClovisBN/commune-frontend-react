// PageSurveyEdit.jsx
import React from "react";
import Navbar from "../navbar/components/Navbar";
import QuestionUI from "../dynamicForm/components/QuestionUI";

const PageSurveyEdit = () => {
  return (
    <div className="page-documents">
      <Navbar />
      <main className="main-content-commune">
        <QuestionUI />
      </main>
    </div>
  );
};

export default PageSurveyEdit;
