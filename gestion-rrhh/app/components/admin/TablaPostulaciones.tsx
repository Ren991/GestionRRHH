"use client";
import { useState } from "react";
import BotonDescarga from "./BotonDescarga"; // El que creamos antes
import { actualizarEstadoPostulacion } from "@/app/actions/postulaciones";

interface Postulacion {
  id: string;
  nombre: string;
  email: string;
  vacante_nombre?: string;
  puesto_actual: string;
  remuneracion_bruta: number;
  estado: string;
  fecha_postulacion: string;
  linkedin?: string;
}

export default function TablaPostulaciones({ data }: { data: Postulacion[] }) {
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Lógica de filtrado combinada
  const postulacionesFiltradas = data.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado === "Todos" || p.estado === filtroEstado;
    return coincideNombre && coincideEstado;
  });

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="flex flex-wrap gap-4 bg-white/50 p-6 rounded-[2rem] border border-white">
        <div className="flex-1 min-w-[200px]">
          <label className="text-[10px] text-[#7d84b2] ml-2 font-black uppercase tracking-widest">Buscar Candidato</label>
          <input 
            type="text" 
            placeholder="Ej: Renzo Beccari..."
            className="w-full mt-1 px-5 py-2 bg-white rounded-xl border-none shadow-inner text-sm outline-none focus:ring-2 focus:ring-[#ffdce0]"
            onChange={(e) => setFiltroNombre(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[10px] text-[#7d84b2] ml-2 font-black uppercase tracking-widest">Estado</label>
          <select 
            className="w-full mt-1 px-5 py-2 bg-white rounded-xl border-none shadow-inner text-sm outline-none cursor-pointer"
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Entrevista Técnica">Entrevista Técnica</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>
      </div>

      {/* Tabla de Registros */}
      <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#e6e9ff]/30">
            <tr>
              <th className="p-5 text-[10px] font-black text-[#7d84b2] uppercase tracking-widest">Candidato</th>
              <th className="p-5 text-[10px] font-black text-[#7d84b2] uppercase tracking-widest">Info Técnica</th>
              <th className="p-5 text-[10px] font-black text-[#7d84b2] uppercase tracking-widest">Remuneración</th>
              <th className="p-5 text-[10px] font-black text-[#7d84b2] uppercase tracking-widest text-center">Estado</th>
              <th className="p-5 text-[10px] font-black text-[#7d84b2] uppercase tracking-widest text-right">CV</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white">
            {postulacionesFiltradas.map((p) => (
              <tr key={p.id} className="hover:bg-white/40 transition-colors">
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#555]">{p.nombre}</span>
                    <span className="text-[10px] text-gray-400">{p.email}</span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#7d84b2]">{p.puesto_actual || 'No especifica'}</span>
                    {p.vacante_nombre && <span className="text-[9px] text-[#e2a0a0] font-bold uppercase italic">{p.vacante_nombre}</span>}
                  </div>
                </td>
                <td className="p-5">
                  <span className="text-sm font-mono text-gray-500">${p.remuneracion_bruta.toLocaleString()}</span>
                </td>
                <td className="p-5 text-center">
                   <select 
                      defaultValue={p.estado}
                      onChange={(e) => actualizarEstadoPostulacion(p.id, e.target.value)}
                      className={`text-[10px] font-black px-3 py-1 rounded-full border-none outline-none cursor-pointer ${
                        p.estado === 'Rechazado' ? 'bg-red-50 text-red-400' : 'bg-[#e6e9ff] text-[#7d84b2]'
                      }`}
                   >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Revisión">En Revisión</option>
                      <option value="Entrevista Técnica">Entrevista Técnica</option>
                      <option value="Rechazado">Rechazado</option>
                   </select>
                </td>
                <td className="p-5">
                  <div className="flex justify-end gap-2">
                    {p.linkedin && (
                      <a href={p.linkedin} target="_blank" className="p-2 bg-blue-50 text-blue-400 rounded-full hover:scale-110 transition-transform">
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
        {postulacionesFiltradas.length === 0 && (
          <div className="p-20 text-center text-gray-400 italic text-sm">No se encontraron postulaciones con estos filtros.</div>
        )}
      </div>
    </div>
  );
}