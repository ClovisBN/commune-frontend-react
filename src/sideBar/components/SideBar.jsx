import React from "react";
import BtnProfile from "./BtnProfile";
import ResizableSideBar from "./ResizableSideBar";

const SideBar = ({ links, user }) => {
  return (
    <ResizableSideBar>
      <div className="sidebare">
        <div className="top-link-content-Sidebar">
          <ul className="top-btn-sidebar">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <BtnProfile user={user} />
      </div>
    </ResizableSideBar>
  );
};

export default SideBar;
