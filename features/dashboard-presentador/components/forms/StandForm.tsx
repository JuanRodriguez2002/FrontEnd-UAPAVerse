"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileArchive, Image as ImageIcon, Loader2, Tag, Upload, X } from "lucide-react";
import type { Stand, StandFormData } from "@/features/dashboard-presentador/types/stand";
import api from "@/app/lib/api";

type StandFormProps = {
  stand: any; 
  onSave: (data: any, id?: string) => Promise<void>;
};

const EMPTY: StandFormData = {
  nombre: "",
  descripcion: "",
  tecnologia: "",
  categoria: "",
  tagline: "",
  tags: [],
  sitioWeb: "",
  contacto: "",
  stackPrincipal: "",
  requisitosHardware: "",
  enlaceRepositorio: "",
  representante: "",
  emailHolograma: "",
  logoNombre: "",
  bannerNombre: "",
  demoNombre: "",
  status: "borrador",
  colorAcento: "#1f97e7",
  name_proyecto: "",
  descripcion_proyecto: "",
  id_categoria: undefined,
  demo_url: "",
  contacto_nombre: "",
  contacto_telefono: "",
  contacto_correo: "",
  informacion_comercial: "",
  tecnologias_utilizadas: "",
  estado_desarrollo: "",
  estado_proyecto: ""
};

interface Categoria {
  id: number;
  name_categoria: string;
}

export function StandForm({ stand, onSave }: StandFormProps) {
  const [form, setForm] = useState<StandFormData>(EMPTY);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);
  const demoRef = useRef<HTMLInputElement>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // 1. Cargar categorías al montar el componente (Filtrando errores 401 si se inyecta el token)
  useEffect(() => {
    async function loadCategorias() {
      try {
        const response = await api.get('/uapaverse/category/list');
        setCategorias(Array.isArray(response.data) ? response.data : []);
      } catch (err: any) {
        console.error("Error crítico cargando categorías desde el backend:", err.response?.data || err.message);
      }
    }
    loadCategorias();
  }, []);

  // 2. FIX EDICIÓN: Forzado seguro con 'as any' para ignorar conflictos de tipos con sub-propiedades
  useEffect(() => {
    if (stand) {
      const categoriaId = stand.id_categoria || stand.category?.id || "";
      setForm({
        ...(EMPTY as any),
        nombre: stand.name_proyecto || "",
        descripcion: stand.descripcion_proyecto || "",
        categoria: categoriaId.toString(), 
        sitioWeb: stand.demo_url || "",
        representante: stand.contacto_nombre || "",
        contacto: stand.contacto_telefono || "",
        emailHolograma: stand.contacto_correo || "",
        tagline: stand.informacion_comercial || "",
        stackPrincipal: stand.tecnologias_utilizadas || "",
        status: stand.estado_desarrollo === "En desarrollo" ? "activo" : "borrador",
        estado_proyecto: stand.estado_proyecto || "PENDIENTE"
      } as any);
    } else {
      setForm(EMPTY);
    }
  }, [stand]);

  function set(field: keyof StandFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t || form.tags.includes(t)) return;
    setForm((prev) => ({ ...prev, tags: [...prev.tags, t] }));
    setTagInput("");
  }

  function removeTag(tag: string) {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  }

  function handleFileChange(field: "logoNombre" | "bannerNombre" | "demoNombre", e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, [field]: file.name }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      setError("El nombre y la descripción son obligatorios.");
      return;
    }

    setSaving(true);
    setError(null);

    let userId = 1; 
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser.id || 1;
        } catch (err) {
          console.error("Error al procesar el usuario de localStorage:", err);
        }
      }
    }

    const payload = {
      name_proyecto: form.nombre,
      descripcion_proyecto: form.descripcion,
      id_categoria: Number(form.categoria) || 1, 
      id_usuario: userId, 
      carrera_asociada: "Ingeniería de Software",
      tecnologias_utilizadas: form.stackPrincipal,
      nivel_madurez_tecnologica: "Prototipo funcional",
      estado_desarrollo: form.status === "activo" ? "En desarrollo" : "Borrador",
      estado_proyecto: stand ? stand.estado_proyecto : "PENDIENTE", 
      informacion_tecnica: form.stackPrincipal || "N/A",
      informacion_comercial: form.tagline || "N/A",
      demo_url: form.sitioWeb || "",
      contacto_nombre: form.representante || "",
      contacto_telefono: form.contacto || "",
      contacto_correo: form.emailHolograma || "",
      nombre_grupo: "Grupo " + form.nombre,
      contacto_rol: "Expositor principal"
    };

    try {
      await onSave(payload, stand?.id?.toString());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Error al guardar. Verifica la conexión con el servidor o los headers.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#697797] focus:border-primary/40 focus:bg-primary/5";
  const labelClass = "font-space text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f9bb8]";
  const sectionClass =
    "rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-6 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Información General ── */}
      <div className={sectionClass}>
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">1</span>
          <h2 className="font-sora text-base font-bold text-neon-white">Información General</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Nombre del proyecto / stand</label>
            <input value={form.nombre} onChange={(e) => set("nombre", e.target.value)}
              placeholder="Ej. Sistema de Navegación Cuántica" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Categoría tecnológica</label>
            <select value={form.categoria} onChange={(e) => set("categoria", e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0e1a4f] px-4 py-2.5 text-sm text-white outline-none transition focus:border-primary/40">
              <option value="">Seleccionar...</option>
              {categorias.map((c) => <option key={c.id} value={c.id.toString()}>{c.name_categoria}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className={labelClass}>Descripción inmersiva</label>
            <textarea value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)}
              rows={3} placeholder="Describe la experiencia que los visitantes tendrán en tu stand..."
              className={`${inputClass} resize-none`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Palabras clave (tags)</label>
            <div className="flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Ej. innovación, IA, nube" className={`${inputClass} flex-1`} />
              <button type="button" onClick={addTag}
                className="flex items-center gap-1 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary/20">
                <Tag className="h-3.5 w-3.5" />
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-space text-[11px] text-primary">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-error">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Tagline</label>
            <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)}
              placeholder="Una frase que defina tu proyecto" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Estado</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value as StandFormData["status"])}
              className="rounded-xl border border-white/10 bg-[#0e1a4f] px-4 py-2.5 text-sm text-white outline-none transition focus:border-primary/40">
              <option value="borrador">Borrador</option>
              <option value="activo">Active</option>
              <option value="revision">En revisión</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Color de acento</label>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <input type="color" value={form.colorAcento} onChange={(e) => set("colorAcento", e.target.value)}
                className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent" />
              <span className="font-space text-xs text-[#8f9bb8]">{form.colorAcento}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Especificaciones Técnicas ── */}
      <div className={sectionClass}>
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary/10 text-secondary text-xs font-bold">2</span>
          <h2 className="font-sora text-base font-bold text-neon-white">Especificaciones Técnicas</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Stack principal</label>
            <input value={form.stackPrincipal} onChange={(e) => set("stackPrincipal", e.target.value)}
              placeholder="Ej. React, Python, WebGL" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Requisitos de hardware (visitante)</label>
            <input value={form.requisitosHardware} onChange={(e) => set("requisitosHardware", e.target.value)}
              placeholder="Ej. Gafas VR opcionales" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className={labelClass}>Enlace de repositorio o documentación</label>
            <input value={form.enlaceRepositorio} onChange={(e) => set("enlaceRepositorio", e.target.value)}
              placeholder="https://github.com/..." className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Datos de Contacto (Holograma) ── */}
      <div className={sectionClass}>
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#77f6c6]/10 text-[#77f6c6] text-xs font-bold">3</span>
          <h2 className="font-sora text-base font-bold text-neon-white">Datos de Contacto (Holograma)</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Representante principal</label>
            <input value={form.representante} onChange={(e) => set("representante", e.target.value)}
              placeholder="Nombre completo" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email de contacto</label>
            <input type="email" value={form.emailHolograma} onChange={(e) => set("emailHolograma", e.target.value)}
              placeholder="email@empresa.com" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Sitio web</label>
            <input value={form.sitioWeb} onChange={(e) => set("sitioWeb", e.target.value)}
              placeholder="https://miproyecto.com" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Contacto general</label>
            <input value={form.contacto} onChange={(e) => set("contacto", e.target.value)}
              placeholder="Teléfono o contacto alternativo" className={inputClass} />
          </div>
        </div>
      </div>

      {/* ── Assets Digitales ── */}
      <div className={sectionClass}>
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ffb86b]/10 text-[#ffc27d] text-xs font-bold">4</span>
          <h2 className="font-sora text-base font-bold text-neon-white">Assets Digitales</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={`${labelClass} mb-2 block`}>Logo del proyecto</label>
            <input ref={logoRef} type="file" accept=".png,.svg" className="hidden"
              onChange={(e) => handleFileChange("logoNombre", e)} />
            <button type="button" onClick={() => logoRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 py-6 transition hover:border-primary/30 hover:bg-primary/5">
              <ImageIcon className="h-6 w-6 text-[#7180a5]" />
              <span className="text-xs font-semibold text-[#8f9bb8]">
                {form.logoNombre || "Logo del proyecto"}
              </span>
              <span className="font-space text-[10px] text-[#657394]">PNG / SVG · max 2MB</span>
            </button>
          </div>

          <div>
            <label className={`${labelClass} mb-2 block`}>Banner del stand</label>
            <input ref={bannerRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden"
              onChange={(e) => handleFileChange("bannerNombre", e)} />
            <button type="button" onClick={() => bannerRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 py-6 transition hover:border-primary/30 hover:bg-primary/5">
              <Upload className="h-6 w-6 text-[#7180a5]" />
              <span className="text-xs font-semibold text-[#8f9bb8]">
                {form.bannerNombre || "Banner del stand"}
              </span>
              <span className="font-space text-[10px] text-[#657394]">1920×800 recomendado</span>
            </button>
          </div>

          <div className="sm:col-span-2">
            <label className={`${labelClass} mb-2 block`}>Ejecutable demo (opcional)</label>
            <input ref={demoRef} type="file" accept=".zip,.gltf,.glb" className="hidden"
              onChange={(e) => handleFileChange("demoNombre", e)} />
            <button type="button" onClick={() => demoRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-3 transition hover:border-primary/30 hover:bg-primary/5">
              <FileArchive className="h-5 w-5 text-[#7180a5]" />
              <div className="text-left">
                <p className="text-sm font-semibold text-[#8f9bb8]">
                  {form.demoNombre || "Subir archivo .ZIP o .GLTF"}
                </p>
                <p className="font-space text-[10px] text-[#657394]">Max 50MB</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Vista previa ── */}
      <div className={sectionClass}>
        <h2 className="mb-4 font-sora text-base font-bold text-neon-white">Vista previa</h2>
        <div className="max-w-xs overflow-hidden rounded-xl border border-white/10">
          <div className="h-24 w-full"
            style={{ background: `linear-gradient(135deg, ${form.colorAcento}50, ${form.colorAcento}10)` }} />
          <div className="bg-[#09164b] p-4">
            <p className="font-sora text-sm font-bold text-neon-white">{form.nombre || "Nombre del stand"}</p>
            <p className="mt-0.5 font-space text-[10px] text-[#8f9bb8]">{form.categoria || "Categoría"}</p>
            <p className="mt-2 line-clamp-2 text-xs text-[#657394]">{form.descripcion || "Descripción del proyecto..."}</p>
            {form.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {form.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 font-space text-[9px] text-primary">{t}</span>
                ))}
              </div>
            )}
            <button type="button" className="mt-3 w-full rounded-lg py-1.5 text-xs font-bold text-white transition"
              style={{ backgroundColor: form.colorAcento }}>
              Visitar stand
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">{error}</p>
      )}

      <div className="flex items-center justify-end gap-3">
        {success && (
          <span className="flex items-center gap-1.5 text-sm text-[#77f6c6]">
            <CheckCircle2 className="h-4 w-4" />
            Guardado correctamente
          </span>
        )}
        <button type="button" onClick={() => window.history.back()}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-[#9ca9c6] transition hover:bg-white/10">
          Guardar borrador
        </button>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-[#2563eb] px-6 py-2.5 text-sm font-bold text-white shadow-primary-glow transition hover:shadow-primary-glow-hover disabled:opacity-60">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "Guardando..." : stand ? "Actualizar stand" : "Desplegar stand"}
        </button>
      </div>
    </form>
  );
}