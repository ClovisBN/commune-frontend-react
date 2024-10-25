import React from "react";
import { Outlet } from "react-router-dom";
import SideBarUser from "../sideBar/components/SideBarUser";

const UserLayout = () => {
  return (
    <div>
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
