"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";

const STEPS = [
  {
    title: "Bienvenido a UAPAVERSE",
    body: "Explora la feria en 3D: camina por el pasillo, visita stands y cambia de sala al final.",
  },
  {
    title: "Movimiento",
    body: "WASD para moverte. Haz clic en el área 3D para capturar el cursor y mirar con el mouse. Shift para correr.",
  },
  {
    title: "Stands",
    body: "Acércate y pulsa E para ver video, demo y galería. Cada stand tiene un avatar IA.",
  },
  {
    title: "Asistente IA",
    body: "Cerca del avatar, pulsa T para preguntar por voz o texto sobre el proyecto.",
  },
  {
    title: "Salas",
    body: "Pulsa M o llega al portal del fondo para cambiar de sala. Usa Tour guiado para recorrer automáticamente.",
  },
];

export function TutorialOverlay() {
  const isTutorialOpen = useUapaStore((s) => s.isTutorialOpen);
  const isLoading = useUapaStore((s) => s.isLoading);
  const standsInitialized = useUapaStore((s) => s.standsInitialized);
  const completeTutorial = useUapaStore((s) => s.completeTutorial);

  const show = isTutorialOpen && !isLoading && standsInitialized;

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") {
        completeTutorial();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, completeTutorial]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-auto fixed inset-0 z-[90] overflow-y-auto bg-[#030014]/88 backdrop-blur-md"
          data-ui-interactive
        >
          <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel flex max-h-[min(92dvh,680px)] w-full max-w-lg flex-col rounded-2xl p-4 sm:p-5"
              data-ui-interactive
            >
              <div className="shrink-0">
                <p className="text-[10px] uppercase tracking-widest text-[#00d4ff]/60">
                  Tutorial rápido
                </p>
                <h2 className="neon-text text-lg font-bold text-[#00d4ff] sm:text-xl">
                  Cómo navegar la feria
                </h2>
              </div>

              <div className="mt-3 min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1 sm:space-y-3">
                {STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-[#00d4ff]/15 bg-[#061020]/60 p-2.5 sm:p-3"
                  >
                    <p className="text-[11px] font-semibold text-[#00d4ff] sm:text-xs">
                      {i + 1}. {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#e8f4ff]/75 sm:text-sm">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 shrink-0 space-y-3 border-t border-[#00d4ff]/15 pt-3">
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[10px] text-[#e8f4ff]/55 sm:text-xs">
                  <span>
                    <kbd className="text-[#00d4ff]">WASD</kbd> Mover
                  </span>
                  <span>·</span>
                  <span>
                    <kbd className="text-[#00d4ff]">E</kbd> Stand
                  </span>
                  <span>·</span>
                  <span>
                    <kbd className="text-[#00d4ff]">T</kbd> IA
                  </span>
                  <span>·</span>
                  <span>
                    <kbd className="text-[#00d4ff]">M</kbd> Salas
                  </span>
                </div>

                <button
                  type="button"
                  onClick={completeTutorial}
                  className="w-full cursor-pointer rounded-xl border border-[#00d4ff]/50 bg-[#00d4ff]/15 py-3 text-sm font-semibold text-[#00d4ff] transition hover:bg-[#00d4ff]/25"
                  data-ui-interactive
                >
                  Entendido — Empezar a explorar
                </button>

                <p className="text-center text-[10px] text-[#e8f4ff]/40">
                  Enter o Esc para continuar
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
