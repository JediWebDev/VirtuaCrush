import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  KeyRound,
  CreditCard,
  Receipt,
  type LucideIcon,
} from "lucide-react";

type Section = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  fields?: { label: string; type: string; placeholder: string }[];
  action?: string;
  emptyText?: string;
};

const sections: Section[] = [
  {
    id: "personal",
    title: "Personal Info",
    icon: User,
    description: "Update your name and email used across VirtuaCrush.",
    fields: [
      { label: "Full name", type: "text", placeholder: "Your name" },
      { label: "Email", type: "email", placeholder: "you@email.com" },
    ],
  },
  {
    id: "login",
    title: "Login Help",
    icon: KeyRound,
    description: "Reset your password or recover account access.",
    fields: [{ label: "Email for reset link", type: "email", placeholder: "you@email.com" }],
    action: "Send reset link",
  },
  {
    id: "payment",
    title: "Payment Methods",
    icon: CreditCard,
    description: "Manage cards and billing details for subscriptions.",
    emptyText: "No payment methods on file. Add a card when you subscribe.",
  },
  {
    id: "subscription",
    title: "Subscription & Billing",
    icon: Receipt,
    description: "View your plan, renewal date, and invoices.",
    emptyText: "You are on the Free plan. Upgrade anytime from our pricing page.",
  },
];

function SectionCard({ section }: { section: Section }) {
  const Icon = section.icon;
  return (
    <section
      id={section.id}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-stone-50">{section.title}</h2>
          <p className="mt-0.5 text-sm text-stone-400">{section.description}</p>
        </div>
      </div>
      {section.fields && section.fields.length > 0 ? (
        <div className="space-y-4">
          {section.fields.map((field) => (
            <label key={field.label} className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-500">
                {field.label}
              </span>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-stone-100 outline-none transition-colors placeholder:text-stone-600 focus:border-accent/35 focus:ring-2 focus:ring-accent/10"
              />
            </label>
          ))}
          {section.action ? (
            <button
              type="button"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              {section.action}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-stone-500">{section.emptyText}</p>
      )}
    </section>
  );
}

export default function AccountPage() {
  return (
    <main className="relative px-6 pb-24 pt-4 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-stone-400 transition-colors hover:text-stone-100"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <div className="mb-10 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
            <User size={28} />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-50 md:text-4xl">Account</h1>
            <p className="mt-1 text-stone-400">Manage your profile, security, and billing.</p>
          </div>
        </div>
        <div className="space-y-6">
          {sections.map((s) => (
            <SectionCard key={s.id} section={s} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-stone-500">
          Need help?{" "}
          <a href="mailto:help@virtuacrush.com" className="text-accent hover:underline">
            help@virtuacrush.com
          </a>
        </p>
      </div>
    </main>
  );
}
