import { useState, useEffect } from "react";
import api from "../services/Api";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    loading: true, // Ajout de l'état de chargement
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get("/user-info");
        setAuthState({
          isAuthenticated: true,
          userRole: response.data.role,
          loading: false, // Marquer le chargement comme terminé
        });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          loading: false,
        });
      }
    };

    fetchUserRole();
  }, []);

  return authState;
};

export default useAuth;
