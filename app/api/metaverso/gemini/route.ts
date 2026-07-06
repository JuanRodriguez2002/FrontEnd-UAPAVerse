import { NextRequest, NextResponse } from "next/server";
import { askGeminiAssistant } from "@/features/metaverso/services/gemini-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await askGeminiAssistant(body);

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
