import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("authToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Get user info

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userInfo?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
