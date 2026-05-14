import React from "react";
import { motion } from "motion/react";
import { Lock, Play, MessageSquare, Zap } from "lucide-react";
import { Character } from "../types/character";

interface Props {
  character: Character;
  onSelect: (c: Character) => void;
  onUnlock: (c: Character) => void;
  onWatch: (c: Character) => void;
  key?: React.Key;
}

export default function CompanionCard({ character, onSelect, onUnlock, onWatch }: Props) {
  return (
    <motion.div
      layoutId={character.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="group relative h-[500px] w-full max-w-[350px] overflow-hidden rounded-3xl glass hover-glow"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={character.image}
          alt={character.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent/80">
            {character.role}
          </span>
          {!character.unlocked && (
            <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-[10px] font-bold text-accent border border-accent/30">
              <Zap size={10} />
              {character.tokenPrice} TOKENS
            </div>
          )}
        </div>
        
        <h3 className="font-serif text-3xl font-bold mb-3">{character.name}</h3>
        
        <p className="mb-6 line-clamp-2 text-sm text-white/60 leading-relaxed">
          {character.bio}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onSelect(character)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-white transition-all hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <MessageSquare size={16} />
            Preview Chat
          </button>
          
          <button
            onClick={() => onWatch(character)}
            className="flex h-12 w-12 items-center justify-center rounded-xl glass text-white transition-all hover:bg-white/10"
            title="Premium Visuals"
          >
            <Play size={18} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Animated Overlay on Hover */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(59,130,246,0.05) 100%)' }}
      />
    </motion.div>
  );
}
