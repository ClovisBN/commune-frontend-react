// Navbar.jsx
import React from "react";
import SideBarToggle from "../../sideBar/components/SideBarToggle"; // Le bouton toggle de la sidebar

const Navbar = ({ customContent }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <SideBarToggle />
      </div>
      <div className="navbar-center">{customContent}</div>
    </div>
  );
};

export default Navbar;
