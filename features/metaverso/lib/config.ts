/** Backend UAPAverse — lista de proyectos para los stands */
export const BACKEND_UAPAVERSE_URL =
  process.env.BACKEND_UAPAVERSE_URL ??
  "https://backend-uapaverse.onrender.com";

/** Rutas API del módulo — ajusta si tu app las monta en otro path */
export const METAVERSO_API = {
  stands: "/api/metaverso/stands",
  gemini: "/api/metaverso/gemini",
} as const;
