import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { productRuntimeIdForSourceId } from "@/config/product-runtime";
import { quietReceivingObjects } from "@/config/windkeep-continuity";
import { breadcrumbSchema, buildSeoGeoMetadata, faqSchema, SeoGeoJsonLd } from "@/lib/seo-geo-runtime";

export const metadata: Metadata = buildSeoGeoMetadata({
  title: "Quiet Receiving - Dohara",
  description: "Objects quietly waiting for their next keeper inside Windkeep.",
  path: "/quiet-receiving",
  kind: "quiet-receiving",
  phrases: ["object continuation", "next keeper", "continuation request", "Windkeep"],
});

export default function QuietReceivingPage() {
  return (
    <main className="min-h-full bg-[#f6fbfc] text-foreground">
      <SeoGeoJsonLd
        graph={[
          faqSchema([
            {
              question: "What is Quiet Receiving?",
              answer: "Quiet Receiving is the Windkeep room for a small number of released objects that may continue gently with another person.",
            },
            {
              question: "Is this competitive?",
              answer: "No. There is no ranking, countdown, or collection contest.",
            },
          ]),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Windkeep", path: "/windkeep" },
            { name: "Quiet Receiving", path: "/quiet-receiving" },
          ]),
        ]}
      />
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f2fbff_0%,#ffffff_46%,#f5faf7_100%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
          <section className="grid gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-end">
            <div>
              <p className="text-sm text-text-muted">Windkeep / Quiet Receiving</p>
              <h1 className="mt-4 font-[var(--font-display-serif)] text-5xl font-normal leading-tight text-foreground sm:text-6xl">
                A room for gentle receiving.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-text-secondary">
                Twenty-four released objects wait here without urgency. A person can write one plain note, then let the reply arrive slowly.
              </p>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden rounded-lg border border-[#c7d7df]/48 bg-white/72 shadow-[0_18px_52px_rgba(38,61,78,0.06)]">
              <Image src="/brand/production/homepage/windkeep-section/quiet-receiving.jpg" alt="" fill priority className="object-cover opacity-[0.88]" sizes="(max-width: 1024px) 92vw, 34rem" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.22),rgba(255,255,255,0.02))]" />
            </div>
          </section>

          <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quietReceivingObjects.map((object, index) => (
              <article
                key={object.id}
                className={`browser-air-presence overflow-hidden rounded-lg border border-[#c7d7df]/40 bg-white/72 shadow-[0_14px_40px_rgba(38,61,78,0.045)] ${
                  index % 3 === 1 ? "lg:translate-y-5" : ""
                }`}
              >
                <div className="relative aspect-[4/3] bg-white/80">
                  <Link href={`/objects/${productRuntimeIdForSourceId(object.id)}`} aria-label={object.title} className="absolute inset-0 z-[1]" />
                  <Image src={object.image.src} alt={object.image.alt} fill className="object-cover opacity-[0.9]" sizes="(max-width: 768px) 92vw, 22rem" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(246,251,252,0.18))]" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-text-muted">{object.objectType} / {object.city}</p>
                  <Link href={`/objects/${productRuntimeIdForSourceId(object.id)}`} className="mt-3 block text-xl leading-tight text-foreground">
                    {object.title}
                  </Link>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{object.storyFragment}</p>
                  <div className="mt-5 rounded-lg bg-[#f7fbfb] p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Released because</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/78">{object.releaseReason}</p>
                  </div>
                  {object.emotionalContext ? <p className="mt-4 text-xs leading-6 text-text-muted">{object.emotionalContext}</p> : null}
                  <div className="mt-5 rounded-lg border border-[#d7e5ea]/58 bg-white/68 p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Receiving note</p>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">{object.receivingNote}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {object.acceptanceFlow.map((step) => (
                      <span key={step} className="rounded-full border border-[#d7e5ea]/66 bg-white/68 px-3 py-1.5 text-xs text-text-muted">
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </section>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/windkeep" className="rounded-[0.28rem] border border-foreground/14 bg-white/78 px-4 py-2.5 text-sm text-foreground/82 hover:bg-white">
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
