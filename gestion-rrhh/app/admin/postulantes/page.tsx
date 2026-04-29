import { turso } from "@/lib/turso";
import TablaPostulaciones from "@/app/components/admin/TablaPostulaciones";

export default async function HistoricoPage() {
  const { rows } = await turso.execute(`
    SELECT p.*, v.titulo as vacante_nombre 
    FROM postulaciones p 
    LEFT JOIN vacantes v ON p.vacante_id = v.id 
    ORDER BY p.fecha_postulacion DESC
  `);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-[#7d84b2] italic mb-8">Histórico General</h1>
      <TablaPostulaciones data={rows as any} />
    </div>
  );
}