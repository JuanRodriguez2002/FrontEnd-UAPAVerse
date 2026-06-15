"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type RealtimeNotification = {
  id: string;
  type: "visita" | "propuesta" | "mensaje" | "sistema";
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
};

const POLL_INTERVAL = 30_000; // 30 segundos

function generateNotification(): RealtimeNotification {
  const types: RealtimeNotification["type"][] = ["visita", "propuesta", "mensaje", "sistema"];
  const samples: Record<RealtimeNotification["type"], { title: string; body: string }[]> = {
    visita: [
      { title: "Nueva visita", body: "Alguien visitó tu stand EduBot IA." },
      { title: "Pico de visitas", body: "Tu stand tuvo 50 visitas en los últimos 5 min." },
    ],
    propuesta: [
      { title: "Nueva propuesta", body: "Innovatek S.A. envió una propuesta de colaboración." },
      { title: "Propuesta actualizada", body: "TechCorp RD modificó su oferta." },
    ],
    mensaje: [
      { title: "Nuevo mensaje", body: "Sarah Jenkins te envió un mensaje." },
      { title: "Mensaje de empresa", body: "Nexus Corp preguntó sobre tu stack tecnológico." },
    ],
    sistema: [
      { title: "Sistema actualizado", body: "UAPAVerse v1.1 ya está disponible." },
      { title: "Mantenimiento programado", body: "Habrá mantenimiento el domingo a las 2 AM." },
    ],
  };

  const type = types[Math.floor(Math.random() * types.length)];
  const sample = samples[type][Math.floor(Math.random() * samples[type].length)];

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title: sample.title,
    body: sample.body,
    timestamp: new Date().toISOString(),
    read: false,
  };
}

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const poll = useCallback(() => {
    if (Math.random() > 0.4) {
      setNotifications((prev) => [generateNotification(), ...prev].slice(0, 50));
    }
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(poll, POLL_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [poll]);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, markRead, markAllRead };
}
