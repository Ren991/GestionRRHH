import Link from "next/link";
import { turso } from "@/lib/turso"; // Importá tu cliente de Turso

export default async function AdminDashboard() {
  // 1. Queries rápidas para las métricas
  const { rows: stats } = await turso.execute(`
    SELECT 
      (SELECT COUNT(*) FROM postulaciones) as total_postulantes,
      (SELECT COUNT(*) FROM vacantes WHERE activa = 1) as vacantes_activas,
      (SELECT COUNT(*) FROM postulaciones WHERE estado = 'Pendiente') as pendientes
  `);
  
  const { total_postulantes, vacantes_activas, pendientes } = stats[0] as any;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-[#7d84b2] italic">Panel de Control</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs mt-2">Estado del sistema</p>
        </div>
        {/* Un pequeño badge de estatus real-time */}
        <div className="bg-green-100 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
          ● Sistema Online
        </div>
      </header>

      {/* SECCIÓN DE MÉTRICAS SIMPLES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <MetricCard label="Postulantes" value={total_postulantes} />
        <MetricCard label="Búsquedas" value={vacantes_activas} />
        <MetricCard label="Sin Revisar" value={pendientes} color="text-[#e2a0a0]" />
        <MetricCard label="Tasa Conversión" value="--" /> {/* Futuro cálculo */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AdminCard 
          title="Vacantes" 
          desc="Gestioná las búsquedas activas y cerradas." 
          href="/admin/vacantes" 
          color="bg-[#ffdce0]"
        />
        <AdminCard 
          title="Postulantes" 
          desc="Revisá quiénes quieren sumarse al equipo." 
          href="/admin/postulantes" 
          color="bg-[#e6e9ff]"
        />
        <AdminCard 
          title="Configuración" 
          desc="Ajustes de seguridad y filtros de IP." 
          href="/admin/config" 
          color="bg-[#f9f0ff]"
        />
      </div>
    </div>
  );
}

// Componente para los numeritos de arriba
function MetricCard({ label, value, color = "text-[#7d84b2]" }: any) {
  return (
    <div className="bg-white/50 border border-white p-6 rounded-[2rem] shadow-sm flex flex-col items-center">
      <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">{label}</span>
      <span className={`text-3xl font-serif italic ${color}`}>{value}</span>
    </div>
  );
}

function AdminCard({ title, desc, href, color }: any) {
  return (
    <Link href={href} className="group">
      <div className={`p-8 rounded-[2rem] ${color} border border-white shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-1 h-full`}>
        <h2 className="text-2xl font-serif text-[#7d84b2] mb-2">{title}</h2>
        <p className="text-[#8e94b9] text-sm leading-relaxed">{desc}</p>
        <div className="mt-6 flex justify-end">
           <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
             <svg className="w-4 h-4 text-[#7d84b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </div>
        </div>
      </div>
    </Link>
  );
}