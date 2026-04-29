import { turso } from "@/lib/turso";
import VacantesClient from "./VacantesClient";

export const dynamic = "force-dynamic"; // Para que siempre traiga datos nuevos de la DB

export default async function VacantesPage() {
  // Traemos las vacantes de Turso
  const { rows } = await turso.execute(
    "SELECT * FROM vacantes ORDER BY fecha_creacion DESC"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-[#f0f4ff] to-[#f9f0ff] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-serif text-[#7d84b2] italic">Gestión de Vacantes</h1>
          <p className="text-gray-400 uppercase tracking-widest text-[10px] mt-2">Búnker de Talento • Rosario 2026</p>
        </header>

        {/* Le pasamos los datos al componente interactivo */}
        <VacantesClient initialRows={rows} />
      </div>
    </div>
  );
}