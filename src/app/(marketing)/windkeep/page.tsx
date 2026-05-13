import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { windkeepArrivalLines, windkeepObjects } from "@/config/windkeep-continuity";

export const metadata: Metadata = {
  title: "Windkeep",
  description: "A browser-native world where objects continue through time.",
  openGraph: {
    title: `Windkeep - ${siteConfig.siteName}`,
    description: "Objects pass gently through time, carrying quiet traces from room to room.",
    url: `${siteConfig.metadataBase}/windkeep`,
  },
};

export default function WindkeepPage() {
  return (
    <main className="min-h-full bg-[#f4f8f9] text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(238,247,251,0.96),rgba(251,252,249,0.94)_46%,rgba(241,247,246,0.98))]" />
        <div className="pointer-events-none absolute left-[-18%] top-[-12%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(205,230,239,0.34),transparent_62%)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-12%] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(218,236,229,0.28),transparent_64%)] blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
          <section className="grid min-h-[70svh] gap-10 py-8 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
            <div>
              <p className="text-sm text-text-muted">Windkeep</p>
              <h1 className="mt-5 max-w-xl font-[var(--font-display-serif)] text-5xl font-normal leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
                Objects pass gently through time.
              </h1>
              <div className="mt-8 space-y-3">
                {windkeepArrivalLines.map((line) => (
                  <p key={line} className="max-w-md text-sm leading-8 text-text-secondary">
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="#paths"
                  className="rounded-[0.28rem] border border-foreground/16 bg-white/44 px-4 py-2.5 text-sm text-foreground/82 transition hover:bg-white/64"
                >
                  Choose a path
                </Link>
                <Link href="#objects" className="px-2 py-2.5 text-sm text-foreground/58 transition hover:text-foreground">
                  See passing objects
                </Link>
              </div>
            </div>
            <div className="relative min-h-[28rem] overflow-hidden rounded-[1.1rem] border border-white/76 bg-white/38 shadow-[0_24px_70px_rgba(29,42,56,0.055)]">
              <Image
                src="/homepage-hero/windkeep-lantern-sea.png"
                alt=""
                fill
                priority
                className="object-cover opacity-[0.82]"
                sizes="(max-width: 1024px) 92vw, 44rem"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.42),rgba(255,255,255,0.08)),linear-gradient(180deg,rgba(238,247,251,0.18),rgba(255,255,255,0.46))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/70 bg-white/46 p-4 backdrop-blur-sm">
                <p className="text-xs leading-6 text-text-secondary">
                  A place for continuation, passing, emotional traces, object memory, and quiet receiving.
                </p>
              </div>
            </div>
          </section>

          <section id="paths" className="scroll-mt-24 border-t border-white/70 py-10">
            <div className="mb-6">
              <h2 className="font-[var(--font-display-serif)] text-3xl font-normal text-foreground">Choose a Continuation Path</h2>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-text-secondary">
                Two quiet ways for an object to keep moving, without urgency or public performance.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Link
                href="#objects"
                className="quiet-air-touch browser-air-presence relative min-h-[18rem] overflow-hidden rounded-lg border border-white/76 bg-white/50 p-6 shadow-[0_18px_48px_rgba(29,42,56,0.04)]"
              >
                <Image src="/home-hero/desktop-03.png" alt="" fill className="object-cover opacity-[0.44]" sizes="(max-width: 1024px) 92vw, 34rem" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.78),rgba(255,255,255,0.2))]" />
                <div className="relative z-[1] max-w-md">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Passing Things</p>
                  <h3 className="mt-4 text-2xl leading-tight text-foreground">{"\u7269\u4e0e\u65f6\u9047"}</h3>
                  <p className="mt-5 text-sm leading-8 text-text-secondary">
                    Objects exchanged through stories and continuation.
                  </p>
                  <span className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-white/64 text-foreground/72">
                    {"\u2192"}
                  </span>
                </div>
              </Link>
              <Link
                href="/quiet-receiving"
                className="quiet-air-touch browser-air-presence relative min-h-[18rem] overflow-hidden rounded-lg border border-white/76 bg-white/50 p-6 shadow-[0_18px_48px_rgba(29,42,56,0.04)]"
              >
                <Image src="/objects-living/23.jpg" alt="" fill className="object-cover opacity-[0.42]" sizes="(max-width: 1024px) 92vw, 34rem" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.78),rgba(255,255,255,0.18))]" />
                <div className="relative z-[1] max-w-md">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet Receiving</p>
                  <h3 className="mt-4 text-2xl leading-tight text-foreground">{"\u7b11\u7eb3"}</h3>
                  <p className="mt-5 text-sm leading-8 text-text-secondary">
                    Objects quietly waiting for their next keeper.
                  </p>
                  <span className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-white/64 text-foreground/72">
                    {"\u2192"}
                  </span>
                </div>
              </Link>
            </div>
          </section>

          <section id="objects" className="scroll-mt-24 border-t border-white/70 py-10">
            <div className="mb-7 grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Object Browsing Layer</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                  Passing objects
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-8 text-text-secondary lg:justify-self-end lg:text-right">
                The object comes first. Price, urgency, and performance stay outside this room.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {windkeepObjects.map(({ object, memory }, index) => (
                <article
                  key={object.id}
                  className={`browser-air-presence overflow-hidden rounded-lg border border-white/76 bg-white/54 shadow-[0_18px_48px_rgba(29,42,56,0.035)] ${
                    index % 2 === 1 ? "lg:translate-y-7" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-white/60">
                    <Image src={object.media.placement} alt={object.media.alt} fill className="object-cover opacity-[0.82]" sizes="(max-width: 768px) 92vw, 32rem" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(244,249,249,0.34))]" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs text-text-muted">{memory.passingTime} / {memory.cities.join(" / ")}</p>
                    <h3 className="mt-3 text-2xl leading-tight text-foreground">{object.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-text-secondary">{memory.shortStory}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-white/46 p-4">
                        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Previous keeper</p>
                        <p className="mt-2 text-sm leading-6 text-foreground/78">{memory.previousKeeper}</p>
                      </div>
                      <div className="rounded-lg bg-white/46 p-4">
                        <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Years</p>
                        <p className="mt-2 text-sm leading-6 text-foreground/78">{memory.years.join(" / ")}</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-lg border border-white/70 bg-[#f8fbfb]/62 p-4">
                      <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Drift Notes</p>
                      <ul className="mt-3 space-y-2">
                        {memory.continuityNotes.map((note) => (
                          <li key={note} className="text-sm leading-7 text-text-secondary">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {memory.traces.map((trace) => (
                        <span key={trace} className="rounded-full border border-white/70 bg-white/52 px-3 py-1.5 text-xs text-text-muted">
                          {trace}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link href={`/objects/${object.id}`} className="text-sm text-foreground underline-offset-4 hover:underline">
                        Object memory
                      </Link>
                      <Link href={`/inquiry?object=${object.id}`} className="rounded-[0.28rem] border border-foreground/14 bg-white/48 px-4 py-2 text-sm text-foreground/82 hover:bg-white/68">
                        Request Continuation
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-white/70 py-10">
            <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet Pairing</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                  Suggested Continuations
                </h2>
              </div>
              <div className="grid gap-3">
                {windkeepObjects.slice(0, 4).map(({ object, memory }) => (
                  <Link key={object.id} href={`/inquiry?object=${object.id}`} className="quiet-air-touch rounded-lg border border-white/70 bg-white/46 p-5">
                    <p className="text-sm text-foreground">{object.title}</p>
                    <p className="mt-2 text-xs leading-6 text-text-secondary">{memory.quietPairing}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-white/70 py-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Continuation Request</p>
              <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl font-normal text-foreground">
                Continue This Object
              </h2>
              <p className="mt-4 text-sm leading-8 text-text-secondary">
                A continuation request is a quiet note: why this object matters, where it may continue, and what feeling makes it belong near you.
              </p>
              <Link href="/inquiry" className="mt-6 inline-flex rounded-[0.28rem] border border-foreground/14 bg-white/50 px-4 py-2.5 text-sm text-foreground/82 hover:bg-white/70">
                Write a continuation note
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
