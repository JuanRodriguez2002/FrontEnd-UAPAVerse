import type { MetaversoRoleName } from "@/features/metaverso/lib/auth-config";

export interface MetaversoUser {
  id: number;
  name: string;
  email: string;
  role: MetaversoRoleName;
}

export interface MetaversoSession {
  token: string | null;
  user: MetaversoUser | null;
}

/** Forma típica de `data.user` tras POST /api/uapaverse/login */
export interface LoginApiUser {
  id: number;
  name?: string;
  name_usuario?: string;
  email?: string;
  email_usuario?: string;
  role: string | { id: number; name_rol: string };
}

export interface LoginApiResponse {
  access_token: string;
  user: LoginApiUser;
  message?: string;
}
