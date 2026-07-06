export { MetaversoShell } from "./components/MetaversoShell";
export { useUapaStore } from "./store/useUapaStore";
export type { RoomMeta, AppPhase } from "./store/useUapaStore";
export { METAVERSO_API } from "./lib/config";
export {
  METAVERSO_AUTH_STORAGE,
  METAVERSO_ROLES,
  EMPRESARIO_CONVERSATION_ROLES,
  CONVERSATION_ALLOWED_ROLES,
  METAVERSO_LOGIN_URL,
  ROLE_DASHBOARD_PATHS,
} from "./lib/auth-config";
export { useMetaversoSession } from "./hooks/useMetaversoSession";
export {
  readMetaversoSession,
  persistMetaversoSession,
  clearMetaversoSession,
  notifyMetaversoSessionChanged,
  canStartStandConversation,
  isEmpresarioRole,
  getDashboardPathForRole,
  getDashboardPathForSession,
} from "./utils/session";
export type {
  MetaversoUser,
  MetaversoSession,
  LoginApiUser,
  LoginApiResponse,
} from "./types/session";
export { getStandsCatalog } from "./services/stands-api";
export { askGeminiAssistant } from "./services/gemini-api";