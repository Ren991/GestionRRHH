import { useState } from "react";
import { createVacante } from "../../../services/vacanteService";

export default function VacanteForm() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async () => {
    await createVacante({ titulo, descripcion });
    alert("Vacante creada");
  };

  return (
    <div>
      <input placeholder="Titulo" onChange={(e) => setTitulo(e.target.value)} />
      <textarea onChange={(e) => setDescripcion(e.target.value)} />

      <button onClick={handleSubmit}>Crear Vacante</button>
    </div>
  );
}