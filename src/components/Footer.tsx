import React from "react";
import { motion } from "motion/react";
import { Github, Twitter, Instagram, Send, Sparkles, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-surface px-6 pt-16 pb-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">VirtuaCrush</span>
            </div>
            <p className="mb-8 text-sm text-white/50 leading-relaxed">
              Explore the boundaries of digital consciousness. Connect with unique AI personas in our exclusive web3 companion ecosystem.
            </p>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent">Newsletter</h4>
              <div className="relative">
                <input
                  type="email"
                  placeholder="neuro-link@virtuacrush.so"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-sm outline-none focus:border-accent/40"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-accent p-2 text-white transition-all hover:scale-105 active:scale-95">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">Platform</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-accent cursor-pointer transition-colors">Explore Assets</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Neural Hub</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Premium Vault</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Web3 Wallet</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">Resources</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-accent cursor-pointer transition-colors">AI Ethics</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Colab Setup</li>
                <li className="hover:text-accent cursor-pointer transition-colors">API Keys</li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">Legal</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="hover:text-accent cursor-pointer transition-colors">Terms of Sync</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Privacy Core</li>
                <li className="hover:text-accent cursor-pointer transition-colors">Cookie Data</li>
              </ul>
            </div>
          </div>

          {/* Connect */}
          <div className="lg:col-span-1">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">Sync with us</h4>
            <div className="mb-8 flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, color: "var(--color-accent)" }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white/60 transition-colors"
                  href="#"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <div className="rounded-2xl glass p-4 text-center">
              <Mail size={24} className="mx-auto mb-2 text-accent" />
              <p className="text-xs text-white/40">Contact Support</p>
              <p className="text-sm font-medium">matrix@virtuacrush.so</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/30 md:flex-row">
          <p>© {currentYear} VirtuaCrush Neural Systems. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Status: Synchronized</span>
            <span className="hover:text-white cursor-pointer transition-colors">Version: 2.1.0-beta</span>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-64 w-full -translate-x-1/2 bg-accent/5 blur-[120px]" />
    </footer>
  );
}
