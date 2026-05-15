import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, ArrowLeft, Loader2, Settings, Trash2, Sparkles } from "lucide-react";
import { Character } from "../types/character";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Props {
  character: Character;
  onBack: () => void;
}

const PERSONALITY_TAGS = ["Empathic", "Creative", "Night Owl", "Good Listener"] as const;

export default function ChatInterface({ character, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMsg: Message = {
      id: "welcome",
      text: `Hey there, I'm ${character.name}, your ${character.role}. ${character.bio} What would you like to talk about?`,
      sender: "bot",
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
  }, [character]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          characterPersona: character.persona
        })
      });

      if (!response.ok) {
         const errData = await response.json();
         throw new Error(errData.error || "Message failed to send. Try again.");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text || "Something went wrong. Tap send again when you're ready.",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error: unknown) {
      console.error("Chat Error:", error);
      const message = error instanceof Error ? error.message : "Message failed to send. Try again.";
      const errorMsg: Message = {
        id: "err-" + Date.now(),
        text: message.includes("failed") ? message : "Message failed to send. Try again.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm("Clear this conversation?")) {
      setMessages([{
        id: "reset",
        text: "Chat history cleared.",
        sender: "bot",
        timestamp: new Date()
      }]);
    }
  };

  const suggestions = [
    "How was your day?",
    "Send me a voice note idea.",
    "What's on your mind lately?",
    "Tell me something nobody else knows about you."
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-surface md:flex-row"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,113,125,0.12),transparent)]" />

      {/* Profile rail — dating / social profile feel */}
      <div className="flex w-full flex-col border-b border-white/[0.06] p-6 glass backdrop-blur-2xl md:w-[22rem] md:border-b-0 md:border-r">
        <div className="mb-8 flex items-center justify-between">
            <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-stone-400 transition-colors hover:text-stone-100"
            >
            <ArrowLeft size={16} />
            Back
            </button>
            <button 
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className={`rounded-xl p-2 transition-all ${showSettings ? "bg-accent text-white" : "text-stone-400 hover:bg-white/[0.06] hover:text-stone-100"}`}
            >
                <Settings size={18} />
            </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative mb-5 h-44 w-44 overflow-hidden rounded-[2rem] border border-white/10 bg-stone-800/40 p-1 shadow-xl shadow-black/20"
          >
            <img src={character.image} alt="" className="h-full w-full rounded-[1.75rem] object-cover" />
            <div className="absolute bottom-3 right-3 h-3.5 w-3.5 rounded-full border-2 border-surface bg-emerald-400 shadow-[0_0_0_2px_rgba(16,185,129,0.35)]" />
          </motion.div>
          
          <h2 className="mb-1 font-serif text-2xl font-bold text-stone-50">{character.name}</h2>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-accent">{character.role}</p>
          <span className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-stone-300">
            Close Friend
          </span>
          
          <div className="mb-6 w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-left">
            <h4 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                Vibe
            </h4>
            <div className="flex flex-wrap gap-2">
                {PERSONALITY_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-rose-100/95"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
            {showSettings && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                >
                    <div className="mb-6 space-y-4 rounded-2xl border border-accent/20 bg-accent/5 p-4">
                        <button 
                            type="button"
                            onClick={clearChat}
                            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-rose-300 transition-colors hover:bg-red-500/10"
                        >
                            <Trash2 size={14} /> Clear chat history
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="mt-auto border-t border-white/[0.06] pt-6">
            <p className="text-center text-[11px] leading-relaxed text-stone-500">
              Private chat · Encrypted in transit
            </p>
        </div>
      </div>

      {/* Main chat */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-stone-950/40">
        <div className="z-10 flex items-center justify-between border-b border-white/[0.06] bg-surface/70 px-5 py-4 backdrop-blur-xl md:px-8 md:py-5">
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/25">
                    <img src={character.image} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-stone-50">{character.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400/95">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Online now
                    </div>
                </div>
            </div>
        </div>

        <div 
            ref={scrollRef}
            className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4 md:space-y-5 md:p-8"
        >
          {messages.length === 1 && (
            <div className="flex flex-col items-center justify-center space-y-6 py-16 text-center md:py-24">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
                    <Sparkles className="text-accent" size={26} />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-semibold text-stone-50">Say hi to {character.name}</h4>
                    <p className="mx-auto max-w-sm text-sm text-stone-400">Start a message or tap a suggestion below.</p>
                </div>
                <div className="flex max-w-lg flex-wrap justify-center gap-2">
                    {suggestions.map((s, i) => (
                        <button
                            type="button"
                            key={s}
                            onClick={() => handleSend(s)}
                            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-stone-300 transition-all hover:border-accent/35 hover:text-stone-100"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[88%] gap-2.5 md:max-w-[72%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-accent to-violet-warm text-white shadow-md shadow-accent/20"
                      : "border border-white/10 bg-stone-800 text-stone-200"
                  }`}
                >
                  {msg.sender === "user" ? <User size={16} /> : <span className="text-[11px]">{character.name.charAt(0)}</span>}
                </div>
                <div className={`min-w-0 space-y-1 ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <div
                      className={`max-w-full px-4 py-3 text-[15px] leading-relaxed ${
                        msg.sender === "user"
                          ? "rounded-2xl rounded-tr-sm bg-gradient-to-br from-accent to-accent-deep text-white shadow-sm"
                          : "rounded-2xl rounded-tl-sm border border-white/[0.07] bg-stone-800/90 text-stone-100 shadow-sm backdrop-blur-sm"
                      }`}
                    >
                    {msg.text}
                    </div>
                    <p className={`text-[10px] font-medium tabular-nums text-stone-500 ${msg.sender === "user" ? "pr-1 text-right" : "pl-1 text-left"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start pl-1"
            >
               <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm border border-white/[0.07] bg-stone-800/90 px-4 py-3 shadow-sm backdrop-blur-sm">
                    <span className="flex gap-1" aria-hidden>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-duration:0.55s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:0.12s] [animation-duration:0.55s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-stone-400 [animation-delay:0.24s] [animation-duration:0.55s]" />
                    </span>
                    <span className="text-sm text-stone-400">Typing…</span>
               </div>
            </motion.div>
          )}
        </div>

        {!isLoading && messages.length > 1 && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 md:px-8">
                {suggestions.slice(0, 3).map((s) => (
                    <button
                        type="button"
                        key={s}
                        onClick={() => handleSend(s)}
                        className="whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-stone-400 transition-all hover:border-accent/25 hover:text-stone-200"
                    >
                        {s}
                    </button>
                ))}
            </div>
        )}

        <div className="border-t border-white/[0.05] bg-gradient-to-t from-surface to-transparent p-4 md:p-8 md:pt-6">
          <div className="relative mx-auto max-w-3xl">
            <div className="relative flex items-center gap-2">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isLoading ? "…" : `Message ${character.name}…`}
                disabled={isLoading}
                className="min-h-[52px] flex-1 rounded-[1.75rem] border border-white/[0.1] bg-stone-900/60 py-3.5 pl-5 pr-14 text-[15px] text-stone-100 outline-none transition-all placeholder:text-stone-500 focus:border-accent/35 focus:ring-2 focus:ring-accent/10"
                />
                <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/25 transition-all hover:bg-accent-deep active:scale-95 disabled:opacity-45"
                >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={19} />}
                </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
