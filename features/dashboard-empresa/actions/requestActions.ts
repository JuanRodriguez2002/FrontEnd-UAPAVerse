"use server";

import { submitMeetingRequest } from "@/features/dashboard-empresa/services/investorServices";
import type { MeetingRequest } from "@/features/dashboard-empresa/types/investors";

export async function createMeetingRequest(request: MeetingRequest) {
  if (!request.standId || !request.date || !request.message) {
    return {
      ok: false,
      error:
        "Completa el stand, la fecha y el mensaje para enviar la solicitud.",
    };
  }

  return submitMeetingRequest(request);
}
