// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // 🚫 If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // ✅ Otherwise, allow access
  return children;
}
