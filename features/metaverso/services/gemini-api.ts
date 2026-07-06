import { getLocalAnswer } from "@/features/metaverso/services/localAssistant";
import type { StandProject } from "@/features/metaverso/data/stands";

const GEMINI_MODEL = "gemini-2.0-flash-lite";
const CACHE_TTL_MS = 15 * 60 * 1000;
const MAX_CACHE = 40;
const cache = new Map<string, { answer: string; ts: number }>();

function cacheKey(standId: string, question: string) {
  return `${standId}:${question.toLowerCase().trim()}`;
}

function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.answer;
}

function setCache(key: string, answer: string) {
  if (cache.size >= MAX_CACHE) {
    const first = cache.keys().next().value;
    if (first) cache.delete(first);
  }
  cache.set(key, { answer, ts: Date.now() });
}

async function callGeminiOnce(
  apiKey: string,
  systemPrompt: string,
  question: string
): Promise<{ ok: true; answer: string } | { ok: false; status: number }> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: question }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 350,
        },
      }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No pude generar una respuesta.";
    return { ok: true, answer };
  }

  return { ok: false, status: response.status };
}

export async function askGeminiAssistant(body: {
  question?: string;
  standContext?: StandProject;
}) {
  const apiKey =
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim();

  const { question, standContext } = body;

  if (!question?.trim() || !standContext?.id) {
    return { error: "Pregunta o stand no válidos.", status: 400 as const };
  }

  const trimmed = question.trim();
  const key = cacheKey(standContext.id, trimmed);

  const cached = getCached(key);
  if (cached) {
    return { data: { answer: cached, source: "cache" as const } };
  }

  if (!apiKey) {
    const local = getLocalAnswer(trimmed, standContext);
    return { data: { answer: local, source: "local" as const } };
  }

  const systemPrompt = `Asistente UAPAverse. Responde en español, máximo 2 párrafos cortos.
Stand: ${standContext.title} (${standContext.organization})
Info: ${standContext.detailedDescription}
Características: ${standContext.features.join(", ")}`;

  const result = await callGeminiOnce(apiKey, systemPrompt, trimmed);

  if (result.ok) {
    setCache(key, result.answer);
    return { data: { answer: result.answer, source: "gemini" as const } };
  }

  const local = getLocalAnswer(trimmed, standContext);
  return { data: { answer: local, source: "local" as const } };
}
