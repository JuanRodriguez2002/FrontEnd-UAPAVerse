"use client"; // 1. Obligatorio al inicio del archivo para poder usar hooks de estado y rutas

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarLanding() {
  const pathname = usePathname(); // Detecta rutas como /auth/login
  const [currentHash, setCurrentHash] = useState(""); // Detecta hashes como #about

  // Escucha los cambios en el hash (#) de la URL cuando el usuario navega en la landing
  useEffect(() => {
    // Guarda el hash actual al cargar la página
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Estilos base compartidos para los enlaces que no son botones ovalados
  const linkBaseStyle = "text-sm font-medium transition-colors duration-300";

  return (
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bfc7d3]">
      
      {/* LINK: Explore (#about) */}
      <a
        href="/"
        className={`${linkBaseStyle} ${
          currentHash === "/"
            ? "text-[#98cbff] underline underline-offset-4 shadow-[0_0_15px_rgba(147,197,253,0.2)]" // Estilo si está activo
            : "text-[#bfc7d3] hover:text-[#f7f7f7]" // Estilo normal
        }`}
      >
        Explore
      </a>

      {/* LINK: About (#interests) */}
      <a
        href="#interests"
        className={`${linkBaseStyle} ${
          currentHash === "#interests"
            ? "text-[#98cbff] underline underline-offset-4 shadow-[0_0_15px_rgba(147,197,253,0.2)]"
            : "text-[#bfc7d3] hover:text-[#f7f7f7]"
        }`}
      >
        About
      </a>

      {/* LINK: Mission (#mission) */}
      <a
        href="#mission"
        className={`${linkBaseStyle} ${
          currentHash === "#mission"
            ? "text-[#98cbff] underline underline-offset-4 shadow-[0_0_15px_rgba(147,197,253,0.2)]"
            : "text-[#bfc7d3] hover:text-[#f7f7f7]"
        }`}
      >
        Mission
      </a>

      {/* BOTÓN OVALADO: Log in (/auth/login) */}
      <a
        href="/auth/login"
        className={`${linkBaseStyle} ${
          pathname === "/auth/login"
            ? "border-[#98cbff] bg-[#98cbff]/20 text-[#98cbff] shadow-[0_0_20px_rgba(147,197,253,0.4)]" // Si está en el login, se ilumina en 3D
            : "border-[#98cbff]/30 text-[#f7f7f7] hover:bg-[#98cbff]/10 hover:border-[#98cbff]/60" // Estado normal en reposo
        }`}
      >
        Log in
      </a>

    </nav>
  );
}