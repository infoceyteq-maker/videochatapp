"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, MoreVertical, Heart } from "lucide-react";
import type { Character } from "@/lib/data";
import { aiReply } from "@/lib/data";

interface Msg {
  id: number;
  role: "user" | "ai";
  text: string;
}

const STARTERS = [
  "Hey! How are you today? 😊",
  "Tell me about yourself…",
  "What's your idea of a perfect evening?",
  "I've had a rough day — cheer me up?",
];

export default function ChatThread({ character }: { character: Character }) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 0, role: "ai", text: character.greeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setMessages((m) => [...m, { id: idRef.current++, role: "user", text }]);
    setTyping(true);

    // deterministic "thinking" delay: longer messages take a little longer
    const think = Math.min(2600, 800 + text.length * 18);
    setTimeout(() => {
      const reply = aiReply(text);
      setMessages((m) => [...m, { id: idRef.current++, role: "ai", text: reply }]);
      setTyping(false);
    }, think);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-bg md:h-[calc(100dvh-4rem)] md:rounded-2xl md:border md:border-line">
      {/* Chat header */}
      <header className="glass flex items-center gap-3 border-b border-line px-4 py-3">
        <Link
          href="/characters"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-text"
          aria-label="Back to explore"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div
          className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-line"
          style={{
            background: `linear-gradient(150deg, ${character.coverFrom}, ${character.coverTo})`,
          }}
        >
          <Image
            src={character.avatar}
            alt={character.name}
            unoptimized
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold">
            {character.name.split(" ")[0]}, {character.age}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            Online now · {character.voiceStyle}
          </p>
        </div>

        <button
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-accent sm:flex"
          aria-label="Like character"
        >
          <Heart className="h-5 w-5" />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-text"
          aria-label="Chat options"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </header>

      {/* Messages */}
      <main className="scroll-thin flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.length === 1 && (
          <div className="mx-auto mb-2 max-w-md rounded-2xl border border-line bg-surface p-4 text-center">
            <p className="text-sm font-semibold">
              <Sparkles className="mr-1.5 inline h-4 w-4 text-accent" />
              Start the conversation
            </p>
            <p className="mt-1 text-xs text-subtle">
              Say hi, ask about {character.name.split(" ")[0]}&apos;s world, or pick a starter:
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-text"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) =>
          m.role === "ai" ? (
            <div key={m.id} className="flex animate-fade-up items-end gap-2.5">
              <div
                className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-line"
                style={{
                  background: `linear-gradient(150deg, ${character.coverFrom}, ${character.coverTo})`,
                }}
              >
                <Image
                  src={character.avatar}
                  alt=""
                  unoptimized
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-2.5 text-[14.5px] leading-6 text-text">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex animate-fade-up justify-end">
              <div className="max-w-[78%] rounded-2xl rounded-br-md btn-gradient px-4 py-2.5 text-[14.5px] leading-6 text-white">
                {m.text}
              </div>
            </div>
          )
        )}

        {typing && (
          <div className="flex animate-fade-in items-end gap-2.5">
            <div
              className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-line"
              style={{
                background: `linear-gradient(150deg, ${character.coverFrom}, ${character.coverTo})`,
              }}
            >
              <Image
                src={character.avatar}
                alt=""
                unoptimized
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3.5">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </main>

      {/* Composer */}
      <footer className="glass border-t border-line px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2.5">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={`Message ${character.name.split(" ")[0]}…`}
            maxLength={500}
            className="h-12 flex-1 rounded-xl border border-line bg-surface px-4 text-[15px] text-text placeholder:text-subtle outline-none transition-colors focus:border-accent/70"
            aria-label="Chat message"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || typing}
            className="btn-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-subtle">
          Demo mode — replies are simulated. Connect your LLM API key for real conversations.
        </p>
      </footer>
    </div>
  );
}
