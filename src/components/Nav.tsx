import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, Sparkles, User, Mail } from "lucide-react";

interface NavProps {
  isWalletConnected: boolean;
  walletAddress: string;
  tokens: number;
  onConnectWallet: () => void;
}

export default function Nav({
  isWalletConnected,
  walletAddress,
  tokens,
  onConnectWallet,
}: NavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen((open) => {
      const next = !open;
      if (next) setHasUnread(false);
      return next;
    });
  };
  const browseActive = pathname === "/characters";
  const howItWorksActive = pathname === "/how-it-works";

  useEffect(() => {
    if (!isNotificationsOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

  const openCallieChat = () => {
    setIsNotificationsOpen(false);
    navigate("/chat/callie");
  };

  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12">
      <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25">
          <Sparkles className="text-white" size={20} />
        </div>
        <span className="font-serif text-2xl font-bold tracking-tight">VirtuaCrush</span>
      </Link>

      <div className="flex items-center gap-3 md:gap-5">
        <Link
          to="/characters"
          className={`hidden text-sm font-medium transition-colors sm:block ${
            browseActive ? "text-accent" : "text-stone-400 hover:text-stone-100"
          }`}
        >
          BROWSE CHARACTERS
        </Link>
        <Link
          to="/how-it-works"
          className={`hidden text-sm font-medium transition-colors sm:block ${
            howItWorksActive ? "text-accent" : "text-stone-400 hover:text-stone-100"
          }`}
        >
          HOW IT WORKS
        </Link>

        <button
          type="button"
          onClick={isWalletConnected ? undefined : onConnectWallet}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all md:px-5 ${
            isWalletConnected
              ? "border border-accent/25 bg-accent/10 text-rose-100"
              : "bg-stone-100 text-surface hover:bg-accent hover:text-white"
          }`}
        >
          <Wallet size={18} />
          {isWalletConnected ? (
            <span className="flex items-center gap-2">
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connected"}
              <span className="hidden opacity-40 md:inline">|</span>
              <span className="hidden md:inline">{tokens} $CRUSH</span>
            </span>
          ) : (
            "Connect Wallet"
          )}
        </button>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3">
          <div ref={notificationsRef} className="relative">
            <button
              type="button"
              onClick={toggleNotifications}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-stone-300 transition-all hover:border-accent/30 hover:bg-white/[0.08] hover:text-stone-50"
              aria-label="Messages and notifications"
              aria-expanded={isNotificationsOpen}
            >
              <Mail size={20} />
              {hasUnread ? (
                <span
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-surface"
                  aria-hidden
                >
                  1
                </span>
              ) : null}
            </button>

            {isNotificationsOpen ? (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-surface shadow-2xl"
                role="menu"
              >
                <div className="border-b border-white/[0.06] px-4 py-3">
                  <h3 className="text-sm font-semibold text-stone-100">Notifications</h3>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  onClick={openCallieChat}
                  className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-stone-100">Callie Spencer</span>
                    <span className="shrink-0 text-[11px] text-stone-500">Just now</span>
                  </div>
                  <span className="text-sm text-stone-400">Are you awake? 🥺</span>
                </button>
              </div>
            ) : null}
          </div>

          <Link
            to="/account"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-stone-300 transition-all hover:border-accent/30 hover:bg-white/[0.08] hover:text-stone-50"
            aria-label="Account and profile"
          >
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
