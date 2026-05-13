import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lilaHumanPresence } from "@/config/lila-human-presence";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "The quiet human presence behind Reverent Inquiry.",
  openGraph: {
    title: `About - ${siteConfig.siteName}`,
    description: "Lila Vukovic keeps Reverent Inquiry close to ordinary light, useful objects, and human notes.",
    url: `${siteConfig.metadataBase}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-full bg-[#f6fbfc] text-foreground">
      <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <section className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div>
            <p className="text-sm text-text-muted">About</p>
            <h1 className="mt-4 font-[var(--font-display-serif)] text-5xl font-normal leading-tight text-foreground sm:text-6xl">
              {lilaHumanPresence.name}
            </h1>
            <p className="mt-3 text-sm text-text-muted">{lilaHumanPresence.role}</p>
            <p className="mt-7 max-w-md text-sm leading-8 text-text-secondary">
              {lilaHumanPresence.shortLine} Reverent Inquiry is kept as a gentle browser place for objects, letters, quiet rooms, and small returns.
            </p>
            <p className="mt-5 max-w-md text-sm leading-8 text-text-secondary">
              The work stays ordinary on purpose: sunlight, useful things, handwritten notes, and enough space for a visitor to breathe.
            </p>
            <p className="mt-6 max-w-sm font-[var(--font-display-serif)] text-2xl leading-9 text-foreground/82">
              {lilaHumanPresence.signatureLine}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/windkeep" className="rounded-[0.28rem] border border-foreground/14 bg-white/78 px-4 py-2.5 text-sm text-foreground/82 hover:bg-white">
                Visit Windkeep
              </Link>
              <Link href="/healing/stories" className="px-2 py-2.5 text-sm text-foreground/58 hover:text-foreground">
                Read Journal
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border border-[#c7d7df]/46 bg-white/76 shadow-[0_20px_60px_rgba(38,61,78,0.06)]">
            <Image
              src="/human/lila-vukovic-direction.png"
              alt="Lila Vukovic working with notes and quiet objects in soft daylight"
              width={1600}
              height={1000}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
