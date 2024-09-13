import React from "react";
import { useSideBar } from "../context/SideBarContext";
import { HiOutlineMenu } from "react-icons/hi";

const SideBarToggle = () => {
  const { toggleSideBar } = useSideBar();

  return (
    <div className="button-default sidebar-toggle" onClick={toggleSideBar}>
      <HiOutlineMenu />
    </div>
  );
};

export default SideBarToggle;
