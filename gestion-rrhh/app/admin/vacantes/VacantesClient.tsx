"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormVacante from "@/app/components/FormVacante";
import Link from "next/link";

interface VacantesClientProps {
  initialRows: any[];
}

export default function VacantesClient({ initialRows }: VacantesClientProps) {
  // Estados para el acordeón y edición
  const [showForm, setShowForm] = useState(false);
  const [editingVacante, setEditingVacante] = useState<any>(null);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeniority, setFilterSeniority] = useState("Todos");

  // Lógica de filtrado reactivo
  const filteredRows = initialRows.filter((v: any) => {
    const matchesSearch = v.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeniority = filterSeniority === "Todos" || v.seniority === filterSeniority;
    return matchesSearch && matchesSeniority;
  });

  // Función para manejar la apertura del formulario de edición
  const handleEdit = (vacante: any) => {
    setEditingVacante(vacante);
    setShowForm(true);
    // Scroll suave hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para cerrar y resetear estados
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingVacante(null);
  };

  return (
    <div className="space-y-10">
      
      {/* SECCIÓN 1: ACORDEÓN (Crear / Editar) */}
      <section>
        <button 
          onClick={() => {
            if (showForm && editingVacante) {
                setEditingVacante(null); // Si estaba editando y clickea, solo reseteamos a "Nuevo"
            } else {
                setShowForm(!showForm);
                setEditingVacante(null);
            }
          }}
          className="flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-sm text-[#7d84b2] font-bold rounded-2xl shadow-sm hover:shadow-md transition-all border border-white"
        >
          <span className={`transition-transform duration-300 ${showForm ? 'rotate-45' : 'rotate-0'}`}>
            {showForm ? "✕" : "＋"}
          </span>
          {editingVacante ? "Editando Vacante" : showForm ? "Cerrar Formulario" : "Nueva Vacante"}
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
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-serif text-[#7d84b2] italic">
                        {editingVacante ? "Modificar Búsqueda" : "Publicar nueva oportunidad"}
                    </h2>
                    {editingVacante && (
                        <button 
                            onClick={handleCloseForm}
                            className="text-xs text-gray-400 hover:text-[#e2a0a0] transition-colors font-bold uppercase tracking-widest"
                        >
                            Cancelar Edición
                        </button>
                    )}
                </div>
                
                {/* Reutilización del componente Formulario */}
                <FormVacante 
                  vacanteParaEditar={editingVacante} 
                  onSuccess={handleCloseForm} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECCIÓN 2: FILTROS */}
      <section className="flex flex-col md:flex-row gap-4 p-4 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-inner">
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            className="w-full px-8 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#ffdce0] outline-none text-[#555] transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-8 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#e6e9ff] outline-none text-[#7d84b2] cursor-pointer font-medium"
          onChange={(e) => setFilterSeniority(e.target.value)}
        >
          <option value="Todos">Todos los niveles</option>
          <option value="Junior">Junior</option>
          <option value="Ssr">Ssr</option>
          <option value="Senior">Senior</option>
          <option value="Expert">Expert</option>
        </select>
      </section>

      {/* SECCIÓN 3: LISTADO CON ANIMACIÓN DE LAYOUT */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-4">
            <h2 className="text-xl font-serif text-[#7d84b2] italic">Búsquedas Actuales</h2>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                {filteredRows.length} resultados
            </span>
        </div>
        
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
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#7d84b2] mb-1">{v.titulo}</h3>
                  <div className="flex gap-3 items-center flex-wrap">
                    <span className="px-3 py-1 bg-[#f9f0ff] text-[#7d84b2] text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {v.seniority}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Publicado: {new Date(v.fecha_creacion).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] text-[#e2a0a0] font-bold uppercase">
                      Cierre: {v.fecha_cierre}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex gap-4 w-full md:w-auto justify-end">
                  {/* <button  className="text-xs font-bold text-[#a5a5a5] hover:text-[#7d84b2] transition-colors px-2">
                    Postulantes
                  </button> */}
<Link 
  href={`/admin/postulantes?vacanteId=${v.id}`}
  className="px-4 py-2 bg-[#e6e9ff] text-[#7d84b2] text-[10px] font-black uppercase rounded-full hover:bg-[#ffdce0] transition-colors"
>
  Ver Postulantes
</Link>
                  <button 
                    onClick={() => handleEdit(v)}
                    className="px-6 py-2 bg-white/50 rounded-full text-xs font-bold text-[#7d84b2] border border-white hover:bg-[#e6e9ff] transition-all shadow-sm"
                  >
                    Editar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRows.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white/10 rounded-[3rem] border border-dashed border-white/40">
              <p className="text-[#a5a5a5] italic font-serif">No hay vacantes que coincidan con el filtro...</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}