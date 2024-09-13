import React from "react";
import SideBarToggle from "../../sideBar/components/SideBarToggle"; // Le bouton toggle de la sidebar
import CreateButton from "./CreateButton"; // Un bouton fictif pour "create"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <SideBarToggle />
        <CreateButton />
      </div>
      <div className="navbar-center">
        <input type="text" className="navbar-input" placeholder="Search..." />
      </div>
      <div className="navbar-right">
        <button className="navbar-btn">Another Button</button>
      </div>
    </div>
  );
};

export default Navbar;
