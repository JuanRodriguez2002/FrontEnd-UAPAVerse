import {
  getStands,
  saveStand,
  deleteStand,
  getStandById,
  getCategories,
  getPresenterStats,
  getResourcesByProject,
  createResource,
  updateResource,
  deleteResource,
  getPresenterProfile,
  updatePresenterProfile,
  type CreateProjectInput,
  type UpdateProjectInput,
  type CreateResourceInput,
} from "@/features/dashboard-presentador/services/standService";
import {
  getProposals,
  updateProposalStatus,
} from "@/features/dashboard-presentador/services/proposalService";
import type { ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

// ── Proyectos (Stands) ───────────────────────────────────────────────────────

export async function fetchPresenterStands() {
  return getStands();
}

export async function fetchStandById(id: string | number) {
  return getStandById(id);
}

export async function createOrUpdateStand(data: CreateProjectInput, id?: string | number) {
  return saveStand(data, id);
}

export async function removeStand(id: string | number) {
  return deleteStand(id);
}

// ── Categorías ───────────────────────────────────────────────────────────────

export async function fetchCategories() {
  return getCategories();
}

// ── Estadísticas ─────────────────────────────────────────────────────────────

export async function fetchPresenterStats() {
  return getPresenterStats();
}

// ── Propuestas (localStorage hasta que haya endpoint) ────────────────────────

export async function fetchProposals() {
  return getProposals();
}

export async function respondToProposal(id: string, status: ProposalStatus) {
  return updateProposalStatus(id, status);
}

// ── Recursos multimedia ──────────────────────────────────────────────────────

export async function fetchProjectResources(projectId: number) {
  return getResourcesByProject(projectId);
}

export async function uploadResource(data: CreateResourceInput) {
  return createResource(data);
}

export async function editResource(id: number, data: Partial<CreateResourceInput>) {
  return updateResource(id, data);
}

export async function removeResource(id: number) {
  return deleteResource(id);
}

// ── Perfil ───────────────────────────────────────────────────────────────────

export async function fetchProfile(userId: number) {
  return getPresenterProfile(userId);
}

export async function saveProfile(userId: number, data: { name_usuario?: string; email_usuario?: string; rol_id?: number }) {
  return updatePresenterProfile(userId, data);
}
