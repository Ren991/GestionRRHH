import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Divider
} from "@mui/material";
import { getVacanteById } from "../../../services/vacanteService";

export default function VacantePublicPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vacante, setVacante] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVacante();
  }, [id]);

  const fetchVacante = async () => {
    setLoading(true);
    try {
      const data = await getVacanteById(id!);
      setVacante(data);
    } catch (error) {
      console.error("Error al obtener vacante:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ❌ NOT FOUND
  if (!vacante) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white"
        }}
      >
        <Typography variant="h5">
          Vacante no encontrada
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          p: 5,
          backgroundColor: "#0b1220",
          color: "white"
        }}
      >
        {/* HEADER */}
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
          {vacante.titulo}
        </Typography>

        <Typography sx={{ color: "#94a3b8", mb: 3 }}>
          📍 {vacante.ubicacion}
        </Typography>

        {/* TAGS */}
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <Chip
            label={vacante.seniority}
            sx={{
              backgroundColor: "#6366f1",
              color: "white",
              fontWeight: "bold"
            }}
          />

          <Chip
            label={vacante.activa ? "Activa" : "Cerrada"}
            sx={{
              backgroundColor: vacante.activa ? "#22c55e" : "#ef4444",
              color: "white",
              fontWeight: "bold"
            }}
          />
        </Box>

        <Divider sx={{ mb: 3, backgroundColor: "#1f2937" }} />

        {/* DESCRIPCIÓN */}
        <Typography
          sx={{
            whiteSpace: "pre-line",
            color: "#cbd5e1",
            lineHeight: 1.8,
            fontSize: 16,
            mb: 4
          }}
        >
          {vacante.descripcion}
        </Typography>

        {/* FOOTER CTA */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#475569",
              color: "#cbd5e1",
              textTransform: "none"
            }}
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>

          <Button
            variant="contained"
            size="large"
            disabled={!vacante.activa}
            onClick={() => navigate(`/vacantes/${id}/postular`)}
            sx={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                opacity: 0.9
              }
            }}
          >
            Postularme
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}