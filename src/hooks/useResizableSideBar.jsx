import { useState, useCallback, useEffect } from "react";

export const useResizableSideBar = (minWidth = 240, maxWidth = 300) => {
  const [width, setWidth] = useState(minWidth); // Largeur initiale
  const [dragging, setDragging] = useState(false); // État du redimensionnement
  const [mouseXPosition, setMouseXPosition] = useState(null); // Position de la souris
  const [lockResize, setLockResize] = useState(false); // Verrouiller le redimensionnement

  const disableTextSelection = () => {
    document.body.style.userSelect = "none";
  };

  const enableTextSelection = () => {
    document.body.style.userSelect = "";
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging) return;

      let deltaX = e.clientX - mouseXPosition;
      let newWidth = width + deltaX;

      if (newWidth < minWidth) {
        newWidth = minWidth;
        setLockResize(true);
      } else if (newWidth > maxWidth) {
        newWidth = maxWidth;
        setLockResize(true);
      } else {
        setLockResize(false);
      }

      if (
        !lockResize ||
        (newWidth === minWidth && deltaX > 0) ||
        (newWidth === maxWidth && deltaX < 0)
      ) {
        setWidth(newWidth);
        setMouseXPosition(e.clientX);
      }
    },
    [dragging, mouseXPosition, width, lockResize, minWidth, maxWidth]
  );

  const handleMouseDown = (e) => {
    setMouseXPosition(e.clientX);
    setDragging(true);
    disableTextSelection();
  };

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    enableTextSelection();
  }, []);

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  return {
    width,
    dragging,
    handleMouseDown,
  };
};
