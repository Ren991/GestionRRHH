import { Box, Typography } from "@mui/material";
import VacanteForm from "../components/VacanteForm";

export default function CrearVacantePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Crear Nueva Vacante
      </Typography>

      <VacanteForm />
    </Box>
  );
}