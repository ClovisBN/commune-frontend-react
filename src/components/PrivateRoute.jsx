import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ allowedRoles }) => {
  const jwtToken = localStorage.getItem("jwt_token");

  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(jwtToken);
    const userRole = decodedToken.role || "";

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    console.error("Token decoding failed:", error);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
