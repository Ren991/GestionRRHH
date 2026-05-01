"use client";

import { useState, useMemo } from "react";
import { crearPostulacionAdmin } from "@/app/actions/postulaciones";
import Swal from "sweetalert2";

export default function ModalAgregarPostulante({ vacantes }: { vacantes: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVacante, setSelectedVacante] = useState<{ id: string; titulo: string } | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  // Filtramos las vacantes en tiempo real basándonos en el input
  const filteredVacantes = useMemo(() => {
    return vacantes.filter((v) =>
      v.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vacantes, searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Agregamos manualmente el ID de la vacante seleccionada al FormData
    if (selectedVacante) {
      formData.set("vacanteId", selectedVacante.id);
    }

    const res = await crearPostulacionAdmin(formData);
    
    if (res.success) {
      Swal.fire({
        title: "¡Logrado!",
        text: "Candidato registrado con éxito",
        icon: "success",
        customClass: { popup: "rounded-[2.5rem]" }
      });
      setIsOpen(false);
      setSelectedVacante(null);
      setSearchTerm("");
      (e.target as HTMLFormElement).reset();
    } else {
      Swal.fire("Error", res.error, "error");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-white border border-[#7d84b2] text-[#7d84b2] px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#7d84b2] hover:text-white transition-all shadow-sm active:scale-95"
      >
        + Carga Manual
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#7d84b2]/20 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

          <div className="relative bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl border border-white overflow-y-auto max-h-[95vh]">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif italic text-2xl text-[#7d84b2]">Nuevo Registro Manual</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-[#7d84b2]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nombre" placeholder="Nombre completo" required className="p-3 rounded-xl border border-gray-100 outline-none focus:border-[#7d84b2]" />
              <input name="email" type="email" placeholder="Email" required className="p-3 rounded-xl border border-gray-100 outline-none focus:border-[#7d84b2]" />
              
              {/* SELECT AUTOCOMPLETABLE */}
              <div className="relative md:col-span-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-2 mb-1 block">Asignar Vacante (Buscador)</label>
                <input 
                  type="text"
                  placeholder="Escribí para buscar vacante..."
                  value={selectedVacante ? selectedVacante.titulo : searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedVacante) setSelectedVacante(null);
                  }}
                  onFocus={() => setShowOptions(true)}
                  className="w-full p-3 rounded-xl border border-gray-100 outline-none focus:border-[#7d84b2] transition-all"
                />
                
                {showOptions && (
                  <div className="absolute z-[1000] w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    <div 
                      className="p-3 hover:bg-gray-50 cursor-pointer text-sm italic text-gray-400"
                      onClick={() => {
                        setSelectedVacante(null);
                        setSearchTerm("");
                        setShowOptions(false);
                      }}
                    >
                      -- Sin Vacante Asignada --
                    </div>
                    {filteredVacantes.map((v) => (
                      <div 
                        key={v.id}
                        className="p-3 hover:bg-[#7d84b2]/10 cursor-pointer text-sm text-[#7d84b2]"
                        onClick={() => {
                          setSelectedVacante({ id: v.id, titulo: v.titulo });
                          setShowOptions(false);
                        }}
                      >
                        {v.titulo}
                      </div>
                    ))}
                    {filteredVacantes.length === 0 && searchTerm !== "" && (
                      <div className="p-3 text-xs text-gray-400 text-center">No se encontraron vacantes</div>
                    )}
                  </div>
                )}
              </div>

              <input name="puesto" placeholder="Puesto actual" className="p-3 rounded-xl border border-gray-100 outline-none" />
              <input name="ubicacion_candidato" placeholder="Ubicación (Ej: Rosario)" className="p-3 rounded-xl border border-gray-100 outline-none" />
              <input name="remuneracion" type="number" placeholder="Remuneración pretendida" className="p-3 rounded-xl border border-gray-100 outline-none" />
              
              <div className="md:col-span-2 mt-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 ml-2">Adjuntar CV (PDF)</label>
                <input name="cv_archivo" type="file" accept=".pdf" className="w-full p-3 text-sm border-2 border-dashed border-gray-50 rounded-xl mt-1" />
              </div>

              <button 
                type="submit" 
                className="md:col-span-2 mt-4 bg-[#7d84b2] text-white font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-[#5a6192] shadow-lg transition-all active:scale-95"
              >
                Crear Postulación
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}