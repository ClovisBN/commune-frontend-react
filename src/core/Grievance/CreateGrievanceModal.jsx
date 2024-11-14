// src/grievance/CreateGrievanceModal.jsx
import React, { useState } from "react";

const CreateGrievanceModal = ({ onCreate, onClose }) => {
  const [title_grievance, setTitle] = useState("");

  const handleCreate = () => {
    if (title_grievance) {
      onCreate(title_grievance);
      setTitle(""); // Réinitialiser le champ
      onClose(); // Fermer le modal après création
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Créer une doléance</h2>
        <input
          type="text"
          placeholder="Titre de la doléance"
          value={title_grievance}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Créer</button>
        <button onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
};

export default CreateGrievanceModal;
