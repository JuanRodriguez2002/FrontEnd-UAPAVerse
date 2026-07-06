"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2, Eye, EyeOff, Loader2, MessageSquare, Shield, User } from "lucide-react";
import { fetchProfile, saveProfile } from "@/features/dashboard-presentador/actions/presenterActions";

type AlertToggle = {
  id: string;
  label: string;
  description: string;
  icon: typeof Bell;
  enabled: boolean;
};

const DEFAULT_ALERTS: AlertToggle[] = [
  { id: "visitor", label: "Visitor Analytics", description: "Recibe notificaciones de visitas en tiempo real", icon: Eye, enabled: true },
  { id: "messages", label: "Direct Messages", description: "Alertas de mensajes de empresas interesadas", icon: MessageSquare, enabled: true },
  { id: "system", label: "System Updates", description: "Actualizaciones del sistema UAPA VERSE", icon: Bell, enabled: false },
];

function getUserId(): number {
  if (typeof window === "undefined") return 0;
  try {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    return user.id ?? 0;
  } catch { return 0; }
}

export function ConfigurationPanel() {
  const avatarRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({ name_usuario: "", email_usuario: "", avatarUrl: "" });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileOk, setProfileOk] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [security, setSecurity] = useState({ paymentToken: "", secretKey: "" });
  const [showToken, setShowToken] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [savingSec, setSavingSec] = useState(false);
  const [secOk, setSecOk] = useState(false);

  const [alerts, setAlerts] = useState<AlertToggle[]>(DEFAULT_ALERTS);

  useEffect(() => {
    const userId = getUserId();
    if (!userId) { setLoadingProfile(false); return; }
    fetchProfile(userId)
      .then((data: unknown) => {
        const d = data as { name_usuario?: string; email_usuario?: string };
        setProfile((p) => ({
          ...p,
          name_usuario: d.name_usuario ?? "",
          email_usuario: d.email_usuario ?? "",
        }));
      })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, []);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile((p) => ({ ...p, avatarUrl: URL.createObjectURL(file) }));
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileError(null);
    try {
      const userId = getUserId();
      await saveProfile(userId, { name_usuario: profile.name_usuario, email_usuario: profile.email_usuario });
      setProfileOk(true);
      setTimeout(() => setProfileOk(false), 3000);
    } catch {
      setProfileError("Error al guardar el perfil.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function saveSecurity(e: React.FormEvent) {
    e.preventDefault();
    setSavingSec(true);
    await new Promise((r) => setTimeout(r, 700));
    setSavingSec(false);
    setSecOk(true);
    setTimeout(() => setSecOk(false), 3000);
  }

  function toggleAlert(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-[#697797] focus:border-primary/40 focus:bg-primary/5";
  const labelClass = "mb-1.5 block font-space text-[10px] font-bold uppercase tracking-[0.18em] text-[#8f9bb8]";
  const cardClass = "rounded-2xl border border-white/10 bg-[#0e1a4f]/60 p-6 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl";

  const avatarLetter = (profile.name_usuario || "U").slice(0, 2).toUpperCase();

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

      {/* ── Perfil ── */}
      <form onSubmit={handleSaveProfile} className={`${cardClass} flex flex-col gap-5`}>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <h2 className="font-sora text-base font-bold text-neon-white">Perfil</h2>
        </div>

        {loadingProfile ? (
          <div className="flex items-center gap-2 text-sm text-[#8f9bb8]">
            <Loader2 className="h-4 w-4 animate-spin" /> Cargando perfil...
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => avatarRef.current?.click()}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-container to-secondary-container shadow-primary-glow transition hover:opacity-80"
              >
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-sora text-lg font-bold text-white">
                    {avatarLetter}
                  </span>
                )}
              </button>
              <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <div>
                <p className="text-sm font-bold text-neon-white">{profile.name_usuario || "Usuario"}</p>
                <button type="button" onClick={() => avatarRef.current?.click()} className="mt-1 font-space text-[10px] text-primary hover:underline">
                  Cambiar imagen →
                </button>
              </div>
            </div>

            {profileError && (
              <p className="rounded-xl border border-error/20 bg-error/10 px-4 py-2.5 text-sm text-error">{profileError}</p>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  value={profile.name_usuario}
                  onChange={(e) => setProfile((p) => ({ ...p, name_usuario: e.target.value }))}
                  className={inputClass}
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className={labelClass}>Correo electrónico</label>
                <input
                  type="email"
                  value={profile.email_usuario}
                  onChange={(e) => setProfile((p) => ({ ...p, email_usuario: e.target.value }))}
                  className={inputClass}
                  placeholder="correo@email.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              {profileOk && (
                <span className="flex items-center gap-1.5 text-sm text-[#77f6c6]">
                  <CheckCircle2 className="h-4 w-4" /> Guardado
                </span>
              )}
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-container to-[#2563eb] px-5 py-2 text-sm font-bold text-white shadow-primary-glow transition hover:shadow-primary-glow-hover disabled:opacity-60"
              >
                {savingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
                {savingProfile ? "Guardando..." : "Guardar perfil"}
              </button>
            </div>
          </>
        )}
      </form>

      {/* ── Seguridad + Alertas ── */}
      <div className="flex flex-col gap-5">

        <form onSubmit={saveSecurity} className={`${cardClass} flex flex-col gap-5`}>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-secondary" />
            <h2 className="font-sora text-base font-bold text-neon-white">Terminal Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Payment Token (API)</label>
              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  value={security.paymentToken}
                  onChange={(e) => setSecurity((s) => ({ ...s, paymentToken: e.target.value }))}
                  placeholder="••••••••••••••••"
                  className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowToken((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7180a5] hover:text-white">
                  {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Secret Key</label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  value={security.secretKey}
                  onChange={(e) => setSecurity((s) => ({ ...s, secretKey: e.target.value }))}
                  placeholder="••••••••••••••••"
                  className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowSecret((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7180a5] hover:text-white">
                  {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {secOk && (
              <span className="flex items-center gap-1.5 text-sm text-[#77f6c6]">
                <CheckCircle2 className="h-4 w-4" /> Actualizado
              </span>
            )}
            <button
              type="submit"
              disabled={savingSec}
              className="flex items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-2 text-sm font-bold text-secondary transition hover:bg-secondary/20 disabled:opacity-60"
            >
              {savingSec && <Loader2 className="h-4 w-4 animate-spin" />}
              {savingSec ? "Actualizando..." : "Update Credentials"}
            </button>
          </div>
        </form>

        <div className={cardClass}>
          <div className="mb-5 flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#77f6c6]" />
            <h2 className="font-sora text-base font-bold text-neon-white">Neural Alerts</h2>
          </div>
          <div className="space-y-4">
            {alerts.map(({ id, label, description, icon: Icon, enabled }) => (
              <div key={id} className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#7180a5]" />
                  <div>
                    <p className="text-sm font-semibold text-neon-white">{label}</p>
                    <p className="text-xs text-[#8f9bb8]">{description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAlert(id)}
                  aria-label={`Toggle ${label}`}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${enabled ? "bg-primary-container" : "bg-white/10"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
