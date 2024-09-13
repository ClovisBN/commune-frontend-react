import React from "react";
import Navbar from "../navbar/components/Navbar";
import { Outlet } from "react-router-dom";
import SideBarUser from "../sideBar/components/SideBarUser";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="layout-container">
        <SideBarUser />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;