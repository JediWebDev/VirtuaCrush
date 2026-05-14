import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, User, Bot, ArrowLeft, Loader2, 
  Settings, Trash2, Sparkles, Zap, 
  Wifi, Shield, Cpu, MessageSquareDashed
} from "lucide-react";
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

export default function ChatInterface({ character, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with character intro
  useEffect(() => {
    const welcomeMsg: Message = {
      id: "welcome",
      text: `Sync established. I am ${character.name}, your ${character.role}. ${character.bio} How shall we proceed with our interaction?`,
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
         throw new Error(errData.error || "Neural link failure");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text || "Neural connection reset. Please try again.",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMsg: Message = {
        id: "err-" + Date.now(),
        text: `Network Alert: ${error.message || "Connection to neural core failed."}`,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (confirm("Erase local chat buffer?")) {
      setMessages([{
        id: "reset",
        text: "Buffer purged. Handshake re-initiated.",
        sender: "bot",
        timestamp: new Date()
      }]);
    }
  };

  const suggestions = [
    "Tell me about your origins.",
    "Show me a vision of the future.",
    "What do you think of humanity?",
    "How do we sync our minds deeper?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex flex-col bg-surface overflow-hidden md:flex-row"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.1),transparent_50%)]" />

      {/* Sidebar */}
      <div className="w-full border-b border-white/10 p-6 md:w-96 md:border-b-0 md:border-r flex flex-col glass backdrop-blur-3xl">
        <div className="flex items-center justify-between mb-8">
            <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-white"
            >
            <ArrowLeft size={16} />
            Disconnect
            </button>
            <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition-all ${showSettings ? "bg-accent text-white" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
            >
                <Settings size={18} />
            </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative mb-6 h-48 w-48 overflow-hidden rounded-[2.5rem] border-2 border-accent/20 p-1 bg-gradient-to-br from-accent/20 to-blue-500/20 shadow-2xl shadow-accent/10"
          >
            <img src={character.image} className="h-full w-full rounded-[2.2rem] object-cover" />
            <div className="absolute bottom-4 right-4 h-4 w-4 rounded-full border-2 border-surface bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </motion.div>
          
          <h2 className="font-serif text-3xl font-bold mb-1">{character.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {character.role}
            </span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Lvl 44 Neural Core
            </span>
          </div>
          
          <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 text-left mb-6">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 flex items-center gap-1">
                <Shield size={10} /> Active Protocols
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">Empathy-V3</span>
                <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">Logic-Core</span>
                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Synced</span>
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
                    <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 mb-6 space-y-4">
                        <button 
                            onClick={clearChat}
                            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                        >
                            <Trash2 size={14} /> Wipe Session Buffer
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="mt-auto pt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-white/40">
                    <Wifi size={14} className="text-emerald-500" />
                    <span>Secure Link Active</span>
                </div>
                <span className="text-[10px] font-mono text-white/20">v2.1.0-sync</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-accent"
                />
            </div>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-[rgba(255,255,255,0.01)]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-surface/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl glass border-accent/20">
                    <Bot size={20} className="text-accent" />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{character.name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Synchronized
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 text-white/40">
                <div className="flex items-center gap-1 text-xs">
                    <Cpu size={14} />
                    <span>0.12ms Latency</span>
                </div>
            </div>
        </div>

        {/* Messages */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-10 space-y-8 no-scrollbar"
        >
          {messages.length === 1 && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="h-16 w-16 rounded-3xl glass flex items-center justify-center border-accent/20 animate-bounce">
                    <Sparkles className="text-accent" size={32} />
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl font-bold">Initiate Connection</h4>
                    <p className="text-sm text-white/40 max-w-xs mx-auto">Start chatting with {character.name} or try one of the neural suggestions below.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(s)}
                            className="px-4 py-2 rounded-xl glass border-white/5 text-xs hover:border-accent/40 hover:text-accent transition-all animate-in fade-in slide-in-from-bottom-2 duration-500"
                            style={{ animationDelay: `${i * 100}ms` }}
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
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex w-full group ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[70%] gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex h-10 w-10 shrink-0 mt-1 items-center justify-center rounded-xl shadow-lg ${
                    msg.sender === "user" 
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" 
                        : "glass border-white/10 text-accent ring-1 ring-accent/20"
                }`}>
                  {msg.sender === "user" ? <User size={20} /> : <Zap size={20} />}
                </div>
                <div className="space-y-2">
                    <div className={`rounded-3xl px-6 py-5 text-[15px] leading-relaxed shadow-xl ${
                        msg.sender === "user" 
                            ? "bg-accent text-white rounded-tr-none shadow-accent/10" 
                            : "glass border-white/10 rounded-tl-none bg-white/5 shadow-black/20"
                    }`}>
                    {msg.text}
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest text-white/20 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
            >
               <div className="flex gap-4 px-6 py-5 glass border-white/10 rounded-3xl rounded-tl-none bg-white/5 shadow-xl">
                    <div className="flex gap-1 items-center">
                        <div className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="h-1.5 w-1.5 bg-accent/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="h-1.5 w-1.5 bg-accent/30 rounded-full animate-bounce" />
                    </div>
                <span className="text-xs font-bold text-accent uppercase tracking-[0.2em] animate-pulse">Neural Processing</span>
               </div>
            </motion.div>
          )}
        </div>

        {/* Suggestions Tray (Floating) */}
        {!isLoading && messages.length > 1 && (
            <div className="px-8 py-2 overflow-x-auto no-scrollbar flex gap-2">
                {suggestions.slice(0, 3).map((s, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className="whitespace-nowrap px-3 py-1.5 rounded-lg glass border-white/5 text-[10px] font-bold text-white/40 hover:text-accent hover:border-accent/20 transition-all"
                    >
                        {s}
                    </button>
                ))}
            </div>
        )}

        {/* Input Block */}
        <div className="p-4 md:p-10 bg-gradient-to-t from-surface to-transparent">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-accent/20 blur opacity-20" />
            <div className="relative flex items-center gap-3">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={isLoading ? "Constructing response..." : `Transmit command to ${character.name}...`}
                disabled={isLoading}
                className="flex-1 rounded-[2rem] border border-white/10 bg-surface/50 backdrop-blur-xl py-5 pl-8 pr-16 text-[15px] outline-none transition-all focus:border-accent/40 focus:ring-4 focus:ring-accent/5"
                />
                <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/30 tracking-widest uppercase">
                    <MessageSquareDashed size={10} />
                    Tokens Active
                </div>
                <div className="h-1 w-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/30 tracking-widest uppercase">
                    <Cpu size={10} />
                    Latency: Low
                </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

