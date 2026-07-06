export type ProjectStatus =
  | "Alta prioridad"
  | "En evaluacion"
  | "Nuevo contacto";

export type Stand = {
  id: string;
  name: string;
  sector: string;
  owner: string;
  description: string;
  valuation: string;
  traction: string;
  matchScore: number;
  gradient: string;
  saved: boolean;
  status: ProjectStatus;
};

export type Conversation = {
  id: string;
  company: string;
  standName: string;
  unread: number;
  lastMessage: string;
  messages: Array<{
    id: string;
    from: "empresa" | "stand";
    text: string;
    time: string;
  }>;
};

export type PortfolioProject = {
  id: string;
  standId: string;
  name: string;
  phase: "Exploracion" | "Due diligence" | "Propuesta" | "Negociacion";
  nextAction: string;
  probability: number;
  updatedAt: string;
};

export type MeetingRequest = {
  standId: string;
  requestType: "reunion" | "cotizacion";
  date: string;
  budget: string;
  message: string;
};
