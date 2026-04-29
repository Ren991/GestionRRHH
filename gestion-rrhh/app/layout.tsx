import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Fuentes elegantes
import "./globals.css";

// Fuente para el cuerpo (legible y limpia)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Fuente para títulos (más sofisticada y suave)
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: " RRHH | Gestión con Delicadeza",
  description: "Sistema exclusivo de gestión de talento.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {/* Aquí podrías poner un Navbar global si quisieras, 
            pero para el login lo ideal es dejar el children libre */}
        <div className="min-h-screen selection:bg-[#ffdce0] selection:text-[#7d84b2]">
          {children}
        </div>
      </body>
    </html>
  );
}