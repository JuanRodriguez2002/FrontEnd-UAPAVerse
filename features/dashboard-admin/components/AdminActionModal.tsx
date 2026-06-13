"use client";

import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

type AdminActionModalProps = {
  open: boolean;
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  cancelLabel: string;
  closeLabel: string;
  fields: Array<{ key: string; label: string; placeholder: string }>;
  initialValues: Record<string, string>;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
};

export function AdminActionModal({
  open,
  eyebrow,
  title,
  description,
  submitLabel,
  cancelLabel,
  closeLabel,
  fields,
  initialValues,
  onClose,
  onSubmit,
}: AdminActionModalProps) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (open) setValues(initialValues);
  }, [initialValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#000837]/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={title}>
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label={closeLabel} />
      <form
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-secondary/20 bg-[#0e1a4f]/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.55),0_0_35px_rgba(230,180,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(values);
        }}
      >
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-[#7f8dab] hover:bg-white/5 hover:text-white" aria-label={closeLabel}>
          <X className="h-4 w-4" />
        </button>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
          <Pencil className="h-5 w-5" />
        </span>
        <p className="mt-4 font-space text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
        <h2 className="mt-1 font-sora text-xl font-bold text-neon-white">{title}</h2>
        <p className="mt-2 text-xs leading-relaxed text-[#8f9bb8]">{description}</p>
        <div className="mt-6 space-y-4">
          {fields.map((field) => (
            <label key={field.key} className="block">
              <span className="mb-1.5 block font-space text-[9px] font-bold uppercase tracking-[0.14em] text-[#8f9bb8]">{field.label}</span>
              <input
                required
                value={values[field.key] ?? ""}
                placeholder={field.placeholder}
                onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-xs text-white outline-none transition placeholder:text-[#5f6e90] focus:border-secondary/40 focus:bg-secondary/5"
              />
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-[#aeb8d0] transition hover:bg-white/5 hover:text-white">
            {cancelLabel}
          </button>
          <button type="submit" className="rounded-xl bg-gradient-to-r from-primary-container to-secondary-container px-4 py-2.5 text-xs font-bold text-white transition hover:shadow-primary-glow">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
