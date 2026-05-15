import { Heart, MessageCircle, Lock } from "lucide-react";
import { Character } from "../types/character";

type PostMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

interface FeedPost {
  id: string;
  timeAgo: string;
  caption: string;
  media: PostMedia;
  likes: number;
  comments: number;
}

function displayName(fullName: string): string {
  const quoted = fullName.match(/"([^"]+)"/);
  if (quoted) return quoted[1];
  return fullName.split(" ")[0];
}

const FEED_BY_CHARACTER: Record<string, FeedPost[]> = {
  mina: [
    {
      id: "1",
      timeAgo: "2 hours ago",
      caption: "Cosplay progress check ✨ sleeves are finally behaving. Should I stream the final build tonight?",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800",
      },
      likes: 284,
      comments: 41,
    },
    {
      id: "2",
      timeAgo: "Yesterday",
      caption: "Late-night ranked was brutal but we survived. POV: me judging your loadout.",
      media: {
        type: "video",
        src: "https://assets.mixkit.co/videos/preview/mixkit-beautiful-woman-smiling-and-looking-at-camera-40082-large.mp4",
        poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      },
      likes: 512,
      comments: 89,
    },
    {
      id: "3",
      timeAgo: "3 days ago",
      caption: "Behind the scenes from yesterday's shoot — full set drops for subscribers soon 👀",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      },
      likes: 891,
      comments: 124,
    },
    {
      id: "4",
      timeAgo: "1 week ago",
      caption: "Voice note energy: hyping you up before your big meeting. You’ve got this.",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
      },
      likes: 445,
      comments: 67,
    },
  ],
  michelle: [
    {
      id: "1",
      timeAgo: "3 hours ago",
      caption: "Study nook update — finally organized my notes for the week. Want me to quiz you later?",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
      },
      likes: 198,
      comments: 28,
    },
    {
      id: "2",
      timeAgo: "Yesterday",
      caption: "Quiet morning coffee and a voice memo about something I've been thinking about…",
      media: {
        type: "video",
        src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-the-phone-41441-large.mp4",
        poster: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
      },
      likes: 367,
      comments: 52,
    },
    {
      id: "3",
      timeAgo: "4 days ago",
      caption: "Sunset walk after lab. Sometimes the best conversations happen without a screen.",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800",
      },
      likes: 421,
      comments: 38,
    },
    {
      id: "4",
      timeAgo: "1 week ago",
      caption: "Subscriber-only: deep-dive journal entry on what trust means to me.",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
      },
      likes: 290,
      comments: 44,
    },
  ],
  callie: [
    {
      id: "1",
      timeAgo: "1 hour ago",
      caption: "Game day fit check 💅 chapter brunch after — who’s coming?",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
      },
      likes: 624,
      comments: 112,
    },
    {
      id: "2",
      timeAgo: "Yesterday",
      caption: "Exclusive clip from last night's rooftop hang — you had to be there.",
      media: {
        type: "video",
        src: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
        poster: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=800",
      },
      likes: 978,
      comments: 203,
    },
    {
      id: "3",
      timeAgo: "2 days ago",
      caption: "Plotting our next adventure. Drop a 📍 if you want early access to the itinerary.",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      },
      likes: 540,
      comments: 91,
    },
    {
      id: "4",
      timeAgo: "5 days ago",
      caption: "Late night voice note — the kind I only send to inner circle.",
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
      },
      likes: 712,
      comments: 156,
    },
  ],
};

const DEFAULT_POSTS: FeedPost[] = FEED_BY_CHARACTER.mina;

function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-sm">
      <div className="px-4 pt-4">
        <p className="text-[11px] font-medium text-stone-500">{post.timeAgo}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-200">{post.caption}</p>
      </div>
      <div className="mt-3 overflow-hidden">
        {post.media.type === "image" ? (
          <img
            src={post.media.src}
            alt=""
            className="aspect-square w-full object-cover"
          />
        ) : (
          <video
            src={post.media.src}
            poster={post.media.poster}
            muted
            playsInline
            loop
            className="aspect-video w-full object-cover"
          />
        )}
      </div>
      <div className="flex items-center gap-5 px-4 py-3">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-stone-400 transition-colors hover:text-accent"
        >
          <Heart size={16} strokeWidth={1.75} />
          {post.likes}
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-medium text-stone-400 transition-colors hover:text-stone-300"
        >
          <MessageCircle size={16} strokeWidth={1.75} />
          {post.comments}
        </button>
      </div>
    </article>
  );
}

interface SocialFeedProps {
  character: Character;
  className?: string;
}

export default function SocialFeed({ character, className = "" }: SocialFeedProps) {
  const name = displayName(character.name);
  const posts = FEED_BY_CHARACTER[character.id] ?? DEFAULT_POSTS;
  const [teaser, ...locked] = posts;

  return (
    <aside
      className={`flex h-full flex-col border-white/[0.06] bg-stone-950/30 ${className}`}
    >
      <header className="shrink-0 border-b border-white/[0.06] px-5 py-5">
        <h2 className="font-serif text-lg font-semibold text-stone-50">{name}&apos;s Feed</h2>
        <p className="mt-0.5 text-xs text-stone-500">Exclusive Updates</p>
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
        {teaser && <PostCard post={teaser} />}

        {locked.length > 0 && (
          <div className="relative mt-4">
            <div className="space-y-4 blur-md select-none pointer-events-none" aria-hidden>
              {locked.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <div className="absolute inset-0 flex min-h-[320px] items-center justify-center rounded-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-stone-950/10 via-stone-950/80 to-stone-950 backdrop-blur-md" />
              <div className="relative z-10 mx-4 max-w-[280px] rounded-3xl border border-accent/25 bg-gradient-to-br from-stone-900/95 via-stone-950 to-accent/15 p-6 text-center shadow-xl">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <Lock size={22} strokeWidth={1.75} />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Subscription locked</p>
                <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-stone-50">
                  Unlock {name}&apos;s private feed
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-400">
                  Upgrade to the Subscription Tier to see daily photos, voice notes, and exclusive videos.
                </p>
                <button
                  type="button"
                  className="mt-5 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-white shadow-md shadow-accent/25 transition-colors hover:bg-accent-deep"
                >
                  Upgrade to view
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
