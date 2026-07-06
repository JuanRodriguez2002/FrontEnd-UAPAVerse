"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { fetchStandById, createOrUpdateStand, fetchCategories } from "@/features/dashboard-presentador/actions/presenterActions";
import type { ApiProject, ApiCategory, CreateProjectInput } from "@/features/dashboard-presentador/services/standService";

function getUserId(): number {
  if (typeof window === "undefined") return 0;
  try {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    return user.id ?? 0;
  } catch { return 0; }
}

export function CrearStandPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [stand, setStand] = useState<ApiProject | null>(null);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CreateProjectInput>({
    name_proyecto: "",
    descripcion_proyecto: "",
    id_categoria: 1,
    id_usuario: getUserId(),
    carrera_asociada: "",
    tecnologias_utilizadas: "",
    nivel_madurez_tecnologica: "",
    estado_desarrollo: "En desarrollo",
    informacion_tecnica: "",
    informacion_comercial: "",
    demo_url: "",
    contacto_nombre: "",
    contacto_telefono: "",
    contacto_correo: "",
    nombre_grupo: "",
    contacto_rol: "",
  });

  useEffect(() => {
    async function load() {
      setLoadingData(true);
      try {
        const cats = await fetchCategories();
        setCategories(cats);
        if (editId) {
          const s = await fetchStandById(editId);
          setStand(s);
          setForm({
            name_proyecto: s.name_proyecto,
            descripcion_proyecto: s.descripcion_proyecto,
            id_categoria: s.id_categoria,
            id_usuario: s.id_usuario,
            carrera_asociada: s.carrera_asociada ?? "",
            tecnologias_utilizadas: s.tecnologias_utilizadas ?? "",
            nivel_madurez_tecnologica: s.nivel_madurez_tecnologica ?? "",
            estado_desarrollo: s.estado_desarrollo ?? "",
            informacion_tecnica: s.informacion_tecnica ?? "",
            informacion_comercial: s.informacion_comercial ?? "",
            demo_url: s.demo_url ?? "",
            contacto_nombre: s.contacto_nombre,
            contacto_telefono: s.contacto_telefono,
            contacto_correo: s.contacto_correo,
            nombre_grupo: s.nombre_grupo ?? "",
            contacto_rol: s.contacto_rol ?? "",
          });
        }
      } catch (e) {
        setError("Error cargando datos.");
      } finally {
        setLoadingData(false);
      }
    }
    void load();
  }, [editId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createOrUpdateStand(form, editId ?? undefined);
      router.push("/dashboard-presentador");
    } catch {
      setError("Error al guardar el proyecto. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#697797] focus:border-primary/40 focus:bg-primary/5";
  const labelClass = "mb-1.5 block font-space text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f9bb8]";

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-6 backdrop-blur-xl space-y-5">
        <h2 className="font-sora text-base font-bold text-neon-white">
          {editId ? "Editar proyecto" : "Nuevo proyecto"}
        </h2>

        {error && (
          <p className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">{error}</p>
        )}

        {/* Sección 1: Info general */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nombre del proyecto</label>
            <input value={form.name_proyecto} onChange={(e) => setForm((p) => ({ ...p, name_proyecto: e.target.value }))} required className={inputClass} placeholder="Ej. UAPAVerse" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Descripción</label>
            <textarea value={form.descripcion_proyecto} onChange={(e) => setForm((p) => ({ ...p, descripcion_proyecto: e.target.value }))} required rows={3} className={`${inputClass} resize-none`} placeholder="Describe tu proyecto..." />
          </div>
          <div>
            <label className={labelClass}>Categoría</label>
            <select value={form.id_categoria} onChange={(e) => setForm((p) => ({ ...p, id_categoria: Number(e.target.value) }))} className="w-full rounded-xl border border-white/10 bg-[#0e1a4f] px-4 py-2.5 text-sm text-white outline-none focus:border-primary/40">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name_categoria}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado de desarrollo</label>
            <select value={form.estado_desarrollo} onChange={(e) => setForm((p) => ({ ...p, estado_desarrollo: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-[#0e1a4f] px-4 py-2.5 text-sm text-white outline-none focus:border-primary/40">
              {["En desarrollo", "Prototipo funcional", "Prototipo avanzado", "Listo para producción"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Carrera asociada</label>
            <input value={form.carrera_asociada} onChange={(e) => setForm((p) => ({ ...p, carrera_asociada: e.target.value }))} className={inputClass} placeholder="Ej. Ingeniería de Software" />
          </div>
          <div>
            <label className={labelClass}>Tecnologías utilizadas</label>
            <input value={form.tecnologias_utilizadas} onChange={(e) => setForm((p) => ({ ...p, tecnologias_utilizadas: e.target.value }))} className={inputClass} placeholder="Ej. React, NestJS, PostgreSQL" />
          </div>
          <div>
            <label className={labelClass}>Demo URL</label>
            <input value={form.demo_url} onChange={(e) => setForm((p) => ({ ...p, demo_url: e.target.value }))} className={inputClass} placeholder="https://demo.ejemplo.com" />
          </div>
          <div>
            <label className={labelClass}>Nivel de madurez tecnológica</label>
            <input value={form.nivel_madurez_tecnologica} onChange={(e) => setForm((p) => ({ ...p, nivel_madurez_tecnologica: e.target.value }))} className={inputClass} placeholder="Ej. TRL 6" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Información técnica</label>
            <textarea value={form.informacion_tecnica} onChange={(e) => setForm((p) => ({ ...p, informacion_tecnica: e.target.value }))} rows={2} className={`${inputClass} resize-none`} placeholder="Arquitectura, stack, decisiones técnicas..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Información comercial</label>
            <textarea value={form.informacion_comercial} onChange={(e) => setForm((p) => ({ ...p, informacion_comercial: e.target.value }))} rows={2} className={`${inputClass} resize-none`} placeholder="Modelo de negocio, mercado objetivo..." />
          </div>
        </div>

        {/* Sección 2: Contacto */}
        <div className="border-t border-white/10 pt-5">
          <p className="mb-4 font-sora text-sm font-bold text-neon-white">Datos de contacto</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Nombre del contacto</label>
              <input value={form.contacto_nombre} onChange={(e) => setForm((p) => ({ ...p, contacto_nombre: e.target.value }))} required className={inputClass} placeholder="Nombre completo" />
            </div>
            <div>
              <label className={labelClass}>Rol del contacto</label>
              <input value={form.contacto_rol} onChange={(e) => setForm((p) => ({ ...p, contacto_rol: e.target.value }))} className={inputClass} placeholder="Ej. Líder del proyecto" />
            </div>
            <div>
              <label className={labelClass}>Teléfono</label>
              <input value={form.contacto_telefono} onChange={(e) => setForm((p) => ({ ...p, contacto_telefono: e.target.value }))} required className={inputClass} placeholder="8095551234" />
            </div>
            <div>
              <label className={labelClass}>Correo</label>
              <input type="email" value={form.contacto_correo} onChange={(e) => setForm((p) => ({ ...p, contacto_correo: e.target.value }))} required className={inputClass} placeholder="contacto@email.com" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Nombre del grupo</label>
              <input value={form.nombre_grupo} onChange={(e) => setForm((p) => ({ ...p, nombre_grupo: e.target.value }))} className={inputClass} placeholder="Ej. Grupo UAPAVerse" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => router.push("/dashboard-presentador")} className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-[#9ca9c6] transition hover:bg-white/10">
          Cancelar
        </button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-[#2563eb] px-6 py-2.5 text-sm font-bold text-white shadow-primary-glow transition hover:shadow-primary-glow-hover disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "Guardando..." : editId ? "Actualizar proyecto" : "Crear proyecto"}
        </button>
      </div>
    </form>
  );
}
