"use client";

import { motion } from "framer-motion";
import { handleLogin } from "@/app/actions/auth";
import { useActionState } from "react"; // <--- El nuevo estándar de React 19

export default function LoginPage() {
  // useActionState recibe: (laAccion, estadoInicial)
  // Devuelve: [estadoActual, disparadorDeLaAccion, estaPendiente]
  const [state, formAction, isPending] = useActionState(handleLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff5f5] via-[#f0f4ff] to-[#f9f0ff]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-10 bg-white/70 backdrop-blur-lg rounded-[2.5rem] shadow-xl border border-white"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#7d84b2] italic">
            Bienvenid@
          </h1>
          <p className="text-[#a5a5a5] text-sm mt-2 tracking-widest uppercase">Gestión con delicadeza</p>
        </div>

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#9b9b9b] text-xs ml-4 font-semibold uppercase tracking-wider">Usuario</label>
            <input 
              name="user"
              type="text"
              required
              className="w-full px-6 py-4 bg-[#fdfbfd] border-none rounded-full shadow-inner focus:ring-2 focus:ring-[#ffdce0] transition-all outline-none text-[#555]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#9b9b9b] text-xs ml-4 font-semibold uppercase tracking-wider">Contraseña</label>
            <input 
              name="pass"
              type="password"
              required
              className="w-full px-6 py-4 bg-[#fdfbfd] border-none rounded-full shadow-inner focus:ring-2 focus:ring-[#ffdce0] transition-all outline-none text-[#555]"
            />
          </div>

          {state?.error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-[#e2a0a0] text-center text-sm italic"
            >
              {state.error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: isPending ? 1 : 1.02 }}
            whileTap={{ scale: isPending ? 1 : 0.98 }}
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-gradient-to-r from-[#ffdce0] to-[#e6e9ff] text-[#7d84b2] font-bold rounded-full shadow-lg transition-all duration-300 border border-white disabled:opacity-50"
          >
            {isPending ? "Validando..." : "Entrar con calma"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}