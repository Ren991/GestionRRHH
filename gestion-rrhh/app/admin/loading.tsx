export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-[#e6e9ff] border-t-[#7d84b2] rounded-full animate-spin"></div>
      <p className="text-[#7d84b2] font-serif italic animate-pulse">Cargando...</p>
    </div>
  );
}