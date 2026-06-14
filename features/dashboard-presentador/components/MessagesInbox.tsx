"use client";

import { useRef, useEffect, useState } from "react";
import { Clock, Search, Send, Video } from "lucide-react";
import { useMessages } from "@/features/dashboard-presentador/components/hooks/useMessages";

export function MessagesInbox() {
  const { conversations, active, input, setInput, selectConversation, sendMessage } = useMessages();
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.messages]);

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0e1a4f]/60 shadow-[0_8px_30px_rgba(0,4,35,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">

      {/* ── Lista de conversaciones ── */}
      <div className="flex w-72 shrink-0 flex-col border-r border-white/10">
        <div className="border-b border-white/10 p-4">
          <p className="mb-3 font-sora text-sm font-bold text-neon-white">Inbox</p>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-[#7180a5]" />
            <input
              placeholder="Buscar transmisiones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-[#697797]"
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3.5 text-left transition hover:bg-white/5 ${
                active.id === conv.id ? "bg-primary/10" : ""
              }`}
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary-container font-space text-xs font-bold text-white">
                {conv.initials}
                {conv.unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary font-space text-[9px] font-bold text-[#000837]">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-xs font-bold text-neon-white">{conv.name}</p>
                  <span className="ml-2 flex shrink-0 items-center gap-1 font-space text-[9px] text-[#657394]">
                    <Clock className="h-2.5 w-2.5" />{conv.time}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-[#8f9bb8]">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat activo ── */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-container to-secondary-container font-space text-xs font-bold text-white">
              {active.initials}
            </div>
            <div>
              <p className="text-sm font-bold text-neon-white">{active.name}</p>
              <p className="font-space text-[9px] text-[#8f9bb8]">{active.company}</p>
            </div>
          </div>
          <button className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#7180a5] transition hover:text-primary">
            <Video className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {active.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-sm rounded-2xl px-4 py-3 ${
                msg.isOwn
                  ? "bg-gradient-to-br from-primary-container to-[#2563eb] text-white"
                  : "border border-white/10 bg-white/5 text-[#c5d0e8]"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className="mt-1 text-right font-space text-[9px] opacity-60">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-white/10 px-4 py-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type transmission..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#697797]"
            />
            <button
              onClick={sendMessage}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-container to-[#2563eb] text-white shadow-primary-glow transition hover:shadow-primary-glow-hover"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
