import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Etat pour collapse

  const toggleSideBar = () => {
    setIsCollapsed(!isCollapsed); // Basculer entre collapse et expand
  };

  return (
    <SideBarContext.Provider value={{ isCollapsed, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => useContext(SideBarContext);
