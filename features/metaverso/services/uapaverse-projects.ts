import type { StandTemplate } from "@/features/metaverso/data/standTemplates";
import { BACKEND_UAPAVERSE_URL } from "@/features/metaverso/lib/config";
import type { UapaverseProject } from "@/features/metaverso/types/uapaverse-project";
import { getRoomColor } from "@/features/metaverso/services/standCatalog";

const PROJECTS_LIST_PATH = "/api/uapaverse/project/list";

let projectsCache: { data: UapaverseProject[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

export function toEmbedVideoUrl(url: string): string {
  if (!url) return "";

  try {
    if (url.includes("youtube.com/watch") || url.includes("youtube.com/live")) {
      const id = new URL(url).searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes("youtube.com/embed/")) {
      return url;
    }
  } catch {
    return url;
  }

  return url;
}

function parseTechnologies(raw: string): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getVideoResource(project: UapaverseProject) {
  return project.resources?.find(
    (resource) => resource.type_recurso?.toUpperCase() === "VIDEO"
  );
}

function getImageGallery(project: UapaverseProject): string[] {
  return (
    project.resources
      ?.filter((resource) => resource.type_recurso?.toUpperCase() !== "VIDEO")
      .map((resource) => resource.route_recurso)
      .filter(Boolean) ?? []
  );
}

function isApprovedProject(project: UapaverseProject): boolean {
  const status = project.estado_proyecto?.trim().toUpperCase();
  return status === "APROBADO";
}

export { isApprovedProject };

export function mapApiProjectToStandTemplate(
  project: UapaverseProject,
  colorIndex: number
): StandTemplate {
  const videoResource = getVideoResource(project);
  const technologies = parseTechnologies(project.tecnologias_utilizadas);
  const technicalInfo = project.informacion_tecnica?.trim() ?? "";
  const commercialInfo = project.informacion_comercial?.trim() ?? "";
  const detailedDescription = [technicalInfo, commercialInfo]
    .filter(Boolean)
    .join("\n\n");

  return {
    id: String(project.id),
    title: project.name_proyecto,
    organization:
      project.nombre_grupo?.trim() ||
      project.user?.name_usuario?.trim() ||
      "UAPA",
    career: project.carrera_asociada?.trim() || "Sin carrera",
    shortDescription: project.descripcion_proyecto?.trim() || project.name_proyecto,
    detailedDescription:
      detailedDescription || project.descripcion_proyecto?.trim() || "",
    features: technologies,
    videoUrl: toEmbedVideoUrl(videoResource?.route_recurso ?? ""),
    demoUrl: project.demo_url?.trim() || "",
    gallery: getImageGallery(project),
    color: getRoomColor(colorIndex),
    categoryId: project.id_categoria,
    categoryName: project.category?.name_categoria,
    categoryDescription: project.category?.description_categoria,
    developmentStatus: project.estado_desarrollo,
    maturityLevel: project.nivel_madurez_tecnologica,
    technicalInfo,
    commercialInfo,
    contactName: project.contacto_nombre,
    contactPhone: project.contacto_telefono,
    contactEmail: project.contacto_correo,
    contactRole: project.contacto_rol,
    groupName: project.nombre_grupo,
    registeredAt: project.fecha_registro_proyecto,
  };
}

export async function fetchUapaverseProjects(): Promise<UapaverseProject[]> {
  if (projectsCache && Date.now() - projectsCache.fetchedAt < CACHE_TTL_MS) {
    return projectsCache.data;
  }

  const response = await fetch(`${BACKEND_UAPAVERSE_URL}${PROJECTS_LIST_PATH}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `No se pudieron cargar los proyectos (${response.status})`
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("La API de proyectos devolvió un formato inválido");
  }

  projectsCache = { data: data as UapaverseProject[], fetchedAt: Date.now() };
  return projectsCache.data;
}

export async function fetchStandTemplatesFromApi(): Promise<StandTemplate[]> {
  const projects = await fetchUapaverseProjects();
  return projects
    .filter(isApprovedProject)
    .map((project, index) => mapApiProjectToStandTemplate(project, index));
}
