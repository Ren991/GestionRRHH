import { turso } from "@/lib/turso";
import VacantesClient from "./VacantesClient";
import Paginacion from "@/app/components/admin/Paginacion";
import Link from "next/link";

export default async function VacantesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string; limit?: string }> | { page?: string; limit?: string } 
}) {
  const resolvedParams = await searchParams;
  const limit = Number(resolvedParams.limit) || 10;
  const page = Number(resolvedParams.page) || 1;
  const offset = (page - 1) * limit;

  // 1. Queries a la base de datos
  const queryData = turso.execute({
    sql: "SELECT * FROM vacantes ORDER BY fecha_creacion DESC LIMIT ? OFFSET ?",
    args: [limit, offset]
  });
  
  const queryCount = turso.execute("SELECT COUNT(*) as total FROM vacantes");
  const [resData, resCount] = await Promise.all([queryData, queryCount]);

  // 2. LIMPIEZA CRÍTICA: Convertimos a objetos planos para evitar el error de serialización
  const vacantesLimpias = JSON.parse(JSON.stringify(resData.rows));
  
  const totalRegistros = Number(resCount.rows[0].total);
  const totalPaginas = Math.ceil(totalRegistros / limit);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-[#7d84b2] hover:text-[#5a6192] text-sm font-medium transition-colors mb-4 group"
        >
          <svg 
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Panel
        </Link>
        <h1 className="text-3xl font-serif text-[#7d84b2] italic">Gestión de Vacantes</h1>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
          {totalRegistros > 0 
            ? `Mostrando ${offset + 1} - ${Math.min(offset + limit, totalRegistros)} de ${totalRegistros} vacantes`
            : "No hay vacantes creadas"}
        </p>
      </header>

      {totalRegistros > 0 ? (
        <>
          {/* Enviamos los datos ya limpios al componente de cliente */}
          <VacantesClient initialRows={vacantesLimpias} />
          
          <div className="mt-4">
            <Paginacion totalPaginas={totalPaginas} />
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-white/40 rounded-[2.5rem] border-2 border-dashed border-white">
           <p className="text-[#7d84b2] font-serif italic text-lg">No hay vacantes activas en este momento.</p>
        </div>
      )}
    </div>
  );
}