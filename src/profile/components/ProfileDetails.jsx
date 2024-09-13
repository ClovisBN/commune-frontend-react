import React, { useContext, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";

const ProfileDetails = () => {
  const { profile, fetchProfile } = useContext(ProfileContext);

  useEffect(() => {
    // Ne pas appeler fetchProfile si le profil est déjà chargé
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile Details</h2>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
};

export default ProfileDetails;
