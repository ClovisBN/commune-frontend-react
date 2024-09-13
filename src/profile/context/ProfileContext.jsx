import React, { createContext, useState } from "react";
import {
  fetchProfileService,
  updateProfileService,
} from "../../services/profileService";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    if (!profile) {
      const fetchedProfile = await fetchProfileService();
      setProfile(fetchedProfile);
    }
  };

  const updateProfile = async (updatedData) => {
    await updateProfileService(updatedData);
    setProfile(updatedData); // Mettre à jour le profil dans le state sans avoir besoin de le recharger
  };

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
