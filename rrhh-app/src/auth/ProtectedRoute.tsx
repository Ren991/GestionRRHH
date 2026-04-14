import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  return children;
};