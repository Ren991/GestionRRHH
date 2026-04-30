"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Paginacion({ totalPaginas }: { totalPaginas: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
console.log("hola")
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = searchParams.get("limit") || "10";

  const updateURL = (paramsUpdate: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(paramsUpdate).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  // Forzamos el renderizado si el límite no es el estándar para debuggear
  //if (totalPaginas <= 1 && currentLimit === "10") return null;

  return (
    <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-t border-white/20 pt-8">
      
      {/* Selector de Filas */}
      <div className="flex items-center gap-3 bg-white/30 px-4 py-2 rounded-2xl border border-white">
        <span className="text-[10px] font-black uppercase text-[#7d84b2] tracking-widest">Mostrar:</span>
        <select 
          value={currentLimit}
          onChange={(e) => updateURL({ limit: e.target.value, page: "1" })}
          className="bg-transparent text-xs font-bold text-[#7d84b2] outline-none cursor-pointer"
        >
          {[5, 7, 10, 20].map(n => (
            <option key={n} value={n.toString()} className="bg-white">{n} filas</option>
          ))}
        </select>
      </div>

      {/* Navegación */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => updateURL({ page: (currentPage - 1).toString() })}
          className="p-3 rounded-2xl bg-white border border-white shadow-sm disabled:opacity-30 hover:bg-[#ffdce0] transition-all"
        >
          <svg className="w-4 h-4 text-[#7d84b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="px-6 py-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-white text-[10px] font-black text-[#7d84b2] uppercase tracking-[0.2em]">
          Página {currentPage} de {totalPaginas}
        </div>

        <button
          disabled={currentPage >= totalPaginas}
          onClick={() => updateURL({ page: (currentPage + 1).toString() })}
          className="p-3 rounded-2xl bg-white border border-white shadow-sm disabled:opacity-30 hover:bg-[#e6e9ff] transition-all"
        >
          <svg className="w-4 h-4 text-[#7d84b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}