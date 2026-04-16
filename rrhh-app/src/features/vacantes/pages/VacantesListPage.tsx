import { useEffect, useState } from "react";
import { getVacantes } from "../../../services/vacanteService";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function VacantesListPage() {
  const [vacantes, setVacantes] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

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

  const filtered = vacantes.filter((v) =>
    v.titulo.toLowerCase().includes(filter.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "titulo", headerName: "Título", flex: 1 },
    { field: "ubicacion", headerName: "Ubicación", flex: 1 },
    { field: "seniority", headerName: "Seniority", flex: 1 },
    {
      field: "activa",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (params.value ? "Activa" : "Cerrada")
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            onClick={() =>
              navigate(`/admin/vacantes/edit/${params.row.id}`)
            }
          >
            Editar
          </Button>

          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Eliminar
          </Button>
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

      {/* Spinner arriba mientras carga */}
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