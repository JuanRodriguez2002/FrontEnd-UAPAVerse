export type ProposalStatus = "pendiente" | "aceptado" | "rechazado";

export type Proposal = {
  id: string;
  empresa: string;
  sector: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  status: ProposalStatus;
  iniciales: string;
};
