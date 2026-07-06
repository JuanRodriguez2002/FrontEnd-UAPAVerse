import {
  EMPRESARIO_CONVERSATION_ROLES,
  METAVERSO_AUTH_STORAGE,
  METAVERSO_ROLES,
  METAVERSO_SESSION_CHANGED_EVENT,
  ROLE_DASHBOARD_PATHS,
  type MetaversoRoleName,
} from "@/features/metaverso/lib/auth-config";
import type {
  MetaversoSession,
  MetaversoUser,
} from "@/features/metaverso/types/session";

const ROLE_VALUES = new Set<string>(Object.values(METAVERSO_ROLES));

const EMPRESARIO_ROLES = new Set<string>(EMPRESARIO_CONVERSATION_ROLES);

function normalizeRole(value: unknown): MetaversoRoleName | null {
  if (typeof value === "string") {
    const role = value.trim().toUpperCase();
    return ROLE_VALUES.has(role) ? (role as MetaversoRoleName) : null;
  }

  if (value && typeof value === "object" && "name_rol" in value) {
    return normalizeRole((value as { name_rol: unknown }).name_rol);
  }

  return null;
}

export function isEmpresarioRole(role: string | null | undefined): boolean {
  if (!role) return false;
  return EMPRESARIO_ROLES.has(role.trim().toUpperCase());
}

export function parseStoredUser(raw: string | null): MetaversoUser | null {
  if (!raw) return null;

  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;

    const record = data as Record<string, unknown>;
    const role = normalizeRole(record.role);
    const id = Number(record.id);

    if (!role || Number.isNaN(id)) return null;

    return {
      id,
      name: String(record.name ?? record.name_usuario ?? ""),
      email: String(record.email ?? record.email_usuario ?? ""),
      role,
    };
  } catch {
    return null;
  }
}

export function readMetaversoSession(): MetaversoSession {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  const token = localStorage.getItem(METAVERSO_AUTH_STORAGE.tokenKey);
  const user = parseStoredUser(
    localStorage.getItem(METAVERSO_AUTH_STORAGE.userKey)
  );

  return { token, user };
}

/**
 * Guarda sesión igual que el login del proyecto principal y notifica al metaverso.
 * Uso: persistMetaversoSession(data.access_token, data.user)
 */
export function persistMetaversoSession(
  accessToken: string,
  user: unknown
): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(METAVERSO_AUTH_STORAGE.tokenKey, accessToken);
  localStorage.setItem(
    METAVERSO_AUTH_STORAGE.userKey,
    typeof user === "string" ? user : JSON.stringify(user)
  );
  notifyMetaversoSessionChanged();
}

/** Limpia sesión (logout) y notifica al metaverso */
export function clearMetaversoSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(METAVERSO_AUTH_STORAGE.tokenKey);
  localStorage.removeItem(METAVERSO_AUTH_STORAGE.userKey);
  notifyMetaversoSessionChanged();
}

export function isMetaversoLoggedIn(
  session: MetaversoSession = readMetaversoSession()
): boolean {
  return Boolean(session.token?.trim() && session.user);
}

export function hasMetaversoRole(
  role: MetaversoRoleName,
  session: MetaversoSession = readMetaversoSession()
): boolean {
  return session.user?.role === role;
}

export function canStartStandConversation(
  session: MetaversoSession = readMetaversoSession()
): boolean {
  if (!isMetaversoLoggedIn(session) || !session.user) return false;
  return isEmpresarioRole(session.user.role);
}

export function getDashboardPathForRole(
  role: MetaversoRoleName | string | null | undefined
): string | null {
  if (!role) return null;
  const normalized = role.trim().toUpperCase();
  return (
    ROLE_DASHBOARD_PATHS[
      normalized as keyof typeof ROLE_DASHBOARD_PATHS
    ] ?? null
  );
}

export function getDashboardPathForSession(
  session: MetaversoSession = readMetaversoSession()
): string | null {
  if (!isMetaversoLoggedIn(session) || !session.user) return null;
  return getDashboardPathForRole(session.user.role);
}

/** Llámalo en el proyecto principal tras login/logout si no usas persist/clear */
export function notifyMetaversoSessionChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(METAVERSO_SESSION_CHANGED_EVENT));
}
