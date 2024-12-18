import React from "react";
import BtnProfile from "./BtnProfile";
import ResizableSideBar from "./ResizableSideBar";
import { SideBarToggle } from "./SideBarToggle";
import CreateSurveyButton from "../../../shared/components/ButtonComponents/CreateSurveyButton";

const SideBar = ({ links, user }) => {
  return (
    <ResizableSideBar>
      <div className="sidebare">
        <div className="top-link-content-Sidebar">
          <div className="top-sidebar-accont-param">
            <div className="top-btn-sidebar-item">
              <BtnProfile user={user} />
              <div className="cont-btn-top-sidebar">
                <div className="sidebar-toggle">
                  <SideBarToggle />
                </div>
                <div className="sidebar-create-document">
                  <CreateSurveyButton />
                </div>
              </div>
            </div>
          </div>
          <ul className="top-btn-sidebar">
            {links.map((link, index) => (
              <li className="top-btn-sidebar-item" key={index}>
                <a href={link.path}>
                  {" "}
                  <svg viewBox="0 0 20 20">
                    <path d="M10.1416 3.77299C10.0563 3.71434 9.94368 3.71434 9.85837 3.77299L3.60837 8.06989C3.54053 8.11653 3.5 8.19357 3.5 8.2759V14.2499C3.5 14.9402 4.05964 15.4999 4.75 15.4999H7.5L7.5 10.7499C7.5 10.0595 8.05964 9.49987 8.75 9.49987H11.25C11.9404 9.49987 12.5 10.0595 12.5 10.7499L12.5 15.4999H15.25C15.9404 15.4999 16.5 14.9402 16.5 14.2499V8.2759C16.5 8.19357 16.4595 8.11653 16.3916 8.06989L10.1416 3.77299ZM9.00857 2.53693C9.60576 2.12636 10.3942 2.12636 10.9914 2.53693L17.2414 6.83383C17.7163 7.1603 18 7.69963 18 8.2759V14.2499C18 15.7687 16.7688 16.9999 15.25 16.9999H12.25C11.5596 16.9999 11 16.4402 11 15.7499L11 10.9999H9L9 15.7499C9 16.4402 8.44036 16.9999 7.75 16.9999H4.75C3.23122 16.9999 2 15.7687 2 14.2499V8.2759C2 7.69963 2.2837 7.1603 2.75857 6.83383L9.00857 2.53693Z"></path>
                  </svg>{" "}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ResizableSideBar>
  );
};

export default SideBar;
