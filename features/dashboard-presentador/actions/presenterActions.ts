import {
  getStands,
  saveStand,
  deleteStand,
  getPresenterStats,
} from "@/features/dashboard-presentador/services/standService";
import {
  getProposals,
  updateProposalStatus,
} from "@/features/dashboard-presentador/services/proposalService";
import type { StandFormData } from "@/features/dashboard-presentador/types/stand";
import type { ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

export async function fetchPresenterStands() {
  return getStands();
}

export async function createOrUpdateStand(data: StandFormData, id?: string) {
  return saveStand(data, id);
}

export async function removeStand(id: string) {
  return deleteStand(id);
}

export async function fetchPresenterStats() {
  return getPresenterStats();
}

export async function fetchProposals() {
  return getProposals();
}

export async function respondToProposal(id: string, status: ProposalStatus) {
  return updateProposalStatus(id, status);
}
