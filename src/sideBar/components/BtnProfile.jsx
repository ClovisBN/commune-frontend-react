import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour redirection
import { logout } from "../../services/authService"; // Import du service logout

const BtnProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false); // Gère l'état du bouton (ouvert/fermé)
  const navigate = useNavigate(); // Pour rediriger après logout

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(navigate); // Appelle la fonction logout et passe navigate
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <div className="btn-profile-container">
      {/* Bouton principal */}
      <div className="btn-profile" onClick={toggleOpen}>
        <div className="profile-icon"></div>
        <div className="profile-info">
          <div className="user-email">{user.email}</div>
          <div className="user-name">{user.name}</div>
        </div>
        <div className={`arrow ${isOpen ? "up" : "down"}`}></div>
      </div>

      {/* Box qui apparaît lors du clic */}
      {isOpen && (
        <div className="profile-options">
          <div className="cont-profile-options">
            <button className="option-btn">Mon Profil</button>
            <button className="option-btn" onClick={handleLogout}>
              Se Déconnecter
            </button>
            <button className="option-btn">Paramètres</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnProfile;
