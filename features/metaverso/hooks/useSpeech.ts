"use client";

import { useEffect, useRef, useCallback } from "react";

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives?: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  "not-allowed":
    "Permiso de micrófono denegado. Haz clic en el icono del candado en la barra de direcciones y permite el micrófono.",
  "no-speech":
    "No se detectó voz. Habla más cerca del micrófono e intenta de nuevo.",
  network: "Error de red en el reconocimiento de voz.",
  aborted: "Reconocimiento cancelado.",
  "audio-capture": "No se encontró micrófono. Conecta uno e intenta de nuevo.",
  "service-not-allowed":
    "El reconocimiento de voz no está permitido en este contexto. Usa HTTPS o localhost.",
};

interface SpeechRecognitionOptions {
  onTranscript: (text: string) => void;
  onError?: (message: string) => void;
  onEnd?: (hadResult: boolean) => void;
}

function scoreNaturalVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;

  if (voice.lang.startsWith("es")) score += 40;
  if (name.includes("natural") || name.includes("neural")) score += 60;
  if (name.includes("online")) score += 35;
  if (name.includes("premium")) score += 30;
  if (
    name.includes("helena") ||
    name.includes("sabina") ||
    name.includes("paulina") ||
    name.includes("elvira") ||
    name.includes("laura")
  ) {
    score += 25;
  }
  if (name.includes("google")) score += 15;
  if (name.includes("microsoft")) score += 12;
  if (name.includes("desktop")) score -= 15;
  if (name.includes("mobile")) score -= 5;

  return score;
}

function getVoicesList(): SpeechSynthesisVoice[] {
  return window.speechSynthesis?.getVoices() ?? [];
}

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const existing = getVoicesList();
    if (existing.length > 0) {
      resolve(existing);
      return;
    }

    const onVoicesChanged = () => {
      const voices = getVoicesList();
      if (voices.length > 0) {
        window.speechSynthesis.onvoiceschanged = null;
        resolve(voices);
      }
    };

    window.speechSynthesis.onvoiceschanged = onVoicesChanged;
    setTimeout(() => resolve(getVoicesList()), 800);
  });
}

function pickNaturalSpanishVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | undefined {
  const spanish = voices.filter(
    (v) => v.lang.startsWith("es") || v.lang.includes("ES")
  );
  const pool = spanish.length > 0 ? spanish : voices;
  return [...pool].sort((a, b) => scoreNaturalVoice(b) - scoreNaturalVoice(a))[0];
}

let voicesReady = false;

export function useSpeechRecognition({
  onTranscript,
  onError,
  onEnd,
}: SpeechRecognitionOptions) {
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const gotResultRef = useRef(false);
  const callbacksRef = useRef({ onTranscript, onError, onEnd });

  useEffect(() => {
    callbacksRef.current = { onTranscript, onError, onEnd };
  }, [onTranscript, onError, onEnd]);

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      const msg =
        "Tu navegador no soporta voz. Usa Chrome o Edge, o escribe tu pregunta.";
      callbacksRef.current.onError?.(msg);
      callbacksRef.current.onEnd?.(false);
      return;
    }

    recognitionRef.current?.abort();
    gotResultRef.current = false;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "es-ES";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      gotResultRef.current = false;
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex];
      const transcript = result?.[0]?.transcript?.trim();
      if (transcript) {
        gotResultRef.current = true;
        callbacksRef.current.onTranscript(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "aborted") return;
      const msg =
        ERROR_MESSAGES[event.error] ??
        `Error de micrófono (${event.error}). Usa el campo de texto.`;
      callbacksRef.current.onError?.(msg);
    };

    recognition.onend = () => {
      const hadResult = gotResultRef.current;
      if (!hadResult) {
        callbacksRef.current.onError?.(
          "No se captó tu voz. Pulsa 🎤 Voz, habla claro y espera."
        );
      }
      callbacksRef.current.onEnd?.(hadResult);
      recognitionRef.current = null;
    };

    try {
      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      callbacksRef.current.onError?.(
        "No se pudo iniciar el micrófono. Recarga la página e intenta de nuevo."
      );
      callbacksRef.current.onEnd?.(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return { startListening, stopListening };
}

export async function speakText(text: string, onEnd?: () => void) {
  if (!window.speechSynthesis || !text.trim()) {
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();

  const clean = text
    .replace(/^Error:.*$/m, "")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean || clean.length < 3) {
    onEnd?.();
    return;
  }

  const voices = voicesReady ? getVoicesList() : await waitForVoices();
  voicesReady = true;

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = "es-ES";
  utterance.rate = 0.9;
  utterance.pitch = 0.96;
  utterance.volume = 1;

  const voice = pickNaturalSpanishVoice(voices);
  if (voice) utterance.voice = voice;

  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel();
}

if (typeof window !== "undefined") {
  waitForVoices();
}
