// /auth/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  login,
  fetchUserInfo,
  logout as logoutService,
  register as registerService,
} from "../../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userName: null,
    loading: true,
  });

  const fetchUserRole = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setAuthState({
        isAuthenticated: false,
        userRole: null,
        userName: null,
        loading: false,
      });
      return;
    }

    try {
      const userInfo = await fetchUserInfo();
      setAuthState({
        isAuthenticated: true,
        userRole: userInfo.role,
        userName: userInfo.name,
        loading: false,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur",
        error
      );
      setAuthState({
        isAuthenticated: false,
        userRole: null,
        userName: null,
        loading: false,
      });
      localStorage.removeItem("access_token");
    }
  };

  // Fonction générique pour gérer la connexion
  const handleAuthentication = async (data, navigate) => {
    try {
      localStorage.setItem("access_token", data.access_token); // Stockage du token
      setAuthState({
        isAuthenticated: true,
        userRole: data.user.role,
        userName: data.user.name,
        loading: false,
      });
      navigate("/documents"); // Redirection après connexion ou inscription
    } catch (error) {
      console.error("Erreur d'authentification", error);
      throw error;
    }
  };

  // Utiliser cette fonction dans le cas du login
  const handleLogin = async (email, password, navigate) => {
    try {
      const data = await login(email, password); // Appel API pour la connexion
      await handleAuthentication(data, navigate); // Gestion commune de l'authentification
    } catch (error) {
      console.error("Échec de la connexion", error);
      throw error;
    }
  };

  // Utiliser cette fonction pour le register
  const handleRegister = async (registerData, navigate) => {
    try {
      const data = await registerService(registerData); // Appel API pour l'inscription
      await handleAuthentication(data, navigate); // Gestion commune de l'authentification après inscription
    } catch (error) {
      console.error("Échec de l'inscription", error);
      throw error;
    }
  };

  const handleLogout = async (navigate) => {
    await logoutService();
    setAuthState({
      isAuthenticated: false,
      userRole: null,
      userName: null,
      loading: false,
    });
    navigate("/login");
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      fetchUserRole();
    }
  }, [authState.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
