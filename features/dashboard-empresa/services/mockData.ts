import type {
  Conversation,
  PortfolioProject,
  Stand,
} from "@/features/dashboard-empresa/types/investors";

export const favoriteStands: Stand[] = [
  {
    id: "astro-orbit",
    name: "AstroTech Orbit",
    sector: "Aeroespacial",
    owner: "Laboratorio Atlas",
    description:
      "Sistema de diagnostico orbital para pequenos satelites con telemetria predictiva.",
    valuation: "US$ 180K",
    traction: "Demo funcional",
    matchScore: 96,
    gradient: "from-sky-400/35 via-blue-500/20 to-violet-500/35",
    saved: true,
    status: "Alta prioridad",
  },
  {
    id: "quantum-secure",
    name: "Quantum Secure",
    sector: "Ciberseguridad",
    owner: "Nexus Core",
    description:
      "Cifrado hibrido y monitoreo de riesgo para operaciones empresariales.",
    valuation: "US$ 92K",
    traction: "Piloto B2B",
    matchScore: 89,
    gradient: "from-violet-500/35 via-cyan-400/15 to-blue-500/30",
    saved: true,
    status: "En evaluacion",
  },
  {
    id: "bio-data",
    name: "BioData Pulse",
    sector: "IA & Datos",
    owner: "Helix Analytics",
    description:
      "Panel de analitica biometrica para salud preventiva en campus inteligentes.",
    valuation: "US$ 130K",
    traction: "12 leads",
    matchScore: 82,
    gradient: "from-fuchsia-500/30 via-blue-500/20 to-cyan-300/20",
    saved: true,
    status: "Nuevo contacto",
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    company: "Nexus Core",
    standName: "Quantum Secure",
    unread: 2,
    lastMessage: "Podemos compartir el dossier tecnico esta tarde.",
    messages: [
      {
        id: "m1",
        from: "stand",
        text: "Gracias por guardar nuestro stand. Tenemos una demo privada disponible.",
        time: "09:42",
      },
      {
        id: "m2",
        from: "empresa",
        text: "Nos interesa revisar integracion, licencias y tiempos de implementacion.",
        time: "10:08",
      },
      {
        id: "m3",
        from: "stand",
        text: "Podemos compartir el dossier tecnico esta tarde y agendar una reunion.",
        time: "10:15",
      },
    ],
  },
  {
    id: "conv-2",
    company: "Laboratorio Atlas",
    standName: "AstroTech Orbit",
    unread: 0,
    lastMessage: "El prototipo puede escalarse con financiamiento semilla.",
    messages: [
      {
        id: "m4",
        from: "stand",
        text: "El prototipo puede escalarse con financiamiento semilla.",
        time: "11:20",
      },
    ],
  },
  {
    id: "conv-3",
    company: "Helix Analytics",
    standName: "BioData Pulse",
    unread: 1,
    lastMessage: "Tenemos metricas de adopcion del piloto universitario.",
    messages: [
      {
        id: "m5",
        from: "stand",
        text: "Tenemos metricas de adopcion del piloto universitario.",
        time: "12:05",
      },
    ],
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "portfolio-1",
    standId: "astro-orbit",
    name: "AstroTech Orbit",
    phase: "Due diligence",
    nextAction: "Revisar propiedad intelectual",
    probability: 74,
    updatedAt: "Hoy",
  },
  {
    id: "portfolio-2",
    standId: "quantum-secure",
    name: "Quantum Secure",
    phase: "Propuesta",
    nextAction: "Solicitar cotizacion enterprise",
    probability: 61,
    updatedAt: "Ayer",
  },
  {
    id: "portfolio-3",
    standId: "bio-data",
    name: "BioData Pulse",
    phase: "Exploracion",
    nextAction: "Validar cumplimiento de datos",
    probability: 42,
    updatedAt: "Hace 2 dias",
  },
];
