import React from "react";
import { useResizableSideBar } from "../../hooks/useResizableSideBar";
import { useSideBar } from "../context/SideBarContext";

const ResizableSideBar = ({ children }) => {
  const { isCollapsed } = useSideBar();
  const { width, dragging, handleMouseDown } = useResizableSideBar();

  return (
    <div
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      style={{
        width: isCollapsed ? "0px" : `${width}px`,
        transition: dragging ? "none" : "width 0.25s ease-out",
      }}
    >
      <div
        className="sub-sidebar"
        style={{
          flex: `0 0 ${width}px`,
        }}
      >
        {children}
      </div>
      <div
        className="resize-handle"
        onMouseDown={handleMouseDown}
        style={{
          width: "4px",
          cursor: "col-resize",
          zIndex: "99999",
        }}
      />
    </div>
  );
};

export default ResizableSideBar;
