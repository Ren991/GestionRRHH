"use client";
import { useActionState, useEffect, useRef } from "react";
import { crearOEditarVacante } from "@/app/actions/vacantes";

interface FormVacanteProps {
  vacanteParaEditar?: any; // Datos de la vacante si estamos editando
  onSuccess?: () => void;
}

export default function FormVacante({ vacanteParaEditar, onSuccess }: FormVacanteProps) {
  // Pasamos el ID como campo oculto para que la Action sepa si es edición
  const [state, formAction, isPending] = useActionState(crearOEditarVacante, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      if (!vacanteParaEditar) formRef.current?.reset();
      onSuccess?.();
    }
  }, [state, vacanteParaEditar, onSuccess]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {/* Campo oculto con el ID si existe */}
      {vacanteParaEditar?.id && (
        <input type="hidden" name="id" value={vacanteParaEditar.id} />
      )}

      <div>
        <label className="text-xs text-[#7d84b2] ml-2 uppercase font-bold">Título</label>
        <input 
          name="titulo" 
          defaultValue={vacanteParaEditar?.titulo || ""} 
          placeholder="Ej: Senior .NET Developer" 
          className="w-full p-3 rounded-xl bg-white border-none shadow-inner" 
        />
        {state?.errors?.titulo && <p className="text-red-400 text-[10px] mt-1 ml-2">{state.errors.titulo}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#7d84b2] ml-2 uppercase font-bold">Seniority</label>
          <select 
            name="seniority" 
            defaultValue={vacanteParaEditar?.seniority || "Senior"} 
            className="w-full p-3 rounded-xl bg-white border-none shadow-inner"
          >
            <option value="Junior">Junior</option>
            <option value="Ssr">Ssr</option>
            <option value="Senior">Senior</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-[#7d84b2] ml-2 uppercase font-bold">Fecha Cierre</label>
          <input 
            type="date" 
            name="fecha_cierre" 
            defaultValue={vacanteParaEditar?.fecha_cierre || ""} 
            className="w-full p-3 rounded-xl bg-white border-none shadow-inner text-gray-500" 
          />
        </div>
      </div>
      <div className="space-y-2">
  <label className="text-xs text-[#7d84b2] ml-2 uppercase font-bold">
    Ubicación (Remoto, Híbrido, Ciudad...)
  </label>
  <input
    type="text"
    name="ubicacion"
    placeholder="Ej: Remoto, Rosario, Híbrido (CABA)"
                className="w-full p-3 rounded-xl bg-white border-none shadow-inner text-gray-500" 

    required
  />
</div>

      <div>
        <label className="text-xs text-[#7d84b2] ml-2 uppercase font-bold">Descripción</label>
        <textarea 
          name="descripcion" 
          defaultValue={vacanteParaEditar?.descripcion || ""} 
          placeholder="Detalles de la posición..." 
          className="w-full p-3 rounded-xl bg-white border-none shadow-inner h-32" 
        />
        {state?.errors?.descripcion && <p className="text-red-400 text-[10px] mt-1 ml-2">{state.errors.descripcion}</p>}
      </div>

      <button 
        disabled={isPending}
        className="w-full py-4 bg-gradient-to-r from-[#ffdce0] to-[#e6e9ff] text-[#7d84b2] font-bold rounded-2xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
      >
        {isPending ? "Procesando..." : vacanteParaEditar ? "Guardar Cambios" : "Publicar Vacante"}
      </button>
    </form>
  );
}