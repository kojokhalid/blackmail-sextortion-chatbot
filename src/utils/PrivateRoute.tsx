// PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext"; // Adjust path if necessary

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authTokens } = useAuthContext(); // Access the auth context

  if (!authTokens) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
