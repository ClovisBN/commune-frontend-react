import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour redirection
import { logout } from "../../../services/authService"; // Import du service logout

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
      <div className="btn-profile" onClick={toggleOpen}>
        <div className="profile-icon"></div>
        <div className="profile-info">
          {/* <div className="user-email">{user.email}</div> */}
          <div className="user-name">{user.name}</div>
        </div>
        <svg viewBox="0 0 15 9" className={`arrow ${isOpen ? "up" : "down"}`}>
          <path d="M7.92188 8.65625C8.19531 8.64844 8.44531 8.54688 8.64844 8.32812L14.5859 2.25C14.7578 2.07812 14.8516 1.85938 14.8516 1.60156C14.8516 1.08594 14.4453 0.671875 13.9297 0.671875C13.6797 0.671875 13.4375 0.773438 13.2578 0.953125L7.92969 6.42969L2.58594 0.953125C2.40625 0.78125 2.17188 0.671875 1.91406 0.671875C1.39844 0.671875 0.992188 1.08594 0.992188 1.60156C0.992188 1.85938 1.08594 2.07812 1.25781 2.25L7.20312 8.32812C7.41406 8.54688 7.64844 8.65625 7.92188 8.65625Z"></path>
        </svg>
        {/* <div></div> */}
      </div>

      {/* Box qui apparaît lors du clic */}
      {isOpen && (
        <div className="profile-options">
          <div className="account-info-bulle">
            <div>{user.email}</div>
            <div>{user.name}</div>
          </div>
          <div className="cont-profile-options">
            <button className="option-btn">Profil</button>
            <button className="option-btn" onClick={handleLogout}>
              Déconnection
            </button>
            <button className="option-btn">Paramètres</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnProfile;
