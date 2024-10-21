import React from "react";
import { useSideBar } from "../context/SideBarContext";
import { HiOutlineMenu } from "react-icons/hi";
import ButtonDefault from "../../shared/components/ButtonComponents/ButtonDefault";

const SideBarToggle = () => {
  const { toggleSideBar } = useSideBar();

  return (
    <ButtonDefault
      onClick={toggleSideBar}
      variant="variant4"
      title="Delete Question"
    >
      <HiOutlineMenu
        style={{ width: "20px", height: "20px", fill: "#9198a1" }}
      />
    </ButtonDefault>
  );
};

export default SideBarToggle;
