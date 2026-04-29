// app/vacantes/[slug]/page.tsx
import { turso } from "@/lib/turso";
import FormPostulacion from "@/app/components/FormPostulacion";
import { notFound } from "next/navigation";

// Definimos la interfaz para los params (ahora son una Promise)
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetalleVacantePage({ params }: PageProps) {
  // 1. ESPERAR a que los params se resuelvan (Vital en Next.js 15+)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 2. Ahora sí, usamos el slug que ya es un string
  const { rows } = await turso.execute({
    sql: "SELECT * FROM vacantes WHERE slug = ? AND activa = 1",
    args: [slug]
  });

  const vacante = rows[0];
  if (!vacante) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f5] via-[#f0f4ff] to-[#f9f0ff] p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Columna Izquierda: Info */}
          <div className="lg:col-span-7 space-y-8">
            <header>
              <span className="px-4 py-1 bg-white/60 rounded-full text-[10px] font-black text-[#7d84b2] uppercase tracking-[0.2em] border border-white">
                {String(vacante.seniority)}
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-[#7d84b2] italic mt-6 leading-tight">
                {String(vacante.titulo)}
              </h1>
              <div className="h-1 w-20 bg-[#ffdce0] mt-6 rounded-full" />
            </header>

            <section className="bg-white/20 backdrop-blur-sm p-8 rounded-[2rem] border border-white/50 shadow-sm">
              <h2 className="text-xs font-black text-[#7d84b2] uppercase tracking-widest mb-4 italic">Descripción del desafío</h2>
              <div className="text-[#6c7293] leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {String(vacante.descripcion)}
              </div>
            </section>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-12">
              <div className="mb-6 ml-4">
                <h2 className="text-xl font-serif text-[#7d84b2] italic">Postulate ahora</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Completa tus datos de búnker</p>
              </div>
              <FormPostulacion vacanteId={String(vacante.id)} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}