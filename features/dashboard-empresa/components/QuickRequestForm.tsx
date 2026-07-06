"use client";

import { CalendarDays, CircleDollarSign, Loader2, SendHorizonal } from "lucide-react";
import { useState, useTransition } from "react";
import { createMeetingRequest } from "@/features/dashboard-empresa/actions/requestActions";
import type { Stand } from "@/features/dashboard-empresa/types/investors";

type QuickRequestFormProps = {
  stands: Stand[];
};

export function QuickRequestForm({ stands }: QuickRequestFormProps) {
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setStatus("");
    startTransition(async () => {
      const result = await createMeetingRequest({
        standId: String(formData.get("standId")),
        requestType: String(formData.get("requestType")) as "reunion" | "cotizacion",
        date: String(formData.get("date")),
        budget: String(formData.get("budget")),
        message: String(formData.get("message"))
      });

      setStatus(result.ok ? `Solicitud enviada. Referencia: ${result.reference}` : result.error);
    });
  }

  return (
    <section className="glass-panel rounded-[24px] p-5">
      <div className="mb-5">
        <p className="section-eyebrow">Solicitud rapida</p>
        <h2 className="mt-1 text-2xl font-black text-white">Reunion o cotizacion</h2>
      </div>

      <form action={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-slate-400">Stand</span>
          <select name="standId" className="professional-input w-full rounded-xl px-3 py-3 text-sm text-white outline-none">
            {stands.map((stand) => (
              <option key={stand.id} value={stand.id}>
                {stand.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-slate-400">Tipo</span>
            <select name="requestType" className="professional-input w-full rounded-xl px-3 py-3 text-sm text-white outline-none">
              <option value="reunion">Reunion</option>
              <option value="cotizacion">Cotizacion</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" />
              Fecha
            </span>
            <input name="date" type="date" className="professional-input w-full rounded-xl px-3 py-3 text-sm text-white outline-none" />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-slate-400">
            <CircleDollarSign className="h-3.5 w-3.5" />
            Presupuesto estimado
          </span>
          <input name="budget" placeholder="Ej: US$ 50K - US$ 100K" className="professional-input w-full rounded-xl px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-slate-400">Mensaje</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Describe interes, alcance y datos que deseas recibir..."
            className="professional-input w-full resize-none rounded-xl px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <button disabled={isPending} className="neon-button flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white disabled:opacity-70">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
          Enviar solicitud
        </button>

        {status && <p className="rounded-xl border border-sky-300/20 bg-sky-300/10 px-3 py-2 text-sm text-sky-100">{status}</p>}
      </form>
    </section>
  );
}