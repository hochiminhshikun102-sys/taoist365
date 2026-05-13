import type { Metadata } from "next";
import Link from "next/link";
import {
  healingCoreEntries,
  healingHalls,
  healingModuleById,
  healingModules,
  healingModulesForHall,
  windkeepHealingSurfaces,
} from "@/config/healing-ecosystem";
import { HealingModuleCard } from "@/components/healing/HealingModuleCard";

export const metadata: Metadata = {
  title: "Healing",
  description: "Reverent Inquiry quiet browser world: halls, modules, object stories, and light interactions.",
};

export default function HealingIndexPage() {
  const coreModules = healingCoreEntries.map((id) => healingModuleById(id)).filter(Boolean);

  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="text-xs text-text-muted/85">Healing</p>
        <section className="grid gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:items-end">
          <div>
            <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground sm:text-5xl">
              A quiet browser world with seven halls.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">
              Forty-five quiet rooms are held as browsable places first: clear entrances, soft pacing, mobile-friendly
              cards, save and share surfaces, and no heavy app behavior.
            </p>
          </div>
          <div className="rounded-[0.9rem_1.1rem_1rem_0.96rem] border border-border-subtle bg-white/52 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Current scope</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <p className="text-sm leading-7 text-text-secondary">7 halls</p>
              <p className="text-sm leading-7 text-text-secondary">{healingModules.length} rooms</p>
              <p className="text-sm leading-7 text-text-secondary">Soft page rhythm</p>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-7" aria-label="Seven halls">
          {healingHalls.map((hall) => (
            <Link key={hall.id} href={hall.href} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/50 p-4 transition hover:bg-white/70">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{hall.shortTitle}</p>
              <h2 className="mt-3 text-lg leading-tight text-foreground">{hall.title}</h2>
              <p className="mt-3 text-xs leading-6 text-text-muted">{healingModulesForHall(hall.id).length} rooms</p>
            </Link>
          ))}
        </section>

        <section className="mt-14 border-t border-border-subtle pt-10">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Core entrances</p>
            <h2 className="mt-3 text-3xl text-foreground">Four simple ways in.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {coreModules.map((module) => {
              if (!module) return null;
              return <HealingModuleCard key={module.id} module={module} />;
            })}
          </div>
        </section>

        <section className="mt-14 border-t border-border-subtle pt-10">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Windkeep layer</p>
            <h2 className="mt-3 text-3xl text-foreground">Objects, stories, and quiet circulation.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {windkeepHealingSurfaces.map((surface) => (
              <Link key={surface.title} href={surface.href} className="quiet-air-touch rounded-lg border border-border-subtle bg-white/48 p-5 hover:bg-white/68">
                <h3 className="text-lg text-foreground">{surface.title}</h3>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{surface.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border-subtle pt-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">All modules</p>
              <h2 className="mt-3 text-3xl text-foreground">A browsable quiet world.</h2>
            </div>
            <Link href="/search" className="text-sm text-text-muted underline-offset-4 hover:text-foreground hover:underline">
              Search the site
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {healingModules.map((module) => (
              <HealingModuleCard key={module.id} module={module} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
