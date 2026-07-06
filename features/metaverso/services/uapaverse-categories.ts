import { BACKEND_UAPAVERSE_URL } from "@/features/metaverso/lib/config";
import type { UapaverseCategory } from "@/features/metaverso/types/uapaverse-category";

const CATEGORIES_LIST_PATH = "/api/uapaverse/category/list";

let categoriesCache: { data: UapaverseCategory[]; fetchedAt: number } | null =
  null;
const CACHE_TTL_MS = 60_000;

export async function fetchUapaverseCategories(): Promise<UapaverseCategory[]> {
  if (categoriesCache && Date.now() - categoriesCache.fetchedAt < CACHE_TTL_MS) {
    return categoriesCache.data;
  }

  const response = await fetch(
    `${BACKEND_UAPAVERSE_URL}${CATEGORIES_LIST_PATH}`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error(
      `No se pudieron cargar las categorías (${response.status})`
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("La API de categorías devolvió un formato inválido");
  }

  categoriesCache = {
    data: data as UapaverseCategory[],
    fetchedAt: Date.now(),
  };
  return categoriesCache.data;
}
