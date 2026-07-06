interface StandContext {
  title: string;
  organization: string;
  career: string;
  shortDescription: string;
  detailedDescription: string;
  features: string[];
}

/** Respuesta local sin gastar cuota de Gemini */
export function getLocalAnswer(
  question: string,
  stand: StandContext
): string {
  const q = question.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

  if (
    q.includes("hola") ||
    q.includes("buenas") ||
    q.includes("quien eres") ||
    q.includes("quien sos")
  ) {
    return `¡Hola! Soy el asistente de UAPAverse. Estás en el stand "${stand.title}" de ${stand.organization}. Pregúntame sobre el proyecto, sus características o cómo funciona.`;
  }

  if (
    q.includes("que es") ||
    q.includes("de que trata") ||
    q.includes("explica") ||
    q.includes("describe") ||
    q.includes("proyecto")
  ) {
    return `${stand.title} — ${stand.career}\n\n${stand.detailedDescription}\n\nCaracterísticas: ${stand.features.slice(0, 3).join(", ")}.`;
  }

  if (
    q.includes("caracteristica") ||
    q.includes("funcion") ||
    q.includes("incluye")
  ) {
    return `Las características principales de ${stand.title} son:\n${stand.features.map((f) => `• ${f}`).join("\n")}`;
  }

  if (q.includes("organizacion") || q.includes("quien desarroll") || q.includes("uapa") || q.includes("cadesoft")) {
    return `Este proyecto es presentado por ${stand.organization}, dentro del área de ${stand.career}. ${stand.shortDescription}`;
  }

  if (q.includes("demo") || q.includes("probar") || q.includes("ver mas")) {
    return `Puedes ver la demo del sistema con el botón "Ver demo del sistema" en este modal, o explorar el video de presentación. ${stand.shortDescription}`;
  }

  return `${stand.title}: ${stand.shortDescription}\n\n${stand.detailedDescription}\n\n¿Quieres saber sobre las características, la organización o la demo?`;
}
