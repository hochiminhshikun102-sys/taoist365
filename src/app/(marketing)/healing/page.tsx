import type { Metadata } from "next";
import Link from "next/link";
import { healingCoreEntries, healingHallById, healingHalls, healingModuleById, healingModules } from "@/config/healing-ecosystem";
import { buildSeoGeoMetadata } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Healing Paths - Dohara",
  description: "A quiet entrance to Dohara Healing Paths: rooms, fragments, rituals, weather, and nearby notes.",
  path: "/healing",
  kind: "healing",
  phrases: ["Healing Paths", "quiet rooms", "browser air rooms", "soft daily ritual", "quiet internet"],
});

const pathFragments = [
  {
    title: "Rooms for tired evenings",
    line: "Maybe you have been carrying the day longer than you noticed.",
    href: healingHallById("meditation")?.href ?? "/healing",
  },
  {
    title: "Small rituals",
    line: "A minute can be enough when nothing is asking to be solved.",
    href: healingHallById("philosophy")?.href ?? "/healing",
  },
  {
    title: "Notes for slow mornings",
    line: "Leave one sentence nearby and let the rest of the morning stay open.",
    href: "/quiet-notes",
  },
  {
    title: "Things that stay nearby",
    line: "Some objects help because they do not perform.",
    href: "/windkeep",
  },
  {
    title: "Inner Weather",
    line: "The feeling does not need a label before it can have room.",
    href: healingHallById("elements")?.href ?? "/healing",
  },
  {
    title: "Quiet Corners",
    line: "A browser corner for the part of you that does not want to explain.",
    href: healingHallById("stories")?.href ?? "/healing",
  },
];

export default function HealingIndexPage() {
  const coreModules = healingCoreEntries.map((id) => healingModuleById(id)).filter(Boolean);

  return (
    <main className="ri-runtime-coherence relative min-h-full overflow-hidden bg-background">
      <div className="ri-runtime-depth pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="ri-runtime-depth__far" />
        <span className="ri-runtime-depth__mid" />
        <span className="ri-runtime-depth__front" />
      </div>

      <div className="room-section-y-standard relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <section className="grid min-h-[68vh] content-center gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
          <div>
            <p className="text-sm text-text-muted/85">Healing Paths</p>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[1.02] text-foreground sm:text-6xl">
              A quiet entrance, not a list of things to fix.
            </h1>
            <p className="ri-quiet-copy mt-6 max-w-xl text-sm leading-8 text-text-secondary">
              Forty-five paths live deeper inside the world. The first room only leaves fragments in the air, so a person can enter without being consumed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={healingHalls[0]?.href ?? "/healing"} className="quiet-air-touch rounded-lg bg-[#54788b] px-5 py-3 text-sm text-white hover:bg-[#466b7d]">
                Enter the paths
              </Link>
              <Link href="/quiet-notes" className="quiet-air-touch rounded-lg border border-[#cfe0e8] bg-white/54 px-5 py-3 text-sm text-text-secondary hover:bg-white/76">
                Read a note
              </Link>
            </div>
          </div>

          <div className="ri-air-worktable relative min-h-[31rem] overflow-hidden rounded-[1.4rem] border border-white/72 bg-white/50 p-5 shadow-[0_28px_90px_rgba(47,75,90,0.09)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_8%,rgba(255,255,255,0.92),transparent_58%),linear-gradient(145deg,rgba(234,244,250,0.6),rgba(255,253,249,0.78)_55%,rgba(246,241,232,0.6))]" />
            <div className="relative z-10 grid gap-4 sm:grid-cols-2">
              {pathFragments.map((fragment, index) => (
                <Link
                  key={fragment.title}
                  href={fragment.href}
                  className={`quiet-air-touch rounded-lg border border-white/70 bg-white/48 p-5 hover:bg-white/76 ${index === 0 || index === 5 ? "sm:translate-y-8" : ""}`}
                >
                  <p className="text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 text-2xl leading-tight text-foreground">{fragment.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{fragment.line}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-5 border-t border-border-subtle pt-10 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Complete world</p>
            <h2 className="mt-3 text-3xl text-foreground">The full 45 paths remain inside.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {healingHalls.map((hall) => (
              <Link key={hall.id} href={hall.href} className="quiet-air-touch rounded-lg border border-[#d7e5ea]/58 bg-white/46 p-4 transition hover:bg-white/70">
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{hall.shortTitle}</p>
                <h3 className="mt-3 text-xl leading-tight text-foreground">{hall.title}</h3>
                <p className="mt-3 text-xs leading-6 text-text-muted">{hall.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border-subtle pt-10">
          <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Nearby fragments</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-4">
            {coreModules.map((module) => {
              if (!module) return null;
              return (
                <Link key={module.id} href={`/healing/${module.hall}/${module.id}`} className="quiet-air-touch rounded-lg border border-[#d7e5ea]/58 bg-white/44 p-5 hover:bg-white/70">
                  <h3 className="text-2xl leading-tight text-foreground">{module.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{module.summary}</p>
                </Link>
              );
            })}
          </div>
          <p className="mt-8 text-sm leading-7 text-text-muted">
            {healingModules.length} paths are present, but the entrance stays quiet.
          </p>
        </section>
      </div>
    </main>
  );
}
