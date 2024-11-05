// SideBarProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Utiliser useEffect pour synchroniser avec le localStorage lors du premier rendu
  useEffect(() => {
    const savedCollapsedState = JSON.parse(
      localStorage.getItem("sidebarCollapsed")
    );
    if (savedCollapsedState !== null) {
      setIsCollapsed(savedCollapsedState);
    }
  }, []);

  const toggleSideBar = () => {
    const newIsCollapsed = !isCollapsed;
    setIsCollapsed(newIsCollapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newIsCollapsed));
  };

  return (
    <SideBarContext.Provider value={{ isCollapsed, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => useContext(SideBarContext);
