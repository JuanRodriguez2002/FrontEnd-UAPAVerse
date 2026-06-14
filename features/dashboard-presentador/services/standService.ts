import type { Stand, StandFormData } from "@/features/dashboard-presentador/types/stand";

const STORAGE_KEY = "uapaverse_presentador_stands";

function loadFromStorage(): Stand[] {
  if (typeof window === "undefined") return getDefaultStands();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stand[]) : getDefaultStands();
  } catch {
    return getDefaultStands();
  }
}

function saveToStorage(stands: Stand[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stands));
}

function getDefaultStands(): Stand[] {
  return [
    {
      id: "stand-1",
      nombre: "EduBot IA",
      descripcion: "Asistente educativo inteligente para universidades que personaliza el aprendizaje.",
      tecnologia: "React, Python, WebGL",
      categoria: "Educación / IA",
      tagline: "El futuro del aprendizaje adaptativo",
      tags: ["innovación", "IA", "educación"],
      sitioWeb: "https://edubot.ia",
      contacto: "contacto@edubot.ia",
      stackPrincipal: "React, Python, TensorFlow",
      requisitosHardware: "Navegador moderno, sin requisitos especiales",
      enlaceRepositorio: "https://github.com/edubot",
      representante: "María González",
      emailHolograma: "maria@edubot.ia",
      logoNombre: "",
      bannerNombre: "",
      demoNombre: "",
      status: "activo",
      colorAcento: "#1f97e7",
      visitas: 1248,
      empresasInteresadas: 18,
    },
    {
      id: "stand-2",
      nombre: "MediTrack",
      descripcion: "Monitoreo remoto de pacientes en tiempo real con alertas inteligentes.",
      tecnologia: "Next.js, Node.js, IoT",
      categoria: "Salud / IoT",
      tagline: "Salud conectada, vidas protegidas",
      tags: ["salud", "IoT", "tiempo real"],
      sitioWeb: "https://meditrack.health",
      contacto: "info@meditrack.health",
      stackPrincipal: "Next.js, Node.js, MQTT",
      requisitosHardware: "Gafas VR opcionales",
      enlaceRepositorio: "https://github.com/meditrack",
      representante: "Carlos Méndez",
      emailHolograma: "carlos@meditrack.health",
      logoNombre: "",
      bannerNombre: "",
      demoNombre: "",
      status: "borrador",
      colorAcento: "#a300ec",
      visitas: 312,
      empresasInteresadas: 4,
    },
  ];
}

export async function getStands(): Promise<Stand[]> {
  await new Promise((r) => setTimeout(r, 400));
  return loadFromStorage();
}

export async function getStandById(id: string): Promise<Stand | null> {
  await new Promise((r) => setTimeout(r, 200));
  const stands = loadFromStorage();
  return stands.find((s) => s.id === id) ?? null;
}

export async function saveStand(data: StandFormData, id?: string): Promise<Stand> {
  await new Promise((r) => setTimeout(r, 600));
  const stands = loadFromStorage();

  if (id) {
    const idx = stands.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error("Stand no encontrado");
    const updated: Stand = { ...stands[idx], ...data };
    stands[idx] = updated;
    saveToStorage(stands);
    return updated;
  }

  const newStand: Stand = {
    ...data,
    id: `stand-${Date.now()}`,
    visitas: 0,
    empresasInteresadas: 0,
  };
  stands.push(newStand);
  saveToStorage(stands);
  return newStand;
}

export async function deleteStand(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 400));
  const stands = loadFromStorage().filter((s) => s.id !== id);
  saveToStorage(stands);
}

export type PresenterStats = {
  totalVisitas: number;
  empresasInteresadas: number;
  propuestasRecibidas: number;
  visitasGrowth: number;
  empresasGrowth: number;
  propuestasGrowth: number;
  tendencia14Dias: { dia: string; visitas: number; propuestas: number }[];
  visitasPorHora: { hora: string; visitas: number }[];
  porSector: { sector: string; pct: number; color: string }[];
};

export async function getPresenterStats(): Promise<PresenterStats> {
  await new Promise((r) => setTimeout(r, 500));
  const stands = loadFromStorage();
  return {
    totalVisitas: stands.reduce((acc, s) => acc + s.visitas, 0),
    empresasInteresadas: stands.reduce((acc, s) => acc + s.empresasInteresadas, 0),
    propuestasRecibidas: 7,
    visitasGrowth: 12,
    empresasGrowth: 8,
    propuestasGrowth: 3,
    tendencia14Dias: [
      { dia: "D01", visitas: 62, propuestas: 2 },
      { dia: "D02", visitas: 58, propuestas: 1 },
      { dia: "D03", visitas: 75, propuestas: 4 },
      { dia: "D04", visitas: 45, propuestas: 1 },
      { dia: "D05", visitas: 50, propuestas: 2 },
      { dia: "D06", visitas: 68, propuestas: 3 },
      { dia: "D07", visitas: 72, propuestas: 5 },
      { dia: "D08", visitas: 55, propuestas: 2 },
      { dia: "D09", visitas: 60, propuestas: 3 },
      { dia: "D10", visitas: 48, propuestas: 1 },
      { dia: "D11", visitas: 65, propuestas: 4 },
      { dia: "D12", visitas: 70, propuestas: 3 },
      { dia: "D13", visitas: 58, propuestas: 2 },
      { dia: "D14", visitas: 63, propuestas: 4 },
    ],
    visitasPorHora: [
      { hora: "00", visitas: 5 },
      { hora: "02", visitas: 3 },
      { hora: "04", visitas: 2 },
      { hora: "06", visitas: 8 },
      { hora: "08", visitas: 48 },
      { hora: "10", visitas: 55 },
      { hora: "12", visitas: 42 },
      { hora: "14", visitas: 60 },
      { hora: "16", visitas: 50 },
      { hora: "18", visitas: 35 },
      { hora: "20", visitas: 25 },
      { hora: "22", visitas: 12 },
    ],
    porSector: [
      { sector: "Software", pct: 38, color: "#1f97e7" },
      { sector: "Fintech", pct: 24, color: "#a300ec" },
      { sector: "Banca", pct: 16, color: "#5aa8ff" },
      { sector: "Educación", pct: 12, color: "#77f6c6" },
      { sector: "Otros", pct: 10, color: "#ffb86b" },
    ],
  };
}
