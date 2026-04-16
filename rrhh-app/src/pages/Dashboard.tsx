import {
  Box,
  Typography,
  Button,
  Grid,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FDF4FF, #EDE9FE)",
        p: 4
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#6D28D9" }}
        >
          Panel RRHH
        </Typography>

        <Button
          variant="contained"
/*           startIcon={<AddIcon />}
 */          sx={{
            background: "linear-gradient(90deg, #A78BFA, #F9A8D4)",
            borderRadius: 3,
            px: 3,
            fontWeight: "bold"
          }}
            onClick={() => navigate("/admin/vacantes/create")}

        >
          Nueva Vacante
        </Button>

        <Button
          variant="contained"
/*           startIcon={<AddIcon />}
 */          sx={{
            background: "linear-gradient(90deg, #A78BFA, #F9A8D4)",
            borderRadius: 3,
            px: 3,
            fontWeight: "bold"
          }}
            onClick={() => navigate("/admin/vacantes")}

        >
         Listado Vacantes
        </Button>
      </Box>

      {/* BIENVENIDA */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "#4C1D95"
        }}
      >
        Bienvenida 👋
      </Typography>

      <Typography sx={{ mb: 4, color: "gray" }}>
        Gestioná tus vacantes y postulaciones de forma simple
      </Typography>

      {/* CARDS */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)"
            }}
          >
            <Typography variant="h6">Vacantes activas</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
              12
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)"
            }}
          >
            <Typography variant="h6">Postulaciones</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
              45
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(10px)"
            }}
          >
            <Typography variant="h6">Nuevos hoy</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
              5
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}