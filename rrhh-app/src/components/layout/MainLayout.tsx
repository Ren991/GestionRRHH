import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children }: any) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            RRHH App
          </Typography>

          <Box>
            <Button color="inherit" onClick={() => navigate("/admin")}>
              Inicio
            </Button>

            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* CONTENIDO */}
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </>
  );
}