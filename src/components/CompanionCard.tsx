import React from "react";
import { motion } from "motion/react";
import { Lock, Play, MessageSquare } from "lucide-react";
import { Character } from "../types/character";

const PROFILE_TAGS: Record<string, string[]> = {
  elysia: ["Thoughtful", "Night owl", "Deep talk"],
  kai: ["Witty", "Loyal", "Street-smart"],
  seraphina: ["Empathic", "Creative", "Soft-spoken"],
};

interface Props {
  character: Character;
  onSelect: (c: Character) => void;
  onUnlock: (c: Character) => void;
  onWatch: (c: Character) => void;
  key?: React.Key;
}

export default function CompanionCard({ character, onSelect, onUnlock, onWatch }: Props) {
  const tags = PROFILE_TAGS[character.id] ?? ["Warm", "Present", "Listener"];

  return (
    <motion.div
      layoutId={character.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="group relative mx-auto w-full max-w-[360px]"
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-stone-900/40 shadow-xl shadow-black/25 backdrop-blur-xl transition-all duration-300 hover:border-accent/25 hover:shadow-[0_20px_50px_rgba(201,113,125,0.12)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <motion.img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />

          {!character.unlocked && (
            <button
              type="button"
              onClick={() => onUnlock(character)}
              className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-stone-100 backdrop-blur-md transition-colors hover:bg-black/50"
            >
              <Lock size={12} className="opacity-90" />
              {character.tokenPrice} $CRUSH
            </button>
          )}

          <div className="absolute inset-x-0 bottom-0 p-5 pt-12">
            <div className="rounded-2xl border border-white/[0.08] bg-stone-950/55 p-4 shadow-lg backdrop-blur-xl">
              <div className="mb-3 flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-accent/30">
                  <img src={character.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-stone-950 bg-emerald-400" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-serif text-xl font-bold tracking-tight text-stone-50">{character.name}</h3>
                    <span
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[10px] text-accent"
                      title="Verified on VirtuaCrush"
                    >
                      ✓
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent/95">{character.role}</p>
                </div>
              </div>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-stone-400">{character.bio}</p>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelect(character)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent-deep active:scale-[0.98]"
                >
                  <MessageSquare size={17} />
                  Message
                </button>
                <button
                  type="button"
                  onClick={() => onWatch(character)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-stone-100 transition-colors hover:bg-white/[0.1]"
                  title="Watch intro"
                >
                  <Play size={18} fill="currentColor" className="opacity-95" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[1.85rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "linear-gradient(135deg, rgba(201,113,125,0.25), rgba(157,122,158,0.2))",
        }}
      />
    </motion.div>
  );
}
