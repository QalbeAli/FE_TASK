import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";

interface RouteGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    requireAuth = false
}) => {
    const location = useLocation();

    // For now, we'll allow all routes
    // In the future, this can be used for authentication checks
    if (requireAuth) {
        // Add authentication logic here
        // return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <>{children}</>;
}; 