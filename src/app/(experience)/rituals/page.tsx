import type { Metadata } from "next";
import Link from "next/link";
import { experienceRoutes } from "@/config/experience-routes";
import { siteConfig } from "@/config/site";
import { LastRitualEcho } from "@/components/rituals/LastRitualEcho";
import { RitualsTemporalEcho } from "@/components/rituals/RitualsTemporalEcho";

// Taoist365 / Reverent Inquiry: quiet route surface.
export const metadata: Metadata = {
  title: "Rituals - Taoist365",
  description: "Static ritual URLs on taoist365.com—same nav as the rest of the site.",
};

export default function RitualsIndexPage() {
  return (
    <main className="room-section-y-standard mx-auto w-full max-w-3xl px-6 sm:px-10">
      <h1 className="text-3xl text-foreground">Rituals</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">
        Same domain as home—bookmark any URL; nothing scores returns.
      </p>
      <p className="mt-3 max-w-2xl text-xs leading-7 text-text-muted/72">{siteConfig.maintenanceLine}</p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">
        From{" "}
        <Link href="/guidance" className="text-foreground underline-offset-4 hover:underline">
          Pause
        </Link>{" "}
        or{" "}
        <Link href="/guidance/session" className="text-foreground underline-offset-4 hover:underline">
          session
        </Link>
        , then pick a link below.
      </p>
      <RitualsTemporalEcho />
      <LastRitualEcho />

      <div className="mt-10 space-y-4">
        {experienceRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="taoist-ritual-shell block rounded-xl border border-border-subtle bg-surface px-5 py-4 text-foreground transition hover:border-border-default hover:bg-white"
          >
            {route.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
