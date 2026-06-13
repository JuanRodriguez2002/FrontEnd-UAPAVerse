"use client";

import { Eye, X } from "lucide-react";

type AdminDetailsModalProps = {
  open: boolean;
  eyebrow: string;
  title: string;
  subject: string;
  closeLabel: string;
  fields: Array<{ label: string; value: string }>;
  onClose: () => void;
};

export function AdminDetailsModal({
  open,
  eyebrow,
  title,
  subject,
  closeLabel,
  fields,
  onClose,
}: AdminDetailsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#000837]/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={title}>
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label={closeLabel} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-primary/20 bg-[#0e1a4f]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55),0_0_35px_rgba(152,203,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-primary-container/15 blur-[55px]" />
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-[#7f8dab] hover:bg-white/5 hover:text-white" aria-label={closeLabel}>
          <X className="h-4 w-4" />
        </button>
        <div className="relative flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Eye className="h-5 w-5" />
          </span>
          <div>
            <p className="font-space text-[9px] font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            <h2 className="mt-1 font-sora text-xl font-bold text-neon-white">{title}</h2>
            <p className="mt-1 text-xs text-[#8f9bb8]">{subject}</p>
          </div>
        </div>
        <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label} className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5">
              <p className="font-space text-[8px] font-bold uppercase tracking-[0.16em] text-[#697797]">{field.label}</p>
              <p className="mt-1.5 break-words text-xs font-semibold text-[#e1e7f6]">{field.value}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-6 flex justify-end">
          <button onClick={onClose} className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-xs font-bold text-primary transition hover:bg-primary/20">
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
