"use client";

import { MoreVertical, Paperclip, Search, Send, Video } from "lucide-react";
import { useState } from "react";
import type { Conversation } from "@/features/dashboard-empresa/types/investors";

type MessagingPanelProps = {
  conversations: Conversation[];
};

export function MessagingPanel({ conversations }: MessagingPanelProps) {
  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id ?? "");
  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0];

  return (
    <section className="glass-panel grid min-h-[720px] overflow-hidden rounded-[24px] md:grid-cols-[0.72fr_1.2fr] xl:min-h-0">
      <div className="border-b border-sky-300/10 p-4 md:border-b-0 md:border-r">
        <div className="mb-4">
          <p className="section-eyebrow">Mensajeria</p>
          <h2 className="mt-1 text-2xl font-black text-white">Inbox</h2>
        </div>

        <label className="professional-input mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="w-full bg-transparent outline-none placeholder:text-slate-500" placeholder="Buscar conversacion..." />
        </label>

        <div className="scrollbar-thin max-h-[560px] space-y-2 overflow-y-auto pr-1">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveConversationId(conversation.id)}
              className={`w-full rounded-2xl border p-3 text-left transition ${
                conversation.id === activeConversationId
                  ? "border-sky-300/45 bg-sky-300/[0.12] shadow-glow"
                  : "border-sky-300/[0.12] bg-white/[0.03] hover:border-sky-300/[0.24] hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{conversation.company}</p>
                  <p className="text-xs text-sky-200">{conversation.standName}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-violet-500 px-1.5 text-[10px] font-bold text-white">
                    {conversation.unread}
                  </span>
                )}
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-400">{conversation.lastMessage}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[520px] flex-col">
        <div className="flex items-center justify-between border-b border-sky-300/10 p-4">
          <div>
            <p className="font-bold text-white">{activeConversation.company}</p>
            <p className="text-xs text-slate-400">{activeConversation.standName}</p>
          </div>
          <div className="flex gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full border border-sky-300/15 text-sky-200 transition hover:border-sky-300/[0.35] hover:bg-sky-300/10">
              <Video className="h-4 w-4" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-full border border-sky-300/15 text-sky-200 transition hover:border-sky-300/[0.35] hover:bg-sky-300/10">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto p-4">
          <div className="mx-auto mb-2 w-fit rounded-full border border-white/[0.06] bg-white/[0.045] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Canal directo
          </div>
          {activeConversation.messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === "empresa" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.from === "empresa"
                    ? "bg-gradient-to-r from-sky-500/80 to-violet-500/80 text-white"
                    : "border border-sky-300/15 bg-white/[0.06] text-slate-200"
                }`}
              >
                <p>{message.text}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-300">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-sky-300/10 p-4">
          <div className="professional-input flex items-center gap-2 rounded-2xl p-2">
            <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition hover:bg-white/[0.055]">
              <Paperclip className="h-4 w-4" />
            </button>
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Escribe un mensaje..." />
            <button className="neon-button grid h-10 w-10 place-items-center rounded-xl text-white">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}