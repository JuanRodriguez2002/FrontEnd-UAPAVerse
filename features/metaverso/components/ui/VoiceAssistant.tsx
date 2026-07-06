"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { StandProject } from "@/features/metaverso/data/stands";
import { useUapaStore } from "@/features/metaverso/store/useUapaStore";
import { useSpeechRecognition, speakText, stopSpeaking } from "@/features/metaverso/hooks/useSpeech";
import { METAVERSO_API } from "@/features/metaverso/lib/config";

const MIN_SECONDS_BETWEEN_REQUESTS = 4;

interface VoiceAssistantProps {
  stand?: StandProject | null;
  autoFocus?: boolean;
}

export function VoiceAssistant({ stand: standProp, autoFocus }: VoiceAssistantProps) {
  const selectedStand = useUapaStore((s) => s.selectedStand);
  const stand = standProp ?? selectedStand;

  const isListening = useUapaStore((s) => s.isListening);
  const isSpeaking = useUapaStore((s) => s.isSpeaking);
  const assistantMessage = useUapaStore((s) => s.assistantMessage);
  const setListening = useUapaStore((s) => s.setListening);
  const setSpeaking = useUapaStore((s) => s.setSpeaking);
  const setAssistantMessage = useUapaStore((s) => s.setAssistantMessage);
  const [textInput, setTextInput] = useState("");
  const lastRequestRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus, stand?.id]);

  const askGemini = useCallback(
    async (question: string) => {
      if (!stand || !question.trim()) return;

      const now = Date.now();
      const elapsed = (now - lastRequestRef.current) / 1000;
      if (elapsed < MIN_SECONDS_BETWEEN_REQUESTS) {
        setAssistantMessage(
          `Espera ${Math.ceil(MIN_SECONDS_BETWEEN_REQUESTS - elapsed)} s antes de hacer otra pregunta.`
        );
        return;
      }
      lastRequestRef.current = now;

      setAssistantMessage("Pensando...");
      setListening(false);

      try {
        const res = await fetch(METAVERSO_API.gemini, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            standContext: stand,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setAssistantMessage(data.error ?? "No se pudo obtener respuesta.");
          return;
        }

        setAssistantMessage(data.answer);
        setSpeaking(true);
        speakText(data.answer, () => setSpeaking(false));
      } catch {
        setAssistantMessage(
          "Error de conexión con el servidor. Verifica que npm run dev esté activo."
        );
      }
    },
    [stand, setAssistantMessage, setListening, setSpeaking]
  );

  const { startListening, stopListening } = useSpeechRecognition({
    onTranscript: (transcript) => {
      setListening(false);
      setAssistantMessage(`Escuché: "${transcript}"`);
      askGemini(transcript);
    },
    onError: (msg) => {
      setListening(false);
      setAssistantMessage(msg);
    },
    onEnd: (hadResult) => {
      if (!hadResult) setListening(false);
    },
  });

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
      setListening(false);
      return;
    }

    stopSpeaking();
    setSpeaking(false);
    setListening(true);
    setAssistantMessage("🎤 Escuchando... Habla ahora.");
    startListening();
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    askGemini(textInput.trim());
    setTextInput("");
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setSpeaking(false);
  };

  if (!stand) return null;

  return (
    <div className="rounded-xl border border-[#00d4ff]/20 bg-[#030014]/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[#00d4ff]">
          <span
            className={`inline-block h-2 w-2 rounded-full bg-[#00d4ff] ${isListening ? "animate-pulse" : ""}`}
          />
          Asistente IA — Gemini
        </h3>
        <div className="flex gap-2">
          {isSpeaking && (
            <button
              onClick={handleStopSpeaking}
              className="cursor-pointer rounded-lg border border-red-400/40 px-3 py-1 text-xs text-red-300 transition hover:bg-red-400/10"
            >
              Detener voz
            </button>
          )}
          <button
            onClick={handleMicToggle}
            className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-medium transition ${
              isListening
                ? "border border-red-400/60 bg-red-400/20 text-red-300"
                : "border border-[#00d4ff]/40 bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20"
            }`}
          >
            {isListening ? "⏹ Detener" : "🎤 Voz"}
          </button>
        </div>
      </div>

      <form onSubmit={handleTextSubmit} className="mb-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="¿Qué quieres saber sobre este proyecto?"
          className="flex-1 rounded-lg border border-[#00d4ff]/25 bg-[#001a33]/60 px-3 py-2 text-sm text-[#e8f4ff] placeholder-[#e8f4ff]/30 outline-none focus:border-[#00d4ff]/50"
        />
        <button
          type="submit"
          disabled={!textInput.trim()}
          className="cursor-pointer rounded-lg border border-[#00d4ff]/40 bg-[#00d4ff]/10 px-4 py-2 text-xs font-medium text-[#00d4ff] transition hover:bg-[#00d4ff]/20 disabled:opacity-40"
        >
          Enviar
        </button>
      </form>

      <p className="mb-2 text-xs text-[#e8f4ff]/50">
        Pregunta sobre &quot;{stand.title}&quot; por voz o texto.
      </p>

      {assistantMessage && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-cosmic max-h-48 overflow-y-auto rounded-lg bg-[#001a33]/50 p-3 text-sm leading-relaxed text-[#e8f4ff]/90"
        >
          {assistantMessage}
        </motion.div>
      )}
    </div>
  );
}
