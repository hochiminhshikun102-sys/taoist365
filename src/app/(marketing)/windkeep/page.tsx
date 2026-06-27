import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lilaHumanPresence } from "@/config/lila-human-presence";
import { productRuntimeIdForSourceId } from "@/config/product-runtime";
import { courierStatesLayer, longStayObjects } from "@/config/ri-foundation-civilization";
import { siteConfig } from "@/config/site";
import { quietReceivingObjects, windkeepArrivalLines, windkeepPassingObjects } from "@/config/windkeep-continuity";

export const metadata: Metadata = {
  title: "Windkeep",
  description: "Passing things, held quietly before they move to another room.",
  openGraph: {
    title: `Windkeep - ${siteConfig.siteName}`,
    description: "Objects pass gently through real rooms, carrying ordinary human traces.",
    url: `${siteConfig.metadataBase}/windkeep`,
  },
};

export default function WindkeepPage() {
  return (
    <main className="min-h-full bg-[#f6fbfc] text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f2fbff_0%,#ffffff_42%,#f5faf7_100%)]" />
        <div className="pointer-events-none absolute left-[-12%] top-[-8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(207,232,242,0.2),transparent_64%)]" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
          <section className="grid min-h-[70svh] gap-10 py-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
            <div>
              <p className="text-sm text-text-muted">Windkeep</p>
              <h1 className="mt-5 max-w-xl font-[var(--font-display-serif)] text-5xl font-normal leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
                Passing things, quietly held.
              </h1>
              <div className="mt-8 space-y-3">
                {windkeepArrivalLines.map((line) => (
                  <p key={line} className="max-w-md text-sm leading-8 text-text-secondary">
                    {line}
                  </p>
                ))}
              </div>
              <p className="mt-6 max-w-md text-xs leading-6 text-text-muted">{lilaHumanPresence.windkeepNote}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#passing-things"
                  className="rounded-[0.28rem] border border-foreground/16 bg-white/78 px-4 py-2.5 text-sm text-foreground/82 transition hover:bg-white"
                >
                  See passing things
                </Link>
                <Link href="/quiet-receiving" className="px-2 py-2.5 text-sm text-foreground/58 transition hover:text-foreground">
                  Quiet Receiving
                </Link>
              </div>
            </div>
            <div className="relative min-h-[28rem] overflow-hidden rounded-[1.1rem] border border-[#c7d7df]/48 bg-white/70 shadow-[0_24px_70px_rgba(38,61,78,0.07)]">
              <Image
                src="/homepage-hero/windkeep-lantern-sea.png"
                alt=""
                fill
                priority
                className="object-cover opacity-[0.94]"
                sizes="(max-width: 1024px) 92vw, 44rem"
                />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.02)),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(246,251,251,0.18))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/70 bg-white/72 p-4 shadow-[0_10px_28px_rgba(38,61,78,0.055)]">
                <p className="text-xs leading-6 text-text-secondary">
                  A shelf for real things that have been used, kept, released, and received without noise.
                </p>
              </div>
            </div>
          </section>

          <section className="scroll-mt-24 border-t border-[#d7e5ea]/60 py-10">
            <div className="mb-6">
              <h2 className="font-[var(--font-display-serif)] text-3xl font-normal text-foreground">Two quiet shelves</h2>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-text-secondary">
                Windkeep keeps passing things visible without turning them into a market. Quiet Receiving holds a smaller set for gentle handoff.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Link
                href="#passing-things"
                className="quiet-air-touch browser-air-presence clear-air-card relative min-h-[17rem] overflow-hidden rounded-lg border p-6"
              >
                <Image src="/brand/production/homepage/windkeep-section/passing-things-wide.jpg" alt="" fill className="object-cover opacity-[0.78]" sizes="(max-width: 1024px) 92vw, 34rem" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.48),rgba(255,255,255,0.03))]" />
                <div className="relative z-[1] max-w-md">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Passing Things</p>
                  <h3 className="mt-4 text-2xl leading-tight text-foreground">72 things, no rush.</h3>
                  <p className="mt-5 text-sm leading-8 text-text-secondary">
                    A finite shelf of ordinary objects moving slowly through real rooms.
                  </p>
                  <span className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-white/76 text-foreground/72">
                    -&gt;
                  </span>
                </div>
              </Link>
              <Link
                href="/quiet-receiving"
                className="quiet-air-touch browser-air-presence clear-air-card relative min-h-[17rem] overflow-hidden rounded-lg border p-6"
              >
                <Image src="/brand/production/homepage/windkeep-section/quiet-receiving-16x7.jpg" alt="" fill className="object-cover opacity-[0.76]" sizes="(max-width: 1024px) 92vw, 34rem" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.5),rgba(255,255,255,0.03))]" />
                <div className="relative z-[1] max-w-md">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet Receiving</p>
                  <h3 className="mt-4 text-2xl leading-tight text-foreground">24 gentle handoffs.</h3>
                  <p className="mt-5 text-sm leading-8 text-text-secondary">
                    A smaller receiving room for objects someone has softly released.
                  </p>
                  <span className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-white/76 text-foreground/72">
                    -&gt;
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <section id="passing-things" className="scroll-mt-24 border-t border-[#d7e5ea]/60 py-10">
            <div className="mb-7 grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Passing Things</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                  72 objects resting in public air.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-8 text-text-secondary lg:justify-self-end lg:text-right">
                No cost markers, no contest, no endless surface. Just small traces of presence, arranged like a shelf someone still tends.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {windkeepPassingObjects.map((object, index) => (
                <article
                  key={object.id}
                  className={`browser-air-presence overflow-hidden rounded-lg border border-[#c7d7df]/40 bg-white/72 shadow-[0_14px_38px_rgba(38,61,78,0.045)] ${
                    index % 3 === 1 ? "lg:translate-y-5" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-white/80">
                    <Link href={`/objects/${productRuntimeIdForSourceId(object.id)}`} aria-label={object.title} className="absolute inset-0 z-[1]" />
                    <Image src={object.image.src} alt={object.image.alt} fill className="object-cover opacity-[0.9]" sizes="(max-width: 768px) 92vw, 22rem" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(244,249,249,0.16))]" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs text-text-muted">{object.objectType} / {object.city}</p>
                    <Link href={`/objects/${productRuntimeIdForSourceId(object.id)}`} className="mt-3 block text-2xl leading-tight text-foreground">
                      {object.title}
                    </Link>
                    <p className="mt-4 text-sm leading-7 text-text-secondary">{object.storyFragment}</p>

                    <div className="mt-5 grid gap-3">
                      <div className="rounded-lg bg-[#f7fbfb] p-4">
                        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Trace</p>
                        <p className="mt-2 text-sm leading-6 text-foreground/78">{object.emotionalResidue}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-text-muted">
                      <span className="rounded-full border border-[#d7e5ea]/66 bg-white/68 px-3 py-1.5">{object.timeMark}</span>
                      <span className="rounded-full border border-[#d7e5ea]/66 bg-white/68 px-3 py-1.5">{object.passingStatus}</span>
                    </div>

                    {object.previousHolderNote ? <p className="mt-4 text-xs leading-6 text-text-muted">{object.previousHolderNote}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-[#d7e5ea]/60 py-10">
            <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet Receiving</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                  A smaller room for gentle handoff.
                </h2>
              </div>
              <div className="grid gap-3">
                {quietReceivingObjects.slice(0, 6).map((object) => (
                  <Link key={object.id} href="/quiet-receiving" className="quiet-air-touch rounded-lg border border-[#d7e5ea]/58 bg-white/68 p-5">
                    <p className="text-sm text-foreground">{object.title}</p>
                    <p className="mt-2 text-xs leading-6 text-text-secondary">{object.receivingNote}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#d7e5ea]/60 py-10">
            <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">The Courier</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                  The world is moving, quietly.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-8 text-text-secondary">
                  Only a few low signals that objects are crossing real rooms.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {courierStatesLayer.map((state) => (
                  <div key={state.id} className="rounded-lg border border-[#d7e5ea]/54 bg-white/62 p-5">
                    <p className="text-xs text-text-muted">{state.city} / {state.time}</p>
                    <p className="mt-3 text-sm leading-6 text-foreground">{state.objectTitle}</p>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{state.state}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#d7e5ea]/60 py-10">
            <div className="mb-7 grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Long Stay Objects</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                  Some things do not move.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-8 text-text-secondary lg:justify-self-end lg:text-right">
                A few objects gain weight by remaining. They are not inactive; they are settled.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {longStayObjects.map((object) => (
                <article key={object.id} className="browser-air-presence overflow-hidden rounded-lg border border-[#c7d7df]/38 bg-white/66 shadow-[0_12px_34px_rgba(38,61,78,0.035)]">
                  <div className="relative aspect-[4/3] bg-white/80">
                    <Image src={object.image} alt="" fill className="object-cover opacity-[0.86]" sizes="(max-width: 768px) 92vw, 16rem" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(246,251,252,0.18))]" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-text-muted">{object.place}</p>
                    <h3 className="mt-3 text-lg leading-6 text-foreground">{object.objectTitle}</h3>
                    <p className="mt-4 text-sm leading-7 text-text-secondary">{object.stayed}</p>
                    <p className="mt-3 text-xs leading-6 text-text-muted">{object.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-[#d7e5ea]/60 py-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">One plain note</p>
              <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                Receive without competing.
              </h2>
              <p className="mt-4 text-sm leading-8 text-text-secondary">
                If something feels close to your room, write one honest reason. A person can answer later. Nothing is ranked, chased, or announced.
              </p>
              <Link href="/quiet-receiving" className="mt-6 inline-flex rounded-[0.28rem] border border-foreground/14 bg-white/78 px-4 py-2.5 text-sm text-foreground/82 hover:bg-white">
                Enter Quiet Receiving
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
