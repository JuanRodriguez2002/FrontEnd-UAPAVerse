import {
  conversations,
  favoriteStands,
  portfolioProjects,
} from "@/app/services/mockData";
import type { MeetingRequest } from "@/app/types/investors";

export async function getInvestorDashboardData() {
  return {
    favorites: favoriteStands,
    conversations,
    portfolio: portfolioProjects,
  };
}

export async function submitMeetingRequest(request: MeetingRequest) {
  await new Promise((resolve) => setTimeout(resolve, 350));

  return {
    ok: true,
    reference: `UAPA-${request.standId.toUpperCase()}-${Date.now().toString().slice(-4)}`,
  };
}
