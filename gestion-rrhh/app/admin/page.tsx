import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-serif text-[#7d84b2] italic">Panel de Control</h1>
        <p className="text-gray-400 uppercase tracking-widest text-xs mt-2">Bienvenid@</p>
      </header>

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

function AdminCard({ title, desc, href, color }: any) {
  return (
    <Link href={href} className="group">
      <div className={`p-8 rounded-[2rem] ${color} border border-white shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-1`}>
        <h2 className="text-2xl font-serif text-[#7d84b2] mb-2">{title}</h2>
        <p className="text-[#8e94b9] text-sm leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}