import { useEffect, useState } from "react";
import { getVacantes, toggleVacante } from "../../../services/vacanteService";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Switch
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";


export default function VacantesListPage() {
  const [vacantes, setVacantes] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [seniorityFilter, setSeniorityFilter] = useState("todos");

  const navigate = useNavigate();

  useEffect(() => {
    fetchVacantes();
  }, []);

  const fetchVacantes = async () => {
    setLoading(true);
    try {
      const data = await getVacantes();
      setVacantes(data);
    } catch (error) {
      console.error("Error al obtener vacantes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    console.log("delete", id);
    // TODO: implementar delete
  };

  const handleToggle = async (id: string, activa: boolean) => {
    try {
      await toggleVacante(id, activa);

      // 🔥 actualización optimista
      setVacantes((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, activa } : v
        )
      );
      Swal.fire({
        icon: "success",
        title: "Vacante actualizada",
        text: "El estado de la vacante ha sido actualizado",
        confirmButtonColor: "#A78BFA"
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado de la vacante",
        confirmButtonColor: "#A78BFA"
      });
    }
  };


  const filtered = vacantes.filter((v) => {
    const search = filter.toLowerCase();

    const matchesText =
      v.titulo.toLowerCase().includes(search) ||
      v.ubicacion.toLowerCase().includes(search) ||
      v.seniority.toLowerCase().includes(search);

    const matchesEstado =
      estadoFilter === "todos" ||
      (estadoFilter === "activas" && v.activa) ||
      (estadoFilter === "inactivas" && !v.activa);

    const matchesSeniority =
      seniorityFilter === "todos" ||
      v.seniority === seniorityFilter;

    return matchesText && matchesEstado && matchesSeniority;
  });
  const columns: GridColDef[] = [
    { field: "titulo", headerName: "Título", flex: 1 },
    { field: "ubicacion", headerName: "Ubicación", flex: 1 },
    { field: "seniority", headerName: "Seniority", flex: 1 },

    // 🔥 NUEVA COLUMNA SWITCH
    {
      field: "activa",
      headerName: "Activa",
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() =>
            handleToggle(params.row.id, !params.value)
          }
          color="success"
        />
      )
    },

    // 🔹 ACCIONES SEPARADAS
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              color="primary"
              onClick={() =>
                navigate(`/admin/vacantes/edit/${params.row.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>


          <Tooltip title="Eliminar">
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Gestión de Vacantes
      </Typography>

      <TextField
        placeholder="Buscar vacante..."
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>

        {/* FILTRO ESTADO */}
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estadoFilter}
            label="Estado"
            onChange={(e) => setEstadoFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="activas">Activas</MenuItem>
            <MenuItem value="inactivas">Inactivas</MenuItem>
          </Select>
        </FormControl>

        {/* FILTRO SENIORITY */}
        <FormControl fullWidth>
          <InputLabel>Seniority</InputLabel>
          <Select
            value={seniorityFilter}
            label="Seniority"
            onChange={(e) => setSeniorityFilter(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="Junior">Junior</MenuItem>
            <MenuItem value="Semi">Semi</MenuItem>
            <MenuItem value="Senior">Senior</MenuItem>
            <MenuItem value="Lead">Lead</MenuItem>
          </Select>
        </FormControl>

      </Box>

      {/* Spinner arriba */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <DataGrid
        rows={filtered}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        autoHeight
        localeText={{
          noRowsLabel: "No se encontraron vacantes relacionadas"
        }}
      />
    </Box>
  );
}