import { useState } from "react";
import { login } from "../services/authService";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);

      // ✅ REDIRECCIÓN AL DASHBOARD
      navigate("/admin");

    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        alert("Credenciales incorrectas");
      } else {
        alert("Error al iniciar sesión");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FDF4FF, #EDE9FE)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.85)"
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#7C3AED" }}
            >
              RRHH Portal
            </Typography>

            <Typography variant="body2" sx={{ color: "gray" }}>
              Gestión de Vacantes
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              background: "linear-gradient(90deg, #A78BFA, #F9A8D4)",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
            onClick={handleLogin}
          >
            Ingresar
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}