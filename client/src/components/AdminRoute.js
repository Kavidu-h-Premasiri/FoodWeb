import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem("adminLoggedIn"); // set after admin login
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}

export default AdminRoute;
