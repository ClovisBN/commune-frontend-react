import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Attendre que l'authentification soit vérifiée

  if (!isAuthenticated) {
    console.log("User is not authenticated. Redirecting to login.");
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(userRole)) {
    console.log(
      "User does not have the required role. Redirecting to unauthorized."
    );
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
