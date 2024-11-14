// UserForm.jsx
import React, { useState, useEffect } from "react";
import {
  createUser,
  fetchUserById,
  updateUser,
} from "../../services/userService";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const { id } = useParams(); // id peut être 'new' ou un ID d'utilisateur
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: 2, // Rôle 'user' par défaut
  });

  const [roles, setRoles] = useState([]); // Rôles à récupérer du backend

  useEffect(() => {
    // Récupérer les rôles du backend
    const loadRoles = async () => {
      // Vous pouvez créer un service pour récupérer les rôles depuis le backend
      // Pour simplifier, nous utilisons des rôles codés en dur ici
      const rolesData = [
        { id: 1, role_name: "admin" },
        { id: 2, role_name: "user" },
      ];
      setRoles(rolesData);
    };

    loadRoles();
  }, []);

  useEffect(() => {
    if (id && id !== "new") {
      // Récupérer les données de l'utilisateur pour la modification
      const loadUser = async () => {
        const user = await fetchUserById(id, navigate);
        if (user) {
          setUserData({
            name: user.name,
            email: user.email,
            password: "", // Ne pas afficher le mot de passe
            role_id: user.role_id,
          });
        }
      };

      loadUser();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id && id !== "new") {
        // Mettre à jour l'utilisateur
        const dataToUpdate = { ...userData };
        if (!dataToUpdate.password) {
          delete dataToUpdate.password; // Ne pas envoyer le mot de passe s'il est vide
        }
        await updateUser(id, dataToUpdate, navigate);
        alert("Utilisateur mis à jour avec succès");
      } else {
        // Créer un nouvel utilisateur
        await createUser(userData, navigate);
        alert("Utilisateur créé avec succès");
      }
      navigate("/users");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'utilisateur :", error);
    }
  };

  return (
    <div className="user-form">
      <h1>
        {id && id !== "new"
          ? "Modifier l'utilisateur"
          : "Ajouter un utilisateur"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder={
              id && id !== "new"
                ? "Laisser vide pour conserver le mot de passe actuel"
                : ""
            }
            required={!id || id === "new"} // Le mot de passe est requis lors de la création
          />
        </div>

        <div>
          <label>Rôle :</label>
          <select
            name="role_id"
            value={userData.role_id}
            onChange={handleChange}
            required
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          {id && id !== "new"
            ? "Mettre à jour l'utilisateur"
            : "Créer l'utilisateur"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
