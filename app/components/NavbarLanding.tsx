"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarLanding() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    setCurrentHash(window.location.hash || "#inicio");

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#inicio");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const linkBaseStyle = "text-sm font-medium transition-all duration-300 relative pb-1 border-b-2";

  return (
    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#bfc7d3]">
      
      {/* LINK: Inicio */}
      <a
        href="#inicio"
        className={`${linkBaseStyle} ${
          currentHash === "#inicio"
            ? "border-[#98cbff] text-[#98cbff] drop-shadow-[0_0_10px_rgba(147,197,253,0.6)]"
            : "border-transparent text-[#bfc7d3] hover:text-[#f7f7f7] hover:border-white/20"
        }`}
      >
        Inicio
      </a>

      {/* LINK: Nosotros */}
      <a
        href="#nosotros"
        className={`${linkBaseStyle} ${
          currentHash === "#nosotros"
            ? "border-[#98cbff] text-[#98cbff] drop-shadow-[0_0_10px_rgba(147,197,253,0.6)]"
            : "border-transparent text-[#bfc7d3] hover:text-[#f7f7f7] hover:border-white/20"
        }`}
      >
        Nosotros
      </a>

      {/* LINK: Misión */}
      <a
        href="#mision"
        className={`${linkBaseStyle} ${
          currentHash === "#mision"
            ? "border-[#98cbff] text-[#98cbff] drop-shadow-[0_0_10px_rgba(147,197,253,0.6)]"
            : "border-transparent text-[#bfc7d3] hover:text-[#f7f7f7] hover:border-white/20"
        }`}
      >
        Misión
      </a>

      {/* BOTÓN OVALADO REAL: Iniciar Sesión */}
      <a
        href="/auth/login"
        className={`px-5 py-1.5 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 ${
          pathname === "/auth/login"
            ? "border-[#98cbff] bg-[#98cbff]/20 text-[#98cbff] shadow-[0_0_20px_rgba(147,197,253,0.4)]"
            : "border-[#98cbff]/40 text-[#f7f7f7] hover:bg-[#98cbff]/10 hover:border-[#98cbff] hover:shadow-[0_0_15px_rgba(147,197,253,0.3)]"
        }`}
      >
        Iniciar Sesión
      </a>

    </nav>
  );
}