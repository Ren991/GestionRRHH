import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem
} from "@mui/material";
import { updateVacante } from "../../../services/vacanteService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditVacanteForm({ vacante }: any) {
    const [form, setForm] = useState(vacante);
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();

    const seniorityOptions = ["Junior", "Semi", "Senior", "Lead"];

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        // limpiar error al escribir
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const validate = () => {
        const newErrors: any = {};

        if (!form.titulo) newErrors.titulo = true;
        if (!form.ubicacion) newErrors.ubicacion = true;
        if (!form.seniority) newErrors.seniority = true;
        if (!form.descripcion) newErrors.descripcion = true;

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Todos los campos son obligatorios"
            });
            return;
        }

        try {
            const dataToUpdate = {
                ...form,
                activa: true
            };

            await updateVacante(form.id, dataToUpdate);

            Swal.fire({
                icon: "success",
                title: "Vacante actualizada"
            });

            navigate("/admin/vacantes");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error al actualizar"
            });
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh"
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 3
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
                >
                    Editar Vacante
                </Typography>

                <TextField
                    label="Título"
                    name="titulo"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={form.titulo || ""}
                    onChange={handleChange}
                    error={errors.titulo}
                    helperText={errors.titulo && "Campo obligatorio"}
                />

                <TextField
                    label="Ubicación"
                    name="ubicacion"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={form.ubicacion || ""}
                    onChange={handleChange}
                    error={errors.ubicacion}
                    helperText={errors.ubicacion && "Campo obligatorio"}
                />

                {/* 🔥 SELECT SENIORITY */}
                <TextField
                    select
                    label="Seniority"
                    name="seniority"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={form.seniority || ""}
                    onChange={handleChange}
                    error={errors.seniority}
                    helperText={errors.seniority && "Campo obligatorio"}
                >
                    {seniorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Descripción"
                    name="descripcion"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 3 }}
                    value={form.descripcion || ""}
                    onChange={handleChange}
                    error={errors.descripcion}
                    helperText={errors.descripcion && "Campo obligatorio"}
                />

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                >
                    Guardar cambios
                </Button>
            </Paper>
        </Box>
    );
}