/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wallet, Sparkles, X, LayoutGrid, Heart, Activity, Shield } from "lucide-react";
import { CHARACTERS, Character } from "./types/character";
import CompanionCard from "./components/CompanionCard";
import ChatInterface from "./components/ChatInterface";
import Footer from "./components/Footer";
import { InteractionDemo } from "./components/InteractionDemo";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function App() {
  const [characters, setCharacters] = useState<Character[]>(CHARACTERS);
  const [tokens, setTokens] = useState(150);
  const [activeChat, setActiveChat] = useState<Character | null>(null);
  const [activeVideo, setActiveVideo] = useState<Character | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error: any) {
        console.error("MetaMask connection error:", error);
        alert("Failed to connect to MetaMask. Please ensure the extension is unlocked and try again.");
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to connect your wallet.");
    }
  };

  const handleUnlock = (char: Character) => {
    if (!isWalletConnected) {
      alert("Please connect your Web3 wallet first.");
      return;
    }
    if (tokens < char.tokenPrice) {
      alert("Insufficient tokens.");
      return;
    }
    setTokens(prev => prev - char.tokenPrice);
    setCharacters(prev => 
      prev.map(c => c.id === char.id ? { ...c, unlocked: true } : c)
    );
  };

  const handleWatch = (char: Character) => {
    setActiveVideo(char);
  };

  const handleSelect = (char: Character) => {
    setActiveChat(char);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight">VirtuaCrush</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full glass px-4 py-2 md:flex">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400/90" />
            <span className="text-xs font-semibold tracking-wide text-stone-400">ONLINE NOW</span>
          </div>

          <button
            onClick={isWalletConnected ? undefined : connectWallet}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              isWalletConnected 
                ? "border border-accent/25 bg-accent/10 text-rose-100" 
                : "bg-stone-100 text-surface hover:bg-accent hover:text-white"
            }`}
          >
            <Wallet size={18} />
            {isWalletConnected ? (
              <span className="flex items-center gap-2">
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connected"}
                <span className="opacity-40">|</span>
                {tokens} $CRUSH
              </span>
            ) : "Connect Wallet"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative px-6 py-12 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <div className="lg:w-5/12 space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-rose-200/90 backdrop-blur-xl"
              >
                <Activity size={14} className="animate-pulse text-accent" />
                Exclusive Video Feed
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-5xl font-bold leading-[1.1] md:text-7xl lg:text-8xl"
              >
                Your type. <span className="text-gradient italic">Now typing</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mx-auto max-w-xl text-lg leading-relaxed text-stone-400 lg:mx-0"
              >
                Experience true companionship with lifelike avatars who remember you, share their daily moments, and send personalized messages.
              </motion.p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-deep active:scale-95">
                  <Sparkles size={18} />
                  Join Beta Waitlist
                </button>
                <button className="glass flex items-center gap-2 rounded-2xl border-stone-500/15 px-8 py-4 font-semibold text-stone-100 transition-all hover:bg-white/[0.07] active:scale-95">
                  <Shield size={18} />
                  How it Works
                </button>
              </div>
            </div>

            <div className="lg:w-7/12 w-full max-w-[500px] lg:max-w-none">
               <motion.div
                 initial={{ opacity: 0, scale: 0.9, x: 20 }}
                 animate={{ opacity: 1, scale: 1, x: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
               >
                  <InteractionDemo />
               </motion.div>
            </div>
          </div>

          {/* New: Economies Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             <div className="rounded-3xl border border-accent/15 glass p-8">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <LayoutGrid size={18} />
                   </div>
                   Multi-Currency Economy
                </h3>
                <p className="text-sm leading-relaxed text-stone-400">
                   Unlock companion access using traditional fiat or our native $CRUSH token. Crypto holders benefit from exclusive governance rights and early persona drops.
                </p>
             </div>
             <div className="rounded-3xl border border-violet-warm/20 glass p-8">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-warm/15 text-violet-warm">
                      <Sparkles size={18} />
                   </div>
                   Bespoke Personas
                </h3>
                <p className="text-sm leading-relaxed text-stone-400">
                   Every character in our roster is built with a deep psychological framework, ensuring consistent memory and realistic personality growth.
                </p>
             </div>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-12">
            {characters.map((char) => (
              <CompanionCard
                key={char.id}
                character={char}
                onSelect={handleSelect}
                onUnlock={handleUnlock}
                onWatch={handleWatch}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-surface/90 p-4 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface/60 text-stone-100 backdrop-blur-md transition-all hover:bg-accent"
              >
                <X size={20} />
              </button>
              <video
                src={activeVideo.premiumVideo}
                autoPlay
                loop
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-10 left-10">
                <h3 className="mb-2 font-serif text-4xl font-bold text-stone-50">{activeVideo.name}</h3>
                <p className="font-medium tracking-wide text-stone-400">Exclusive preview</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Overlay */}
      <AnimatePresence>
        {activeChat && (
          <ChatInterface
            character={activeChat}
            onBack={() => setActiveChat(null)}
          />
        )}
      </AnimatePresence>

      <CTASection />
      <Footer />

      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-violet-warm/10 blur-[100px]" />
      </div>
    </div>
  );
}

const CTASection = () => (
    <section className="bg-gradient-to-b from-transparent to-accent/5 px-6 py-24 md:px-12">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-white/10 glass p-12 text-center">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 bg-accent/15 blur-3xl" />
        <h2 className="mb-6 font-serif text-4xl font-bold md:text-5xl">Secure Early Access</h2>
        <p className="mx-auto mb-10 max-w-xl text-stone-400">
            Sign up to be notified of our $CRUSH pre-sale token launch and receive immediate priority for the limited Beta release.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-stone-100 outline-none transition-colors placeholder:text-stone-500 focus:border-accent/40 focus:ring-2 focus:ring-accent/15"
            />
            <button className="rounded-2xl bg-accent px-8 py-4 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-deep active:scale-95">
            Subscribe
            </button>
        </div>
        </div>
    </section>
);

