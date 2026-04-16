import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { CircularProgress, Box } from "@mui/material";

export function PublicRoute({ children }: any) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <Navigate to="/admin" />;
  }

  return children;
}