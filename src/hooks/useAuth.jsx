import { useState, useEffect } from "react";
import api from "../services/Api";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    loading: true,
  });

  useEffect(() => {
    const checkTokenValidity = () => {
      const expiry = localStorage.getItem("access_token_expiry");
      if (expiry && Date.now() > expiry) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_expiry");
        return false;
      }
      return true;
    };

    const fetchUserRole = async () => {
      if (!checkTokenValidity()) {
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          loading: false,
        });
        return;
      }

      try {
        const response = await api.get("/user-info");
        setAuthState({
          isAuthenticated: true,
          userRole: response.data.role,
          loading: false,
        });
      } catch (error) {
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
