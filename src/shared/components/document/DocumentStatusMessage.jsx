// shared/components/DocumentStatusMessage.jsx
import React from "react";

const DocumentStatusMessage = ({ status, documentType }) => {
  let message = "";

  if (status === "unpublished") {
    message = `Seuls les membres appartenant à l’administration peuvent modifier ce ${documentType}.`;
  } else if (status === "published") {
    message = `Le ${documentType} n'est plus modifiable. Seuls les membres appartenant à l’administration peuvent supprimer ce ${documentType}.`;
  }

  return (
    <div className="document-status-message">
      <svg viewBox="0 0 16 16" className="svg-private">
        <path d="M4.69141 14.6338H11.3018C12.2178 14.6338 12.6689 14.1826 12.6689 13.1914V8.08496C12.6689 7.18945 12.293 6.72461 11.541 6.64941V4.96094C11.541 2.36328 9.81152 1.1123 7.99316 1.1123C6.18164 1.1123 4.45215 2.36328 4.45215 4.96094V6.67676C3.74805 6.78613 3.32422 7.2373 3.32422 8.08496V13.1914C3.32422 14.1826 3.77539 14.6338 4.69141 14.6338ZM5.75098 4.83105C5.75098 3.22461 6.76953 2.35645 7.99316 2.35645C9.2168 2.35645 10.2422 3.22461 10.2422 4.83105V6.64258L5.75098 6.64941V4.83105Z"></path>
      </svg>
      <p>{message}</p>
    </div>
  );
};

export default DocumentStatusMessage;
