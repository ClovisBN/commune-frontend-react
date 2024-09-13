import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default React.memo(PrivateRoute);
