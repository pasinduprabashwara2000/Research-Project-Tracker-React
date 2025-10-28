import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, roles } = useContext(AuthContext);

    if (!token) return <Navigate to="/login" replace />;

    const hasAccess = roles.some((role) => allowedRoles.includes(role));
    if (!hasAccess) return <Navigate to="/unauthorized" replace />;

    return children;
};

export default ProtectedRoute;
