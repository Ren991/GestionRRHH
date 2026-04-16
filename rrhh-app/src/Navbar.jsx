import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // o token
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo / Nombre */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          RRHH App
        </Typography>

        {/* Botones */}
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}