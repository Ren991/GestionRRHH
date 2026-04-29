"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BotonDescarga from "./BotonDescarga";
import { actualizarEstadoPostulacion } from "@/app/actions/postulaciones";

interface Postulacion {
  id: string;
  vacante_id: string;
  nombre: string;
  email: string;
  puesto_actual: string;
  remuneracion_bruta: number;
  estado: string;
  fecha_postulacion: string;
  linkedin?: string;
  vacante_nombre?: string; // Viene del JOIN en SQL
}

export default function TablaPostulaciones({ data }: { data: Postulacion[] }) {
  const searchParams = useSearchParams();
  const vacanteIdURL = searchParams.get("vacanteId");

  // Estados de filtrado
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroVacante, setFiltroVacante] = useState(vacanteIdURL || "Todas");

  // Sincronizar con la URL si cambia
  useEffect(() => {
    if (vacanteIdURL) setFiltroVacante(vacanteIdURL);
  }, [vacanteIdURL]);

  // Lógica de filtrado
  const postulacionesFiltradas = useMemo(() => {
    return data.filter((p) => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = filtroEstado === "Todos" || p.estado === filtroEstado;
      const coincideVacante = filtroVacante === "Todas" || p.vacante_id === filtroVacante;
      return coincideNombre && coincideEstado && coincideVacante;
    });
  }, [data, busqueda, filtroEstado, filtroVacante]);

  // Obtener lista única de vacantes para el selector de filtro
  const vacantesUnicas = useMemo(() => {
    const mapa = new Map();
    data.forEach(p => {
      if (!mapa.has(p.vacante_id)) {
        mapa.set(p.vacante_id, p.vacante_nombre || "Vacante sin nombre");
      }
    });
    return Array.from(mapa.entries());
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Controles de Filtrado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/40 p-6 rounded-[2rem] border border-white backdrop-blur-sm shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] text-[#7d84b2] ml-4 font-black uppercase tracking-widest">Candidato</label>
          <input 
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full px-5 py-2.5 bg-white/80 rounded-2xl border-none shadow-inner text-sm outline-none focus:ring-2 focus:ring-[#ffdce0] transition-all"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-[#7d84b2] ml-4 font-black uppercase tracking-widest">Estado</label>
          <select 
            className="w-full px-5 py-2.5 bg-white/80 rounded-2xl border-none shadow-inner text-sm outline-none cursor-pointer"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Entrevista Técnica">Entrevista Técnica</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] text-[#7d84b2] ml-4 font-black uppercase tracking-widest">Búsqueda Actual</label>
          <select 
            className="w-full px-5 py-2.5 bg-white/80 rounded-2xl border-none shadow-inner text-sm outline-none cursor-pointer"
            value={filtroVacante}
            onChange={(e) => setFiltroVacante(e.target.value)}
          >
            <option value="Todas">Todas las vacantes</option>
            {vacantesUnicas.map(([id, nombre]) => (
              <option key={id} value={id}>{nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#e6e9ff]/40">
              <th className="p-6 text-[10px] font-bold text-[#7d84b2] uppercase tracking-[0.2em]">Candidato</th>
              <th className="p-6 text-[10px] font-bold text-[#7d84b2] uppercase tracking-[0.2em]">Puesto / Vacante</th>
              <th className="p-6 text-[10px] font-bold text-[#7d84b2] uppercase tracking-[0.2em]">Remuneración</th>
              <th className="p-6 text-[10px] font-bold text-[#7d84b2] uppercase tracking-[0.2em]">Estado</th>
              <th className="p-6 text-[10px] font-bold text-[#7d84b2] uppercase tracking-[0.2em] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/50">
            {postulacionesFiltradas.map((p) => (
              <tr key={p.id} className="hover:bg-white/60 transition-colors group">
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-700">{p.nombre}</span>
                    <span className="text-xs text-gray-400">{p.email}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#7d84b2]">{p.puesto_actual || "Sin puesto actual"}</span>
                    <span className="text-[9px] text-[#e2a0a0] font-black uppercase italic tracking-wider">
                      {p.vacante_nombre}
                    </span>
                  </div>
                </td>
                <td className="p-6">
                  <span className="text-sm font-medium text-gray-500">${p.remuneracion_bruta.toLocaleString()}</span>
                </td>
                <td className="p-6">
                  <select 
                    defaultValue={p.estado}
                    onChange={(e) => actualizarEstadoPostulacion(p.id, e.target.value)}
                    className="text-[10px] font-black px-4 py-1.5 rounded-full border-none shadow-sm bg-[#f0f4ff] text-[#7d84b2] cursor-pointer outline-none hover:bg-[#ffdce0] transition-all"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Revisión">En Revisión</option>
                    <option value="Entrevista Técnica">Entrevista Técnica</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-3">
                    {p.linkedin && (
                      <a 
                        href={p.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2.5 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#7d84b2]"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    )}
                    <BotonDescarga id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensaje de no hay resultados */}
        {postulacionesFiltradas.length === 0 && (
          <div className="py-24 px-6 text-center">
            <div className="text-4xl mb-4 opacity-40">📂</div>
            <h3 className="text-xl font-serif text-[#7d84b2] italic">No hay postulaciones para esta búsqueda</h3>
            <p className="text-gray-400 text-xs mt-2 font-medium uppercase tracking-[0.2em]">
              Probá ajustando los filtros o volviendo al histórico general
            </p>
            {(busqueda || filtroEstado !== "Todos" || filtroVacante !== "Todas") && (
              <button 
                onClick={() => { setBusqueda(""); setFiltroEstado("Todos"); setFiltroVacante("Todas"); }}
                className="mt-6 text-[10px] font-black text-[#e2a0a0] uppercase border-b-2 border-[#e2a0a0] pb-0.5 hover:text-[#7d84b2] hover:border-[#7d84b2] transition-colors"
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}