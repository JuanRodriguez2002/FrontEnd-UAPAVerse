"use server";

import { submitMeetingRequest } from "@/app/services/investorService";
import type { MeetingRequest } from "@/app/types/investors";

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
