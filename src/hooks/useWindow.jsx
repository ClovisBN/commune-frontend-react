// src/utils/useWindow.js

import { useState, useEffect } from "react";

const getWindowWidth = () => {
  return window.innerWidth;
};

// Hook pour obtenir la largeur de la fenêtre et l'actualiser en cas de redimensionnement
export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};
