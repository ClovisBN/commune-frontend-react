import React from "react";

const UserCardSurvey = ({ document, onView }) => {
  return (
    <div className="user-card-survey" onClick={() => onView(document.id)}>
      <div className="user-header-card-survey">
        <h3>{document.name}</h3>
      </div>
      <p>{document.description}</p>
    </div>
  );
};

export default UserCardSurvey;
