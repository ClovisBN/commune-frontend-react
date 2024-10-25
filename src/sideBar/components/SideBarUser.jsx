import React from "react";
import SideBar from "./SideBar";

const userLinks = [
  { label: "Documents", path: "/documents" },
  { label: "News", path: "/News" },
  { label: "Articles", path: "/articles" },
];

const SideBarUser = () => {
  return (
    <SideBar
      links={userLinks}
      user={{ name: "John Doe", email: "john.doe@example.com" }}
    />
  );
};

export default SideBarUser;
