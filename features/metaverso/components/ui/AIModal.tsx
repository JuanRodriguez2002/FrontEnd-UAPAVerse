"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { VoiceAssistant } from "./VoiceAssistant";
import { stopSpeaking } from "@/features/metaverso/hooks/useSpeech";
import { releasePointerLock } from "@/features/metaverso/utils/pointerLock";

export function AIModal() {
  const isAIModalOpen = useUapaStore((s) => s.isAIModalOpen);
  const aiModalStand = useUapaStore((s) => s.aiModalStand);
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const closeAIModal = useUapaStore((s) => s.closeAIModal);

  useEffect(() => {
    if (isAIModalOpen) {
      releasePointerLock();
    }
  }, [isAIModalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAIModalOpen) {
        e.preventDefault();
        e.stopPropagation();
        stopSpeaking();
        closeAIModal();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isAIModalOpen, closeAIModal]);

  const handleClose = () => {
    stopSpeaking();
    closeAIModal();
  };

  return (
    <AnimatePresence>
      {isAIModalOpen && aiModalStand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex cursor-default items-center justify-center bg-[#030014]/80 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="glass-panel pointer-events-auto w-full max-w-xl cursor-default rounded-2xl p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg"
                  style={{
                    backgroundColor: `${aiModalStand.color}22`,
                    border: `2px solid ${aiModalStand.color}66`,
                  }}
                >
                  🤖
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#e8f4ff]/50">
                    Puesto directo · Asistente IA
                  </p>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: aiModalStand.color }}
                  >
                    {aiModalStand.title}
                  </h2>
                  <p className="text-xs text-[#e8f4ff]/60">
                    {aiModalStand.organization}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="cursor-pointer rounded-lg border border-[#e8f4ff]/20 px-3 py-1 text-sm text-[#e8f4ff]/60 transition hover:border-[#00d4ff]/40 hover:text-[#00d4ff]"
              >
                ✕
              </button>
            </div>

            <p className="mb-4 rounded-lg bg-[#001a33]/50 px-4 py-3 text-sm leading-relaxed text-[#e8f4ff]/80">
              Hola, soy el asistente de{" "}
              <strong style={{ color: aiModalStand.color }}>
                {aiModalStand.title}
              </strong>
              . ¿Qué te gustaría saber sobre este proyecto?
            </p>

            <VoiceAssistant stand={aiModalStand} autoFocus />

            {isModalOpen && (
              <p className="mt-3 text-center text-[10px] text-[#e8f4ff]/40">
                Pulsa Esc para volver al detalle del stand
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
