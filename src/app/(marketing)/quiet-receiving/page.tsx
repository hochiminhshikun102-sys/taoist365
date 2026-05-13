import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { windkeepObjects } from "@/config/windkeep-continuity";

export const metadata: Metadata = {
  title: "Quiet Receiving",
  description: "Objects quietly waiting for their next keeper inside Windkeep.",
};

export default function QuietReceivingPage() {
  return (
    <main className="min-h-full bg-[#f5f9f9] text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(239,248,251,0.98),rgba(252,252,249,0.94)_44%,rgba(245,249,247,0.98))]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
          <section className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <div>
              <p className="text-sm text-text-muted">Windkeep / Quiet Receiving</p>
              <h1 className="mt-4 font-[var(--font-display-serif)] text-5xl font-normal leading-tight text-foreground sm:text-6xl">
                Objects waiting quietly.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-text-secondary">
                Quiet Receiving is for objects that may continue with another keeper. Nothing is rushed; a person writes why the object may belong near them.
              </p>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden rounded-lg border border-white/76 bg-white/50 shadow-[0_18px_52px_rgba(29,42,56,0.04)]">
              <Image src="/objects-living/23.jpg" alt="" fill priority className="object-cover opacity-[0.72]" sizes="(max-width: 1024px) 92vw, 34rem" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.54),rgba(255,255,255,0.12))]" />
            </div>
          </section>

          <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {windkeepObjects.slice(0, 6).map(({ object, memory }) => (
              <article key={object.id} className="browser-air-presence overflow-hidden rounded-lg border border-white/76 bg-white/52 shadow-[0_14px_40px_rgba(29,42,56,0.035)]">
                <div className="relative aspect-[4/3] bg-white/60">
                  <Image src={object.media.placement} alt={object.media.alt} fill className="object-cover opacity-[0.82]" sizes="(max-width: 768px) 92vw, 22rem" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-text-muted">{memory.passingTime} · {memory.cities.join(" / ")}</p>
                  <h2 className="mt-3 text-xl leading-tight text-foreground">{object.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{memory.shortStory}</p>
                  <Link href={`/inquiry?object=${object.id}`} className="mt-5 inline-flex rounded-[0.28rem] border border-foreground/14 bg-white/48 px-4 py-2 text-sm text-foreground/82 hover:bg-white/70">
                    Continue This Object
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/windkeep" className="rounded-[0.28rem] border border-foreground/14 bg-white/52 px-4 py-2.5 text-sm text-foreground/82 hover:bg-white/70">
              Back to Windkeep
            </Link>
            <Link href="/inquiry" className="px-2 py-2.5 text-sm text-foreground/58 hover:text-foreground">
              Write a continuation note
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
