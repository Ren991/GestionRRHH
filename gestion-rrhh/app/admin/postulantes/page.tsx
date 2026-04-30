import { turso } from "@/lib/turso";
import TablaPostulaciones from "@/app/components/admin/TablaPostulaciones";

export default async function HistoricoPage() {
  const { rows } = await turso.execute(`
    SELECT 
      p.id, 
      p.vacante_id, 
      p.nombre, 
      p.email, 
      p.puesto_actual, 
      p.remuneracion_bruta, 
      p.estado, 
      p.fecha_postulacion, 
      p.linkedin,
      v.titulo as vacante_nombre 
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