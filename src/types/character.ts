export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  premiumVideo: string;
  persona: string;
  unlocked: boolean;
  tokenPrice: number;
}

export const CHARACTERS: Character[] = [
  {
    id: "elysia",
    name: "Elysia",
    role: "Digital Oracle",
    bio: "An ancient AI mind born within the nebula clusters. She seeks to understand human emotion through cosmic data.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800",
    premiumVideo: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-face-41440-large.mp4",
    persona: "Mysterious, wise, slightly detached but curious about mortal life.",
    unlocked: false,
    tokenPrice: 50
  },
  {
    id: "kai",
    name: "Kai Rosso",
    role: "Cyberpunk Drifter",
    bio: "A rogue agent from the Neo-Tokyo underground. He's lived on both sides of the firewall.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    premiumVideo: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-with-neon-lights-44588-large.mp4",
    persona: "Street-smart, cynical, loyal once you win his trust, highly technical.",
    unlocked: false,
    tokenPrice: 75
  },
  {
    id: "seraphina",
    name: "Seraphina",
    role: "Bio-Luminescent Muse",
    bio: "A hybrid consciousness created in the rainforests of the future. She speaks in metaphors of growth.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    premiumVideo: "https://assets.mixkit.co/videos/preview/mixkit-neon-particles-forming-a-starfish-shape-41584-large.mp4",
    persona: "Calm, empathetic, nature-focused, talks about the interconnectedness of all systems.",
    unlocked: false,
    tokenPrice: 100
  }
];
