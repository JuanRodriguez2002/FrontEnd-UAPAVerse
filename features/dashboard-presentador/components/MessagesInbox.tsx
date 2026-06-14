"use client";

import { useState } from "react";
import { Clock, Paperclip, Search, Send, Video } from "lucide-react";

type Message = {
  id: string;
  from: "me" | "other";
  text: string;
  time: string;
  attachment?: string;
};

type Conversation = {
  id: string;
  empresa: string;
  iniciales: string;
  ultimoMensaje: string;
  tiempo: string;
  activo: boolean;
  mensajes: Message[];
};

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    empresa: "Sarah Jenkins",
    iniciales: "SJ",
    ultimoMensaje: "Are the specifications for the Quantum module available?",
    tiempo: "Just now",
    activo: true,
    mensajes: [
      { id: "m1", from: "other", text: "Hello team! I visited your virtual pavilion at UAPA VERSE yesterday and was really impressed by the spatial data visualization demo.", time: "10:32 AM" },
      { id: "m2", from: "other", text: "Are the specifications for the Quantum module available for download yet? We're evaluating it for our Q3 integration pipeline.", time: "10:33 AM" },
      { id: "m3", from: "me", text: "Hi Sarah, thank you for visiting the pavilion! We're glad you enjoyed the demo.", time: "10:45 AM" },
      { id: "m4", from: "me", text: "Yes, the Quantum module specs are live. I'm transmitting the secure link to your terminal now.", time: "10:46 AM", attachment: "Quantum_Specs_v2.pdf" },
    ],
  },
  {
    id: "c2",
    empresa: "Nexus Corp Procurement",
    iniciales: "NC",
    ultimoMensaje: "We would like to schedule a demo for Q3.",
    tiempo: "2h ago",
    activo: false,
    mensajes: [
      { id: "m5", from: "other", text: "We would like to schedule a demo for Q3. Are you available the first week of July?", time: "8:15 AM" },
    ],
  },
  {
    id: "c3",
    empresa: "David Chen",
    iniciales: "DC",
    ultimoMensaje: "Thanks for the materials from the booth.",
    tiempo: "Yesterday",
    activo: false,
    mensajes: [
      { id: "m6", from: "other", text: "Thanks for the materials from the booth. Really appreciated the thoroughness.", time: "Yesterday" },
    ],
  },
];

export function MessagesInbox() {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  const active = conversations.find((c) => c.id === activeId)!;

  const filtered = conversations.filter((c) =>
    c.empresa.toLowerCase().includes(search.toLowerCase())
  );

  function sendMessage() {
    if (!input.trim()) return;
    const msg: Message = { id: `m${Date.now()}`, from: "me", text: input.trim(), time: "Just now" };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, mensajes: [...c.mensajes, msg], ultimoMensaje: msg.text, tiempo: "Just now" }
          : c
      )
    );
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/60 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">

      {/* ── Lista de conversaciones ── */}
      <div className="flex w-72 shrink-0 flex-col border-r border-white/10">
        <div className="border-b border-white/10 p-4">
          <p className="mb-3 font-sora text-sm font-bold text-neon-white">Inbox</p>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[#7180a5]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar transmisiones..."
              className="bg-transparent text-xs text-white outline-none placeholder:text-[#697797] w-full" />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv) => (
            <button key={conv.id} onClick={() => setActiveId(conv.id)}
              className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3.5 text-left transition hover:bg-white/5 ${activeId === conv.id ? "bg-primary/10" : ""}`}>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary-container font-space text-xs font-bold text-white">
                {conv.iniciales}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-neon-white truncate">{conv.empresa}</p>
                  <span className="ml-2 shrink-0 flex items-center gap-1 font-space text-[9px] text-[#657394]">
                    <Clock className="h-2.5 w-2.5" />{conv.tiempo}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-[#8f9bb8]">{conv.ultimoMensaje}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat activo ── */}
      <div className="flex flex-1 flex-col">
        {/* Header del chat */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary-container font-space text-xs font-bold text-white">
              {active.iniciales}
            </div>
            <div>
              <p className="text-sm font-bold text-neon-white">{active.empresa}</p>
              {active.activo && (
                <p className="flex items-center gap-1 font-space text-[9px] text-[#77f6c6]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#77f6c6]" />Active
                </p>
              )}
            </div>
          </div>
          <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#7180a5] transition hover:text-primary">
            <Video className="h-4 w-4" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-4 px-5 py-5">
          {active.mensajes.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-sm rounded-2xl px-4 py-3 ${
                msg.from === "me"
                  ? "bg-gradient-to-br from-primary-container to-[#2563eb] text-white"
                  : "border border-white/10 bg-white/5 text-[#c5d0e8]"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.attachment && (
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2">
                    <Paperclip className="h-3.5 w-3.5 text-[#8f9bb8]" />
                    <span className="font-space text-[11px] text-[#c5d0e8]">{msg.attachment}</span>
                  </div>
                )}
                <p className="mt-1 text-right font-space text-[9px] opacity-60">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type transmission..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#697797]" />
            <button onClick={sendMessage}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-[#2563eb] text-white shadow-primary-glow transition hover:shadow-primary-glow-hover">
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
