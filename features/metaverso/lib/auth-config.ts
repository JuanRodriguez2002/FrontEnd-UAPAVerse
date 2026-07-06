/**
 * Claves de localStorage — mismas que el login del proyecto principal:
 *   localStorage.setItem("token", data.access_token)
 *   localStorage.setItem("user", JSON.stringify(data.user))
 */
export const METAVERSO_AUTH_STORAGE = {
  tokenKey: "token",
  userKey: "user",
} as const;

/** Roles del backend UAPAverse */
export const METAVERSO_ROLES = {
  ADMIN: "ADMIN",
  ACADEMICO: "ACADEMICO",
  /** Rol en catálogo / API de roles */
  EMPRESARIO: "EMPRESARIO",
  /** Variante que devuelve el login en algunos flujos del proyecto principal */
  EMPRESARIAL: "EMPRESARIAL",
  EXPOSITOR: "EXPOSITOR",
} as const;

export type MetaversoRoleName =
  (typeof METAVERSO_ROLES)[keyof typeof METAVERSO_ROLES];

/**
 * Roles de empresario aceptados para "Iniciar conversación".
 * Incluye EMPRESARIO (API) y EMPRESARIAL (switch del login principal).
 */
export const EMPRESARIO_CONVERSATION_ROLES = [
  METAVERSO_ROLES.EMPRESARIO,
  METAVERSO_ROLES.EMPRESARIAL,
] as const;

export type EmpresarioConversationRole =
  (typeof EMPRESARIO_CONVERSATION_ROLES)[number];

/** @deprecated Usa EMPRESARIO_CONVERSATION_ROLES */
export const CONVERSATION_ALLOWED_ROLES: MetaversoRoleName[] = [
  ...EMPRESARIO_CONVERSATION_ROLES,
];

/** Evento interno para refrescar la sesión tras login/logout en la misma pestaña */
export const METAVERSO_SESSION_CHANGED_EVENT = "uapaverse:session-changed";

/** URL de login del backend (referencia para el proyecto principal) */
export const METAVERSO_LOGIN_URL =
  "https://backend-uapaverse.onrender.com/api/uapaverse/login";

/**
 * Ruta del dashboard según rol del usuario logueado.
 * Ajusta aquí si cambian las rutas en el proyecto principal.
 */
export const ROLE_DASHBOARD_PATHS = {
  ADMIN: "/dashboard-admin",
  ACADEMICO: "/dashboard-visitante",
  EMPRESARIO: "/dashboard-empresa",
  EMPRESARIAL: "/dashboard-empresa",
  EXPOSITOR: "/dashboard-presentador",
} as const satisfies Record<string, string>;
