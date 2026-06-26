import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HealingModuleCard } from "@/components/healing/HealingModuleCard";
import { healingHallById, healingHalls, healingModulesForHall } from "@/config/healing-ecosystem";
import { lilaHumanPresence } from "@/config/lila-human-presence";
import { breadcrumbSchema, buildSeoGeoMetadata, SeoGeoJsonLd } from "@/lib/seo-geo-runtime";

type HealingHallPageProps = {
  params: Promise<{ hallId: string }>;
};

export function generateStaticParams() {
  return healingHalls.map((hall) => ({ hallId: hall.id }));
}

export async function generateMetadata({ params }: HealingHallPageProps): Promise<Metadata> {
  const { hallId } = await params;
  const hall = healingHallById(hallId);

  return buildSeoGeoMetadata({
    title: hall ? `${hall.title} - Dohara` : "Quiet Room - Dohara",
    description: hall?.summary ?? "Dohara quiet room.",
    path: hall?.href ?? "/healing",
    kind: "healing",
    phrases: hall ? [hall.shortTitle, hall.hero, hall.climate] : undefined,
  });
}

export default async function HealingHallPage({ params }: HealingHallPageProps) {
  const { hallId } = await params;
  const hall = healingHallById(hallId);

  if (!hall) {
    notFound();
  }

  const modules = healingModulesForHall(hall.id);

  return (
    <main className="min-h-full bg-background">
      <SeoGeoJsonLd
        graph={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Healing", path: "/healing" },
          { name: hall.title, path: hall.href },
        ])}
      />
      <div className="room-section-y-standard mx-auto w-full max-w-6xl px-6 sm:px-10">
        <Link href="/healing" className="text-xs text-text-muted underline-offset-4 hover:text-foreground hover:underline">
          Healing
        </Link>
        <section className="mt-5 grid gap-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{hall.shortTitle}</p>
            <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground sm:text-5xl">{hall.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-text-secondary">{hall.hero}</p>
          </div>
          <div className="rounded-[0.9rem_1.1rem_1rem_0.96rem] border border-border-subtle bg-white/52 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Hall climate</p>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{hall.climate}</p>
            <p className="mt-4 text-sm leading-7 text-text-muted">{hall.summary}</p>
          </div>
        </section>

        <nav className="mt-10 flex gap-3 overflow-x-auto pb-2" aria-label="Healing halls">
          {healingHalls.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs ${
                item.id === hall.id
                  ? "border-foreground/15 bg-foreground text-white"
                  : "border-border-subtle bg-white/52 text-text-secondary hover:bg-white/70"
              }`}
            >
              {item.shortTitle}
            </Link>
          ))}
        </nav>

        {hall.id === "stories" ? (
          <section className="mt-10 rounded-lg border border-[#c7d7df]/46 bg-white/72 p-5 shadow-[0_12px_34px_rgba(38,61,78,0.045)]">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Journal atmosphere</p>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-text-secondary">{lilaHumanPresence.journalNote}</p>
          </section>
        ) : null}

        <section className="mt-10 grid gap-5 lg:grid-cols-2" aria-label={`${hall.title} rooms`}>
          {modules.map((module) => (
            <HealingModuleCard key={module.id} module={module} />
          ))}
        </section>
      </div>
    </main>
  );
}
