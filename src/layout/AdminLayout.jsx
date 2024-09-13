import React from "react";
import Navbar from "../navbar/components/Navbar";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../sideBar/components/SideBarAdmin";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
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
