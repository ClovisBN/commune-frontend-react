// src/profile/services/profileService.js
import api from "./Api";

// Récupérer le profil de l'utilisateur connecté
export const fetchProfileService = async () => {
  const response = await api.get("/profile");
  return response.data;
};

// Mettre à jour le profil de l'utilisateur connecté
export const updateProfileService = async (profileData) => {
  await api.put("/profile", profileData);
};
