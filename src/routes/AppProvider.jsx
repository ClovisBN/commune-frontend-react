import React from "react";
import { AuthProvider } from "../auth/context/AuthContext";
import { SideBarProvider } from "../sideBar/context/SideBarContext";
import { ProfileProvider } from "../profile/context/ProfileContext";

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ProfileProvider>
      <SideBarProvider>{children}</SideBarProvider>
    </ProfileProvider>
  </AuthProvider>
);

export default AppProvider;
