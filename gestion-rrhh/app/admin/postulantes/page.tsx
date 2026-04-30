import { turso } from "@/lib/turso";
import TablaPostulaciones from "@/app/components/admin/TablaPostulaciones";
import Paginacion from "@/app/components/admin/Paginacion";

export default async function HistoricoPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string; limit?: string }> | { page?: string; limit?: string } 
}) {
  const resolvedParams = await searchParams;
  const limit = Number(resolvedParams.limit) || 10;
  const page = Number(resolvedParams.page) || 1;
  const offset = (page - 1) * limit;

  // Ejecutamos las queries
  const queryData = turso.execute({
    sql: `SELECT p.id, p.nombre, p.email, p.puesto_actual, p.remuneracion_bruta, 
                 p.estado, p.fecha_postulacion, v.titulo as vacante_nombre 
          FROM postulaciones p 
          LEFT JOIN vacantes v ON p.vacante_id = v.id 
          ORDER BY p.fecha_postulacion DESC LIMIT ? OFFSET ?`,
    args: [limit, offset]
  });
  const queryCount = turso.execute("SELECT COUNT(*) as total FROM postulaciones");

  const [resData, resCount] = await Promise.all([queryData, queryCount]);

  // SOLUCIÓN "Only plain objects": Serializamos y deserializamos para limpiar métodos de Turso
  const postulacionesLimpias = JSON.parse(JSON.stringify(resData.rows));
  
  const totalRegistros = Number(resCount.rows[0].total);
  const totalPaginas = Math.ceil(totalRegistros / limit);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-[#7d84b2] italic">Histórico General</h1>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">
          {totalRegistros > 0 ? `Mostrando ${offset + 1} - ${Math.min(offset + limit, totalRegistros)} de ${totalRegistros}` : "No hay registros"}
        </p>
      </header>

      {totalRegistros > 0 && (
        <>
          <TablaPostulaciones data={postulacionesLimpias} />
          <h1>HOLA HAY ALGUIEN CON VIDA</h1>
          <Paginacion totalPaginas={totalPaginas} />
        </>
      )}
    </div>
  );
}