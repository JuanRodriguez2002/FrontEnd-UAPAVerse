"use client";

import { ShieldAlert, X } from "lucide-react";

type AdminConfirmModalProps = {
  open: boolean;
  eyebrow: string;
  title: string;
  description: string;
  subject: string;
  confirmLabel: string;
  cancelLabel: string;
  closeLabel: string;
  tone?: "danger" | "success";
  onClose: () => void;
  onConfirm: () => void;
};

export function AdminConfirmModal({
  open,
  eyebrow,
  title,
  description,
  subject,
  confirmLabel,
  cancelLabel,
  closeLabel,
  tone = "danger",
  onClose,
  onConfirm,
}: AdminConfirmModalProps) {
  if (!open) return null;

  const toneClasses =
    tone === "success"
      ? "border-[#77f6c6]/25 bg-[#77f6c6]/10 text-[#77f6c6]"
      : "border-error/25 bg-error/10 text-error";

  const confirmClasses =
    tone === "success"
      ? "bg-[#77f6c6] text-[#003a2c] hover:shadow-[0_0_22px_rgba(119,246,198,0.35)]"
      : "bg-error text-error-container hover:shadow-[0_0_22px_rgba(255,180,171,0.3)]";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#000837]/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={title}>
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label={closeLabel} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#0e1a4f]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-[#7f8dab] hover:bg-white/5 hover:text-white" aria-label={closeLabel}>
          <X className="h-4 w-4" />
        </button>
        <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${toneClasses}`}>
          <ShieldAlert className="h-5 w-5" />
        </div>
        <p className="font-space text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
        <h2 className="mt-2 pr-8 font-sora text-xl font-bold text-neon-white">{title}</h2>
        <p className="mt-3 text-xs leading-relaxed text-[#9ca9c6]">{description}</p>
        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-[#e9edff]">
          {subject}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-[#aeb8d0] transition hover:bg-white/5 hover:text-white">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${confirmClasses}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
