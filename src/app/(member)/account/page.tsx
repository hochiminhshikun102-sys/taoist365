import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account Runtime",
  description: "A quiet personal runtime layer for objects, orders, membership, Driftbox, and future AI presence.",
};

const primaryMenu = [
  {
    title: "Dashboard",
    note: "A quiet overview of what is waiting, moving, or resting.",
    href: "#dashboard",
  },
  {
    title: "My Objects",
    note: "Objects kept, received, requested, or continuing through Windkeep.",
    href: "#objects",
  },
  {
    title: "My Orders",
    note: "Orders, shipping states, return notes, and human support.",
    href: "#orders",
  },
  {
    title: "Membership",
    note: "Level, benefits, verification status, and reserved sharing points.",
    href: "#membership",
  },
  {
    title: "Driftbox",
    note: "Quiet correspondence, replies, and saved messages.",
    href: "#driftbox",
  },
  {
    title: "My AI",
    note: "A reserved personal AI runtime layer. Nothing noisy yet.",
    href: "#my-ai",
  },
  {
    title: "Settings",
    note: "Profile, locale, privacy, notifications, and account safety.",
    href: "#settings",
  },
] as const;

const mobileEssentials = ["Orders", "Objects", "Membership", "Driftbox", "Verification"];

const riskAllowed = ["Verification submission", "Status display", "Notifications"];

const phases = [
  "Client foundation runtime",
  "Sharing points entry reserved",
  "AI runtime extension",
  "Risk-control connection",
  "Logistics, membership, and AI loop",
] as const;

function SoftPanel({
  id,
  title,
  eyebrow,
  children,
}: Readonly<{
  id: string;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}>) {
  return (
    <section id={id} className="rounded-[1.75rem] border border-[#d8e2e6] bg-white/78 p-5 shadow-[0_24px_70px_rgba(117,139,149,0.14)] sm:p-7">
      <p className="text-xs font-medium tracking-[0.22em] text-[#6f8791] uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#243137] sm:text-4xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function AccountRuntimePage() {
  return (
    <main className="min-h-screen bg-[#f0f2f5] text-[#243137]">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,#ffffff_0%,#eef7fb_48%,#f6f8f4_100%)] p-6 shadow-[0_28px_90px_rgba(114,139,151,0.16)] sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Link href="/" className="text-sm text-[#6f8791] underline-offset-4 hover:underline">
              Reverent Inquiry
            </Link>
            <p className="mt-8 text-xs font-medium tracking-[0.24em] text-[#7d929b] uppercase">Human Runtime Layer</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.96] text-[#1f2d33] sm:text-6xl lg:text-7xl">
              A quiet place for your time here.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53666f]">
              Not a noisy dashboard. This space keeps objects, orders, membership, Driftbox, and future AI presence close without turning them into pressure.
            </p>
          </div>
          <div className="grid min-w-0 gap-2 rounded-3xl border border-[#d8e2e6] bg-white/72 p-4 text-sm text-[#53666f] sm:min-w-72">
            {mobileEssentials.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="rounded-2xl border border-transparent px-3 py-2 hover:border-[#cbd9de] hover:bg-[#f7fafb]">
                {item}
              </a>
            ))}
          </div>
        </header>

        <nav aria-label="Account runtime sections" className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {primaryMenu.map((item) => (
            <a key={item.title} href={item.href} className="shrink-0 rounded-full border border-[#d8e2e6] bg-white/74 px-4 py-2 text-sm text-[#53666f] shadow-[0_10px_24px_rgba(117,139,149,0.08)]">
              {item.title}
            </a>
          ))}
        </nav>

        <section id="dashboard" className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <SoftPanel id="emotional-overview" eyebrow="Dashboard" title="Emotional overview">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Objects", "2 resting"],
                ["Orders", "1 in passage"],
                ["Driftbox", "No pressure"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-[#d8e2e6] bg-[#f8fbfc] p-4">
                  <p className="text-sm text-[#7d929b]">{label}</p>
                  <p className="mt-4 text-2xl font-semibold text-[#2c3d44]">{value}</p>
                </div>
              ))}
            </div>
          </SoftPanel>

          <SoftPanel id="verification" eyebrow="Safety" title="Verification, status, notifications">
            <div className="grid gap-2">
              {riskAllowed.map((item) => (
                <div key={item} className="rounded-2xl border border-[#d8e2e6] bg-[#f8fbfc] px-4 py-3 text-[#53666f]">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[#7d929b]">
              Review queues and enforcement settings remain inside Admin OS only.
            </p>
          </SoftPanel>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {primaryMenu.slice(1).map((item) => (
            <article key={item.title} id={item.title.toLowerCase().replaceAll(" ", "-")} className="rounded-[1.5rem] border border-[#d8e2e6] bg-white/76 p-5 shadow-[0_20px_54px_rgba(117,139,149,0.12)]">
              <p className="text-xs font-medium tracking-[0.18em] text-[#7d929b] uppercase">{item.title}</p>
              <p className="mt-5 min-h-24 text-lg leading-8 text-[#40525a]">{item.note}</p>
              <a href={item.href} className="mt-5 inline-flex rounded-full border border-[#cbd9de] px-4 py-2 text-sm text-[#53666f]">
                Open quietly
              </a>
            </article>
          ))}
        </section>

        <section id="sharing-points" className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <SoftPanel id="membership-runtime" eyebrow="Membership" title="Sharing points remain reserved">
            <p className="text-base leading-8 text-[#53666f]">
              Sharing may later connect to points, membership multipliers, and channel rules. The entry is reserved only; no forced sharing, popup spam, or growth loop is active.
            </p>
          </SoftPanel>

          <SoftPanel id="runtime-phases" eyebrow="Roadmap" title="Long-running personal layer">
            <div className="grid gap-2 sm:grid-cols-2">
              {phases.map((phase, index) => (
                <div key={phase} className="rounded-2xl border border-[#d8e2e6] bg-[#f8fbfc] px-4 py-3 text-[#53666f]">
                  <span className="mr-3 font-mono text-xs text-[#8ca1a9]">{String(index + 1).padStart(2, "0")}</span>
                  {phase}
                </div>
              ))}
            </div>
          </SoftPanel>
        </section>
      </div>
    </main>
  );
}
