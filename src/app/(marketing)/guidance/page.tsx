import type { Metadata } from "next";
import Link from "next/link";
import { guidanceArrival } from "@/data/guidance-operating-layer/system";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Pause",
  description: "Short session on taoist365.com—a few lines, then plain links. No chat UI, no server memory.",
  openGraph: {
    title: `Pause · ${siteConfig.siteName}`,
    description: "Bounded session link; same domain as the rest of the site.",
    url: `${siteConfig.metadataBase}/guidance`,
  },
};

export default function GuidancePage() {
  return (
    <main className="min-h-full bg-background">
      <div className="room-section-y-standard relative mx-auto w-full max-w-xl px-5 sm:px-8">
        <div className="taoist-ritual-shell rounded-2xl border border-border-subtle bg-surface px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-xs text-text-muted/78">{guidanceArrival.eyebrow}</p>
          <h1 className="mt-2 text-xl text-foreground sm:text-2xl">{guidanceArrival.title}</h1>
          <p className="mt-4 text-sm leading-8 text-text-secondary">{guidanceArrival.lead}</p>
          <Link
            href={guidanceArrival.beginHref}
            className="taoist-quiet-action mt-8 inline-block rounded-lg border border-border-subtle bg-surface px-5 py-3 text-sm text-text-secondary transition hover:border-border-default hover:bg-white"
          >
            {guidanceArrival.beginLabel}
          </Link>
        </div>

        <p className="mt-10 text-xs leading-7 text-text-muted/55">
          <Link href="/" className="underline-offset-4 hover:text-text-secondary hover:underline">
            Home
          </Link>
          {" · "}
          <Link href="/rituals/daily-guidance" className="underline-offset-4 hover:text-text-secondary hover:underline">
            Daily guidance
          </Link>
        </p>
      </div>
    </main>
  );
}
