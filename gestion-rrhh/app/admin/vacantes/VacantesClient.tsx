"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormVacante from "@/app/components/FormVacante";

export default function VacantesClient({ initialRows }: { initialRows: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeniority, setFilterSeniority] = useState("Todos");

  // Lógica de Filtrado en tiempo real
  const filteredRows = initialRows.filter((v: any) => {
    const matchesSearch = v.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeniority = filterSeniority === "Todos" || v.seniority === filterSeniority;
    return matchesSearch && matchesSeniority;
  });

  return (
    <div className="space-y-10">
      
      {/* SECCIÓN 1: ACORDEÓN DE NUEVA VACANTE */}
      <section>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-[#7d84b2] font-bold rounded-2xl shadow-sm hover:shadow-md transition-all border border-white"
        >
          <span className={`transition-transform duration-300 ${showForm ? 'rotate-45' : 'rotate-0'}`}>
            {showForm ? "✕" : "＋"}
          </span>
          {showForm ? "Cerrar Formulario" : "Nueva Vacante"}
        </button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              className="overflow-hidden"
            >
              <div className="mt-6 p-8 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl">
                <FormVacante />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECCIÓN 2: FILTROS DE BÚSQUEDA */}
      <section className="flex flex-col md:flex-row gap-4 p-4 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-inner">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            className="w-full px-8 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#ffdce0] outline-none text-[#555] transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-8 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#e6e9ff] outline-none text-[#7d84b2] cursor-pointer appearance-none font-medium"
          onChange={(e) => setFilterSeniority(e.target.value)}
        >
          <option value="Todos">Todos los niveles</option>
          <option value="Junior">Junior</option>
          <option value="Ssr">Ssr</option>
          <option value="Senior">Senior</option>
          <option value="Expert">Expert</option>
        </select>
      </section>

      {/* SECCIÓN 3: LISTADO DE BÚSQUEDAS ACTUALES */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif text-[#7d84b2] ml-4 mb-4 italic">Búsquedas Actuales</h2>
        
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredRows.map((v: any) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={v.id} 
                className="group bg-white/60 hover:bg-white/80 p-8 rounded-[2rem] border border-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm transition-all hover:shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#7d84b2] mb-1">{v.titulo}</h3>
                  <div className="flex gap-3 items-center">
                    <span className="px-3 py-1 bg-[#f9f0ff] text-[#7d84b2] text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {v.seniority}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium tracking-tighter">
                      Cierre: {v.fecha_cierre}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex gap-2">
                  <button className="px-5 py-2 text-xs font-bold text-[#a5a5a5] hover:text-[#7d84b2] transition-colors">
                    Ver Postulantes
                  </button>
                  <button className="px-5 py-2 bg-white/50 rounded-full text-xs font-bold text-[#7d84b2] border border-white hover:bg-[#ffdce0] transition-all">
                    Editar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRows.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-[#a5a5a5] italic font-serif">No encontramos vacantes que coincidan con tu búsqueda...</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}