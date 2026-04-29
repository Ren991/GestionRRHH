"use client";
import { useState } from "react";
import { descargarCV } from "@/app/actions/postulaciones";

export default function BotonDescarga({ id }: { id: string }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await descargarCV(id);
      
      if (!res) {
        alert("El búnker no encontró el archivo solicitado.");
        return;
      }

      // Creamos un link invisible, le pegamos el contenido y lo "clickeamos"
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${res.base64}`;
      link.download = res.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error(err);
      alert("Error crítico al procesar la descarga.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading}
      className={`p-2.5 rounded-full transition-all shadow-sm border border-[#e6e9ff] ${
        isDownloading 
          ? "bg-gray-100 animate-pulse" 
          : "bg-white hover:bg-[#ffdce0] hover:scale-110 active:scale-95"
      }`}
      title="Descargar Currículum"
    >
      {isDownloading ? (
        <span className="text-[8px] font-black text-[#7d84b2]">...</span>
      ) : (
        <svg 
          className="w-4 h-4 text-[#7d84b2]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
          />
        </svg>
      )}
    </button>
  );
}