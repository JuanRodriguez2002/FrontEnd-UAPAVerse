import api from "@/app/lib/api";

// ── Tipos de la API ──────────────────────────────────────────────────────────

export type ApiProject = {
  id: number;
  name_proyecto: string;
  descripcion_proyecto: string;
  id_categoria: number;
  id_usuario: number;
  carrera_asociada: string;
  tecnologias_utilizadas: string;
  nivel_madurez_tecnologica: string;
  estado_desarrollo: string;
  informacion_tecnica: string;
  informacion_comercial: string;
  demo_url: string;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_correo: string;
  nombre_grupo: string;
  contacto_rol: string;
  estado_proyecto: string;
  created_at: string;
  category?: { id: number; name_categoria: string };
};

export type ApiCategory = {
  id: number;
  name_categoria: string;
};

export type ApiResource = {
  id: number;
  name_recurso: string;
  type_recurso: "VIDEO" | "IMAGEN" | "DOCUMENTO" | "ENLACE";
  route_recurso: string;
  id_proyecto: number;
};

export type CreateProjectInput = {
  name_proyecto: string;
  descripcion_proyecto: string;
  id_categoria: number;
  id_usuario: number;
  carrera_asociada?: string;
  tecnologias_utilizadas?: string;
  nivel_madurez_tecnologica?: string;
  estado_desarrollo?: string;
  informacion_tecnica?: string;
  informacion_comercial?: string;
  demo_url?: string;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_correo: string;
  nombre_grupo?: string;
  contacto_rol?: string;
};

export type UpdateProjectInput = Partial<CreateProjectInput> & {
  estado_proyecto?: string;
};

export type CreateResourceInput = {
  name_recurso: string;
  type_recurso: "VIDEO" | "IMAGEN" | "DOCUMENTO" | "ENLACE";
  route_recurso: string;
  id_proyecto: number;
};

// ── Stats (siguen siendo locales hasta que haya endpoint) ────────────────────

export type PresenterStats = {
  totalVisitas: number;
  empresasInteresadas: number;
  propuestasRecibidas: number;
  visitasGrowth: number;
  empresasGrowth: number;
  propuestasGrowth: number;
  tendencia14Dias: { dia: string; visitas: number; propuestas: number }[];
  visitasPorHora: { hora: string; visitas: number }[];
  porSector: { sector: string; pct: number; color: string }[];
};

// ── Proyectos ────────────────────────────────────────────────────────────────

export async function getStands(): Promise<ApiProject[]> {
  const data = await api.get<ApiProject[] | { data: ApiProject[] }>("/uapaverse/project/list");
  return Array.isArray(data) ? data : (data as { data: ApiProject[] }).data ?? [];
}

export async function getStandById(id: string | number): Promise<ApiProject> {
  return api.get<ApiProject>(`/uapaverse/project/${id}`);
}

export async function saveStand(data: CreateProjectInput, id?: string | number): Promise<ApiProject> {
  if (id) {
    return api.put<ApiProject>(`/uapaverse/project/${id}`, data);
  }
  return api.post<ApiProject>("/uapaverse/project/create", data);
}

export async function deleteStand(id: string | number): Promise<void> {
  return api.delete<void>(`/uapaverse/project/${id}`);
}

// ── Categorías ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<ApiCategory[]> {
  const data = await api.get<ApiCategory[] | { data: ApiCategory[] }>("/uapaverse/category/list");
  return Array.isArray(data) ? data : (data as { data: ApiCategory[] }).data ?? [];
}

// ── Recursos multimedia ──────────────────────────────────────────────────────

export async function getResourcesByProject(projectId: number): Promise<ApiResource[]> {
  const data = await api.get<ApiResource[] | { data: ApiResource[] }>(`/uapaverse/resource/project/${projectId}`);
  return Array.isArray(data) ? data : (data as { data: ApiResource[] }).data ?? [];
}

export async function createResource(data: CreateResourceInput): Promise<ApiResource> {
  return api.post<ApiResource>("/uapaverse/resource/create", data);
}

export async function updateResource(id: number, data: Partial<CreateResourceInput>): Promise<ApiResource> {
  return api.put<ApiResource>(`/uapaverse/resource/${id}`, data);
}

export async function deleteResource(id: number): Promise<void> {
  return api.delete<void>(`/uapaverse/resource/${id}`);
}

// ── Perfil del presentador ───────────────────────────────────────────────────

export async function getPresenterProfile(userId: number) {
  return api.get(`/uapaverse/user/${userId}`);
}

export async function updatePresenterProfile(userId: number, data: {
  name_usuario?: string;
  email_usuario?: string;
  rol_id?: number;
}) {
  return api.put(`/uapaverse/user/${userId}`, data);
}

// ── Stats locales (mientras no haya endpoint) ────────────────────────────────

export async function getPresenterStats(): Promise<PresenterStats> {
  return {
    totalVisitas: 1560,
    empresasInteresadas: 22,
    propuestasRecibidas: 7,
    visitasGrowth: 12,
    empresasGrowth: 8,
    propuestasGrowth: 3,
    tendencia14Dias: [
      { dia: "D01", visitas: 62, propuestas: 2 },
      { dia: "D02", visitas: 58, propuestas: 1 },
      { dia: "D03", visitas: 75, propuestas: 4 },
      { dia: "D04", visitas: 45, propuestas: 1 },
      { dia: "D05", visitas: 50, propuestas: 2 },
      { dia: "D06", visitas: 68, propuestas: 3 },
      { dia: "D07", visitas: 72, propuestas: 5 },
      { dia: "D08", visitas: 55, propuestas: 2 },
      { dia: "D09", visitas: 60, propuestas: 3 },
      { dia: "D10", visitas: 48, propuestas: 1 },
      { dia: "D11", visitas: 65, propuestas: 4 },
      { dia: "D12", visitas: 70, propuestas: 3 },
      { dia: "D13", visitas: 58, propuestas: 2 },
      { dia: "D14", visitas: 63, propuestas: 4 },
    ],
    visitasPorHora: [
      { hora: "00", visitas: 5 }, { hora: "02", visitas: 3 },
      { hora: "04", visitas: 2 }, { hora: "06", visitas: 8 },
      { hora: "08", visitas: 48 }, { hora: "10", visitas: 55 },
      { hora: "12", visitas: 42 }, { hora: "14", visitas: 60 },
      { hora: "16", visitas: 50 }, { hora: "18", visitas: 35 },
      { hora: "20", visitas: 25 }, { hora: "22", visitas: 12 },
    ],
    porSector: [
      { sector: "Software",  pct: 38, color: "#1f97e7" },
      { sector: "Fintech",   pct: 24, color: "#a300ec" },
      { sector: "Banca",     pct: 16, color: "#5aa8ff" },
      { sector: "Educación", pct: 12, color: "#77f6c6" },
      { sector: "Otros",     pct: 10, color: "#ffb86b" },
    ],
  };
}
