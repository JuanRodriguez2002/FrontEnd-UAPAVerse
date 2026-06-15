"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  company: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
};

const POLL_INTERVAL = 15_000; // 15 segundos

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    name: "Sarah Jenkins",
    company: "Innovatek S.A.",
    initials: "SJ",
    lastMessage: "Could we schedule a demo for next week?",
    time: "2m",
    unread: 2,
    messages: [
      { id: "m1", sender: "Sarah Jenkins", text: "Hello! I'm very interested in your EduBot IA project.", timestamp: "10:30", isOwn: false },
      { id: "m2", sender: "Yo", text: "Hi Sarah! Thanks for reaching out.", timestamp: "10:32", isOwn: true },
      { id: "m3", sender: "Sarah Jenkins", text: "Could we schedule a demo for next week?", timestamp: "10:45", isOwn: false },
    ],
  },
  {
    id: "conv-2",
    name: "Nexus Corp",
    company: "Nexus Corp RD",
    initials: "NC",
    lastMessage: "We'd like to discuss a potential partnership.",
    time: "1h",
    unread: 1,
    messages: [
      { id: "m4", sender: "Nexus Corp", text: "We'd like to discuss a potential partnership.", timestamp: "09:15", isOwn: false },
    ],
  },
  {
    id: "conv-3",
    name: "David Chen",
    company: "TechCorp RD",
    initials: "DC",
    lastMessage: "What technologies does your stack use?",
    time: "3h",
    unread: 0,
    messages: [
      { id: "m5", sender: "David Chen", text: "What technologies does your stack use?", timestamp: "07:00", isOwn: false },
      { id: "m6", sender: "Yo", text: "We use Next.js, TypeScript and TensorFlow.", timestamp: "07:05", isOwn: true },
    ],
  },
];

export function useMessages() {
  const [conversations, setConversations] = useState<Conversation[]>(DEFAULT_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string>(DEFAULT_CONVERSATIONS[0].id);
  const [input, setInput] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  const pollNewMessages = useCallback(() => {
    // Simula llegada ocasional de mensajes en tiempo real
    if (Math.random() > 0.7) {
      const convIndex = Math.floor(Math.random() * conversations.length);
      const conv = conversations[convIndex];
      const newMsg: Message = {
        id: `m-${Date.now()}`,
        sender: conv.name,
        text: "¿Tienes disponibilidad esta semana para una llamada?",
        timestamp: new Date().toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
      };
      setConversations((prev) =>
        prev.map((c, i) =>
          i === convIndex
            ? {
                ...c,
                messages: [...c.messages, newMsg],
                lastMessage: newMsg.text,
                time: "ahora",
                unread: c.id === activeId ? 0 : c.unread + 1,
              }
            : c
        )
      );
    }
  }, [conversations, activeId]);

  useEffect(() => {
    timerRef.current = setInterval(pollNewMessages, POLL_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [pollNewMessages]);

  function selectConversation(id: string) {
    setActiveId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  }

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "Yo",
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, time: "ahora" }
          : c
      )
    );
    setInput("");
  }

  const totalUnread = conversations.reduce((acc, c) => acc + c.unread, 0);

  return { conversations, active, input, setInput, selectConversation, sendMessage, totalUnread };
}
