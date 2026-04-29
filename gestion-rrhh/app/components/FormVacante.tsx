"use client";
import { useActionState } from "react";
import { crearVacante } from "@/app/actions/vacantes";

export default function FormVacante() {
  const [state, formAction, isPending] = useActionState(crearVacante, null);

  return (
    <form action={formAction} className="space-y-4 bg-white/30 p-6 rounded-[2rem] border border-white">
      <div>
        <input name="titulo" placeholder="Título" className="w-full p-3 rounded-xl bg-white border-none shadow-inner" />
        {state?.errors?.titulo && <p className="text-red-300 text-xs mt-1 ml-2">{state.errors.titulo}</p>}
      </div>
      
      <select name="seniority" className="w-full p-3 rounded-xl bg-white border-none shadow-inner">
        <option value="Junior">Junior</option>
        <option value="Ssr">Ssr</option>
        <option value="Senior">Senior</option>
      </select>

      <textarea name="descripcion" placeholder="Descripción..." className="w-full p-3 rounded-xl bg-white border-none shadow-inner h-32" />
      
      <input type="date" name="fecha_cierre" className="w-full p-3 rounded-xl bg-white border-none shadow-inner text-gray-400" />

      <button 
        disabled={isPending}
        className="w-full py-3 bg-[#ffdce0] text-[#7d84b2] font-bold rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
      >
        {isPending ? "Publicando..." : "Publicar Vacante"}
      </button>
    </form>
  );
}