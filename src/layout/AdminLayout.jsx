import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../Navigation/sideBar/components/SideBarAdmin";

const AdminLayout = () => {
  return (
    <div>
      <div className="layout-container">
        <SideBarAdmin />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
