import { Link, useLocation } from "react-router-dom";
import { Wallet, Sparkles, User } from "lucide-react";

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
  const browseActive = pathname === "/characters";

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
          Browse Characters
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

        <Link
          to="/account"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-stone-300 transition-all hover:border-accent/30 hover:bg-white/[0.08] hover:text-stone-50"
          aria-label="Account and profile"
        >
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
