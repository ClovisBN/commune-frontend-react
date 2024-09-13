import React from "react";
import SideBar from "./SideBar";

const adminLinks = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Manage Users", path: "/admin/users" },
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
