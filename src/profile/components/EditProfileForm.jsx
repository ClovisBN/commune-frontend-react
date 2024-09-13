import React, { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import InputField from "../../shared/components/InputComponents/InputField";

const EditProfileForm = () => {
  const { profile, updateProfile, fetchProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Ne pas appeler fetchProfile si le profil est déjà chargé
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  useEffect(() => {
    if (profile) {
      // Mettre à jour formData lorsque le profil est chargé
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      // Pas besoin de recharger le profil, car il sera automatiquement mis à jour dans le state
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <InputField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfileForm;
