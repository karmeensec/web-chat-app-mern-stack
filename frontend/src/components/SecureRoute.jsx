import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const SecureRoute = ({ children }) => {
  const { authenticate } = useSelector((state) => state.auth);

  const isAuthenticated = authenticate ? (
    children
  ) : (
    <Navigate to="/messenger/login" />
  );

  return isAuthenticated;
};

export default SecureRoute;
