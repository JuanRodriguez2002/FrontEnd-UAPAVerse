import type { StandTemplate } from "@/features/metaverso/data/standTemplates";
import { getRoomColor } from "@/features/metaverso/services/standCatalog";
import { fetchUapaverseCategories } from "@/features/metaverso/services/uapaverse-categories";
import {
  fetchUapaverseProjects,
  isApprovedProject,
  mapApiProjectToStandTemplate,
} from "@/features/metaverso/services/uapaverse-projects";
import type { UapaverseCategory } from "@/features/metaverso/types/uapaverse-category";
import type { UapaverseProject } from "@/features/metaverso/types/uapaverse-project";

export interface CategoryRoom {
  index: number;
  categoryId: number;
  name: string;
  description: string;
  color: string;
  templates: StandTemplate[];
  standCount: number;
}

function projectBelongsToCategory(
  project: UapaverseProject,
  categoryId: number
): boolean {
  return (
    project.id_categoria === categoryId || project.category?.id === categoryId
  );
}

export function buildCategoryRooms(
  categories: UapaverseCategory[],
  projects: UapaverseProject[]
): CategoryRoom[] {
  const approved = projects.filter(isApprovedProject);

  return categories.map((category, index) => {
    const categoryProjects = approved.filter((project) =>
      projectBelongsToCategory(project, category.id)
    );
    const templates = categoryProjects.map((project) =>
      mapApiProjectToStandTemplate(project, index)
    );

    return {
      index,
      categoryId: category.id,
      name: `Sala ${index + 1} — ${category.name_categoria}`,
      description: category.description_categoria,
      color: getRoomColor(index),
      templates,
      standCount: templates.length,
    };
  });
}

export function getGlobalStandOffset(
  rooms: CategoryRoom[],
  roomIndex: number
): number {
  return rooms
    .slice(0, roomIndex)
    .reduce((total, room) => total + room.templates.length, 0);
}

export async function fetchCategoryRoomCatalog(): Promise<CategoryRoom[]> {
  const [categories, projects] = await Promise.all([
    fetchUapaverseCategories(),
    fetchUapaverseProjects(),
  ]);

  return buildCategoryRooms(categories, projects);
}
