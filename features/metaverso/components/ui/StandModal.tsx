"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { GallerySlider } from "./GallerySlider";
import { stopSpeaking } from "@/features/metaverso/hooks/useSpeech";
import { useMetaversoSession } from "@/features/metaverso/hooks/useMetaversoSession";
import { releasePointerLock } from "@/features/metaverso/utils/pointerLock";

function StatusPill({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium"
      style={{
        backgroundColor: `${color}18`,
        color,
        border: `1px solid ${color}35`,
      }}
    >
      {label}
    </span>
  );
}

export function StandModal() {
  const isModalOpen = useUapaStore((s) => s.isModalOpen);
  const selectedStand = useUapaStore((s) => s.selectedStand);
  const closeModal = useUapaStore((s) => s.closeModal);
  const openAIModal = useUapaStore((s) => s.openAIModal);
  const { canStartConversation } = useMetaversoSession();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.cursor = "default";
      document.body.dataset.modalOpen = "true";
      releasePointerLock();
    } else {
      delete document.body.dataset.modalOpen;
      document.body.style.cursor = "";
    }
    return () => {
      document.body.style.cursor = "";
      delete document.body.dataset.modalOpen;
    };
  }, [isModalOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        e.stopPropagation();
        closeModal();
      }
      if (e.key.toLowerCase() === "t" && isModalOpen && selectedStand) {
        openAIModal(selectedStand, { teleportToHost: true });
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isModalOpen, closeModal, selectedStand, openAIModal]);

  const handleClose = () => {
    stopSpeaking();
    closeModal();
  };

  const hasVideo = Boolean(selectedStand?.videoUrl);
  const hasDemo = Boolean(
    selectedStand?.demoUrl && selectedStand.demoUrl !== "#"
  );
  const displayGroup =
    selectedStand?.groupName?.trim() || selectedStand?.organization;
  const statusItems = [
    selectedStand?.categoryName,
    selectedStand?.developmentStatus,
    selectedStand?.maturityLevel,
  ].filter(Boolean) as string[];

  return (
    <AnimatePresence>
      {isModalOpen && selectedStand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex cursor-default items-center justify-center bg-[#030014]/90 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="glass-panel scroll-cosmic pointer-events-auto max-h-[92vh] w-full max-w-4xl cursor-default overflow-y-auto rounded-2xl p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <span
                  className="mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${selectedStand.color}20`,
                    color: selectedStand.color,
                    border: `1px solid ${selectedStand.color}40`,
                  }}
                >
                  {displayGroup} · {selectedStand.career}
                </span>
                <h2
                  className="neon-text text-2xl font-bold"
                  style={{ color: selectedStand.color }}
                >
                  {selectedStand.title}
                </h2>
                {statusItems.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {statusItems.map((item) => (
                      <StatusPill
                        key={item}
                        label={item}
                        color={selectedStand.color}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleClose}
                className="cursor-pointer rounded-lg border border-[#e8f4ff]/20 px-3 py-1 text-sm text-[#e8f4ff]/60 transition hover:border-[#00d4ff]/40 hover:text-[#00d4ff]"
              >
                ✕ Cerrar
              </button>
            </div>

            <button
              onClick={() =>
                selectedStand &&
                openAIModal(selectedStand, { teleportToHost: true })
              }
              className="mb-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#7b68ee]/40 bg-[#7b68ee]/15 py-3 text-sm font-semibold text-[#c4b5fd] transition hover:bg-[#7b68ee]/25"
            >
              <span>🤖</span>
              Hablar con el asistente IA
              <kbd className="ml-1 rounded border border-[#7b68ee]/40 px-1.5 text-[10px]">
                T
              </kbd>
            </button>

            <p className="mb-5 text-sm leading-relaxed text-[#e8f4ff]/85">
              {selectedStand.shortDescription}
            </p>

            <div
              className={`mb-5 grid gap-4 ${
                hasVideo || hasDemo ? "sm:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {hasVideo && (
                <div className="overflow-hidden rounded-xl border border-[#00d4ff]/20">
                  <p className="bg-[#001a33] px-3 py-1.5 text-xs font-medium text-[#00d4ff]">
                    Video de presentación
                  </p>
                  <div className="relative aspect-video w-full bg-[#001a33]">
                    <iframe
                      src={selectedStand.videoUrl}
                      title={`Video de ${selectedStand.title}`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {(selectedStand.technicalInfo ||
                  selectedStand.commercialInfo ||
                  selectedStand.detailedDescription) && (
                  <div className="flex-1 overflow-hidden rounded-xl border border-[#00d4ff]/20 bg-[#001a33]/50 p-4">
                    {selectedStand.technicalInfo && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-[#00d4ff]">
                          Información técnica
                        </p>
                        <p className="text-sm leading-relaxed text-[#e8f4ff]/80">
                          {selectedStand.technicalInfo}
                        </p>
                      </div>
                    )}
                    {selectedStand.commercialInfo && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-[#00d4ff]">
                          Información comercial
                        </p>
                        <p className="text-sm leading-relaxed text-[#e8f4ff]/80">
                          {selectedStand.commercialInfo}
                        </p>
                      </div>
                    )}
                    {!selectedStand.technicalInfo &&
                      !selectedStand.commercialInfo && (
                        <p className="text-sm leading-relaxed text-[#e8f4ff]/80">
                          {selectedStand.detailedDescription}
                        </p>
                      )}
                  </div>
                )}

                {hasDemo && (
                  <a
                    href={selectedStand.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#00d4ff]/40 bg-[#00d4ff]/10 py-4 text-sm font-semibold text-[#00d4ff] transition hover:bg-[#00d4ff]/20"
                  >
                    <span>↗</span> Ver demo del sistema
                  </a>
                )}
              </div>
            </div>

            <GallerySlider
              images={selectedStand.gallery}
              title={selectedStand.title}
              accentColor={selectedStand.color}
            />

            {selectedStand.features.length > 0 && (
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-[#00d4ff]">
                  Tecnologías utilizadas
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {selectedStand.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#e8f4ff]/70"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: selectedStand.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(selectedStand.contactName ||
              selectedStand.contactEmail ||
              selectedStand.contactPhone ||
              selectedStand.contactRole) && (
              <div className="mb-4 rounded-xl border border-[#00d4ff]/20 bg-[#001a33]/40 p-4">
                <h3 className="mb-3 text-sm font-semibold text-[#00d4ff]">
                  Contacto del expositor
                </h3>
                <dl className="grid gap-2 text-sm text-[#e8f4ff]/80 sm:grid-cols-2">
                  {selectedStand.contactName && (
                    <div>
                      <dt className="text-xs text-[#e8f4ff]/50">Nombre</dt>
                      <dd>{selectedStand.contactName}</dd>
                    </div>
                  )}
                  {selectedStand.contactRole && (
                    <div>
                      <dt className="text-xs text-[#e8f4ff]/50">Rol</dt>
                      <dd>{selectedStand.contactRole}</dd>
                    </div>
                  )}
                  {selectedStand.contactEmail && (
                    <div>
                      <dt className="text-xs text-[#e8f4ff]/50">Correo</dt>
                      <dd>
                        <a
                          href={`mailto:${selectedStand.contactEmail}`}
                          className="text-[#00d4ff] hover:underline"
                        >
                          {selectedStand.contactEmail}
                        </a>
                      </dd>
                    </div>
                  )}
                  {selectedStand.contactPhone && (
                    <div>
                      <dt className="text-xs text-[#e8f4ff]/50">Teléfono</dt>
                      <dd>
                        <a
                          href={`tel:${selectedStand.contactPhone}`}
                          className="text-[#00d4ff] hover:underline"
                        >
                          {selectedStand.contactPhone}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            <div
              className={`mt-2 flex flex-col gap-3 border-t border-[#00d4ff]/15 pt-5 sm:flex-row ${
                canStartConversation ? "" : "sm:justify-stretch"
              }`}
            >
              <button
                type="button"
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border py-3.5 text-sm font-semibold transition hover:brightness-110 ${
                  canStartConversation ? "flex-1" : "w-full"
                }`}
                style={{
                  borderColor: `${selectedStand.color}55`,
                  backgroundColor: `${selectedStand.color}14`,
                  color: selectedStand.color,
                }}
              >
                <span aria-hidden>♡</span>
                Guardar en mis favoritos
              </button>
              {canStartConversation && (
                <button
                  type="button"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#00d4ff]/40 bg-[#00d4ff]/10 py-3.5 text-sm font-semibold text-[#00d4ff] transition hover:bg-[#00d4ff]/20"
                >
                  <span aria-hidden>💬</span>
                  Iniciar conversación
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
