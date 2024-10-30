import React from "react";
import SideBar from "./SideBar";

const userLinks = [{ label: "Documents", path: "/Documents" }];

const SideBarUser = () => {
  return (
    <SideBar
      links={userLinks}
      user={{ name: "John Doe", email: "john.doe@example.com" }}
    />
  );
};

export default SideBarUser;
