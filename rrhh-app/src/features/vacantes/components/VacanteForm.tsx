import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem
} from "@mui/material";
import Swal from "sweetalert2";
import { createVacante } from "../../../services/vacanteService";

export default function VacanteForm() {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "",
    seniority: ""
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    return (
      form.titulo.trim() &&
      form.descripcion.trim() &&
      form.ubicacion.trim() &&
      form.seniority.trim()
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios",
        confirmButtonColor: "#A78BFA"
      });
      return;
    }

    try {
      await createVacante(form);

      Swal.fire({
        icon: "success",
        title: "Vacante creada 🚀",
        text: "La vacante se guardó correctamente",
        confirmButtonColor: "#A78BFA"
      });

      // 🔥 limpiar form
      setForm({
        titulo: "",
        descripcion: "",
        ubicacion: "",
        seniority: ""
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear la vacante",
        confirmButtonColor: "#F87171"
      });
    }
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)"
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: "bold", color: "#6D28D9" }}
      >
        Información de la Vacante
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <TextField
          label="Título"
          value={form.titulo}
          onChange={(e) => handleChange("titulo", e.target.value)}
          required
        />

        <TextField
          label="Descripción"
          multiline
          rows={4}
          value={form.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
          required
        />

        <TextField
          label="Ubicación"
          value={form.ubicacion}
          onChange={(e) => handleChange("ubicacion", e.target.value)}
          required
        />

        <TextField
          label="Seniority"
          select
          value={form.seniority}
          onChange={(e) => handleChange("seniority", e.target.value)}
          required
        >
          <MenuItem value="Trainee">Trainee</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
          <MenuItem value="Semi Senior">Semi Senior</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
          <MenuItem value="Lead">Lead</MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 3,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #A78BFA, #F9A8D4)"
          }}
        >
          Crear Vacante
        </Button>
      </Box>
    </Paper>
  );
}