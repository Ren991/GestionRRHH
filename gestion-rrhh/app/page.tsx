import { turso } from "@/lib/turso";

export default async function TestPage() {
  let status = "Conectando...";
  
  try {
    // Intentamos una consulta simple
    const result = await turso.execute("SELECT 1 + 1 as test");
    if (result) {
      status = "✅ ¡Conexión Exitosa con Turso! El búnker está en línea.";
    }
  } catch (error) {
    console.error(error);
    status = "❌ Error de conexión: Revisá las variables de entorno.";
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Estado del Sistema RRHH</h1>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{status}</p>
    </main>
  );
}