import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import EditVacanteForm from "../components/EditVacanteForm";
import { getVacanteById } from "../../../services/vacanteService";

export default function EditVacantePage() {
  const { id } = useParams();
  const [vacante, setVacante] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVacante();
  }, []);

  const fetchVacante = async () => {
    try {
      const data = await getVacanteById(id!);
      setVacante(data);
    } catch (error) {
      console.error("Error al obtener vacante", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <EditVacanteForm vacante={vacante} />;
}