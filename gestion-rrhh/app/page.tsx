import { turso } from "@/lib/turso";

export default async function TestPage() {
  let status = "Conectando...";
  
  try {
    // Intentamos una consulta simple
    console.log("conexion ok")
  } catch (error) {
    console.error(error);
    status = "❌ Error de conexión: Revisá las variables de entorno.";
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Ruta no encontrada</h1>
    </main>
  );
}