import { useRef } from "react";
import html2canvas from "html2canvas";
import api from "../services/api";

export const useScreenshot = () => {
  const formRef = useRef(null);

  const takeScreenshot = async (
    doc,
    documentId,
    redirectToPreview,
    navigate
  ) => {
    try {
      let screenshot = null;
      if (formRef.current) {
        const canvas = await html2canvas(formRef.current);
        screenshot = canvas.toDataURL("image/png");
      }

      await api.put(`/documents/${documentId}`, { ...doc, screenshot });
      localStorage.removeItem(`document-${documentId}`);

      if (redirectToPreview) {
        navigate(`/documents/preview/${documentId}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Your token expired");
        navigate("/login");
      } else {
        console.error("Error saving document:", error);
      }
    }
  };

  return { formRef, takeScreenshot };
};
