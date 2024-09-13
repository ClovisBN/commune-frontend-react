import React from "react";
import { useLocation } from "react-router-dom";

const Unauthorized = () => {
  const location = useLocation();
  const message = location.state?.message || "Access Denied";

  return <div>{message}</div>;
};

export default Unauthorized;
