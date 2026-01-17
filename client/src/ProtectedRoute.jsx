import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "./auth";

const ProtectedRoute = ({ children, admin }) => {
  if (admin) {
    return isAdmin() ? children : <Navigate to="/admin" replace />;
  }
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
