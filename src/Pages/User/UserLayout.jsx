import React from "react";
import { Outlet } from "react-router-dom";
import MainSideBarUser from "../../components/NavbarComponents/MainSideBarUser";

const UserLayout = () => {
  return (
    <div>
      <main>
        <MainSideBarUser />

        <div className="container-scroll-element">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
