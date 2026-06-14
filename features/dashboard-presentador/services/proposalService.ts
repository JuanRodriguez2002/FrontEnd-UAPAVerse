import type { Proposal, ProposalStatus } from "@/features/dashboard-presentador/types/proposal";

const STORAGE_KEY = "uapaverse_presentador_proposals";

function loadFromStorage(): Proposal[] {
  if (typeof window === "undefined") return getDefaultProposals();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Proposal[]) : getDefaultProposals();
  } catch {
    return getDefaultProposals();
  }
}

function saveToStorage(proposals: Proposal[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
}

function getDefaultProposals(): Proposal[] {
  return [
    {
      id: "prop-1",
      empresa: "Innovatek S.A.",
      sector: "Fintech",
      titulo: "Integración EduBot con plataforma bancaria",
      mensaje: "Nos interesa explorar una alianza para integrar tu asistente IA en nuestro portal de educación financiera.",
      fecha: "Hace 45 min",
      status: "aceptado",
      iniciales: "IS",
    },
    {
      id: "prop-2",
      empresa: "TechCorp RD",
      sector: "Software",
      titulo: "Demo técnica privada",
      mensaje: "Quisiéramos agendar una sesión técnica para revisar la arquitectura del proyecto y posibles colaboraciones.",
      fecha: "Hace 3 h",
      status: "pendiente",
      iniciales: "TC",
    },
    {
      id: "prop-3",
      empresa: "Grupo BDC",
      sector: "Banca",
      titulo: "Patrocinio del stand",
      mensaje: "Estamos interesados en patrocinar tu participación en la próxima edición de la feria.",
      fecha: "Ayer",
      status: "pendiente",
      iniciales: "GB",
    },
    {
      id: "prop-4",
      empresa: "NexusCorp",
      sector: "Logística",
      titulo: "Integración con sistema de distribución",
      mensaje: "Evaluamos integrar tu solución en nuestra cadena de suministro digital.",
      fecha: "Hace 2 días",
      status: "rechazado",
      iniciales: "NC",
    },
  ];
}

export async function getProposals(): Promise<Proposal[]> {
  await new Promise((r) => setTimeout(r, 400));
  return loadFromStorage();
}

export async function updateProposalStatus(id: string, status: ProposalStatus): Promise<Proposal> {
  await new Promise((r) => setTimeout(r, 500));
  const proposals = loadFromStorage();
  const idx = proposals.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Propuesta no encontrada");
  proposals[idx] = { ...proposals[idx], status };
  saveToStorage(proposals);
  return proposals[idx];
}
