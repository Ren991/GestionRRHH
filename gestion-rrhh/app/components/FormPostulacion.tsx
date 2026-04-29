"use client";
import { useState } from "react";
import { useActionState } from "react";
import { enviarPostulacion } from "@/app/actions/postulaciones";
import { motion } from "framer-motion";

export default function FormPostulacion({ vacanteId }: { vacanteId: string }) {
  const [state, formAction, isPending] = useActionState(enviarPostulacion, null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  
  if (state?.success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center p-12 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white shadow-xl"
      >
        <div className="text-5xl mb-4">✨</div>
        <h3 className="text-2xl font-serif text-[#7d84b2] italic">¡Postulación Enviada!</h3>
        <p className="text-gray-500 mt-2 text-sm">Tu perfil ya fué enviado. ¡Éxitos!</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 bg-white/30 p-8 rounded-[2.5rem] border border-white backdrop-blur-sm shadow-sm">
      {/* ID de la vacante oculto */}
      <input type="hidden" name="vacanteId" value={vacanteId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup name="nombre" label="Nombre y Apellido" placeholder="Ej: Renzo Beccari" required />
        <InputGroup name="email" label="Email" type="email" placeholder="tu@email.com" required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup name="puesto" label="Puesto Actual" placeholder="Full Stack Developer" />
        <InputGroup name="remuneracion" label="Remuneración Bruta" type="number" placeholder="Ej: 1500000" />
      </div>

      <InputGroup name="linkedin" label="LinkedIn (URL)" placeholder="https://linkedin.com/in/..." />
      <InputGroup name="portfolio" label="Portfolio / GitHub (URL)" placeholder="https://github.com/..." />

      <div className="space-y-2">
        <label className="text-[10px] text-[#7d84b2] ml-4 font-black uppercase tracking-[0.2em]">Currículum (PDF)</label>
        <div className="relative group">
          <input 
            type="file" 
            name="cv_archivo" 
            accept=".pdf" 
            required
            className="w-full text-xs text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#e6e9ff] file:text-[#7d84b2] hover:file:bg-[#ffdce0] transition-all cursor-pointer bg-white/50 rounded-2xl border border-dashed border-[#e6e9ff]"
          />
        </div>
      </div>

      {state?.error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#e2a0a0] text-xs font-bold text-center italic bg-red-50/50 py-2 rounded-xl">
          {state.error}
        </motion.p>
      )}
<div className="flex items-start gap-3 px-4 py-3 bg-white/40 rounded-2xl border border-white/50">
  <input 
    type="checkbox" 
    id="terminos"
    checked={aceptaTerminos}
    onChange={(e) => setAceptaTerminos(e.target.checked)}
    className="mt-1 accent-[#7d84b2] cursor-pointer"
  />
  <label htmlFor="terminos" className="text-[9px] text-[#7d84b2] leading-tight cursor-pointer font-medium uppercase tracking-wider">
    Acepto que mis datos sean tratados para fines de reclutamiento según la Ley 25.326 de Protección de Datos Personales de Argentina.
  </label>
</div>
      <button 
        disabled={!aceptaTerminos||isPending}
        className="w-full py-4 bg-gradient-to-r from-[#ffdce0] to-[#e6e9ff] text-[#7d84b2] font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {isPending ? "Procesando..." : "Enviar Postulación"}
      </button>
    </form>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] text-[#7d84b2] ml-4 font-black uppercase tracking-[0.2em]">{label}</label>
      <input 
        {...props} 
        className="w-full px-6 py-3 bg-white/80 border-none rounded-2xl shadow-inner outline-none text-[#555] focus:ring-2 focus:ring-[#ffdce0] transition-all placeholder:text-gray-300 text-sm" 
      />
    </div>
  );
}

/* function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
} */
