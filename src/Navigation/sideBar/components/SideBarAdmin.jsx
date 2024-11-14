import React from "react";
import SideBar from "./SideBar";

const adminLinks = [
  { label: "Documents", path: "/admin/documents" },
  { label: "Utilisateurs", path: "/admin/users" },
  { label: "Doléances", path: "/admin/grievances" },
];

const SideBarAdmin = () => {
  return (
    <SideBar
      links={adminLinks}
      user={{ name: "John Doe", email: "john.doe@example.com" }}
    />
  );
};

export default SideBarAdmin;
