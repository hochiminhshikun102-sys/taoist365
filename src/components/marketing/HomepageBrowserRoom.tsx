"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroAirRotation } from "@/components/marketing/HomepageHeroAirRotation";
import { LivingAtmosphereVeil } from "@/components/ritual/LivingAtmosphereVeil";
import {
  homepageFallbackRooms,
  homepageObjectSlots,
  homepagePresenceEntries,
  homepageRoomNotes,
  homepageSeasonalRooms,
  windResiduePlacement,
} from "@/config/quiet-placement";
import { siteConfig } from "@/config/site";
import { useWorldRuntime } from "@/lib/use-world-runtime";
import { resolveDriftboxRuntimeForDayKey } from "@/runtime/driftbox-runtime";
import { homepagePrimaryEntries } from "@/runtime/homepage-runtime-map";

export function HomepageBrowserRoom() {
  const { structuralSilence, worldAiNativeInfrastructure } = useWorldRuntime();
  const driftbox = resolveDriftboxRuntimeForDayKey(structuralSilence.dayKey);
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;

  const proseThin = st.combinedProseBias > 0.52 || st.dailyPreferUltraThin;
  const roomThin = st.combinedProseBias > 0.66 || st.dailyForceCloseEchoes;
  const roomSettled =
    st.combinedProseBias > 0.74 ||
    st.dailyForceCloseSliceNarrative ||
    Boolean(st.suppressFeatureTemptation) ||
    Boolean(st.suppressAtmosphericHeaviness);
  const showDriftboxResidue =
    driftbox.continuity.showHomepageResidue &&
    driftbox.sparse.allowHomepageTrace &&
    !driftbox.lowEvent.suppressEventLanguage &&
    !roomSettled &&
    !st.dailyForceCloseSliceNarrative;
  const visibleEntries = roomThin ? homepagePresenceEntries.slice(0, 4) : homepagePresenceEntries;
  const visibleSeasonRooms = roomSettled ? homepageSeasonalRooms.slice(0, 3) : homepageSeasonalRooms;
  const objectRooms = homepageObjectSlots.shelf;
  const windkeepObjects = homepageObjectSlots.secondaryShelf;
  const fallbackRooms = homepageFallbackRooms;

  return (
    <main className="min-h-full bg-background text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,242,245,0.98)_0%,rgba(244,246,248,0.94)_38%,rgba(232,236,241,0.78)_100%)]" />
        <LivingAtmosphereVeil tone="default" />
        <div className="relative z-[1] mx-auto w-full max-w-[92rem] px-4 pb-16 sm:px-7 lg:px-10">
          <section className="browser-air-presence human-residue-presence long-open-browser-softness relative overflow-hidden rounded-[0_0_0.78rem_0.92rem] border-x border-b border-white/40 bg-white/24 shadow-[0_10px_32px_rgba(29,42,56,0.02)]">
            <HomepageHeroAirRotation className="absolute inset-0 min-h-full rounded-none border-0 bg-transparent">
              <div className="hidden" />
            </HomepageHeroAirRotation>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(240,242,245,0.92)_0%,rgba(240,242,245,0.72)_34%,rgba(240,242,245,0.12)_64%),linear-gradient(180deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_72%,rgba(240,242,245,0.58)_100%)]" />
            <div className="wind-residue-object wind-residue-object--faint pointer-events-none absolute right-4 top-[20%] z-[1] hidden aspect-[5/4] w-[7rem] rounded-[0.72rem_0.9rem_0.8rem_0.84rem] sm:block lg:right-10 lg:top-[18%] lg:w-[8.5rem]">
              <Image src={windResiduePlacement.image} alt="" fill className="object-cover" sizes="9rem" />
            </div>

            <header className="relative z-[2] flex items-start justify-between gap-6 px-5 py-6 sm:px-8 lg:px-10">
              <Link href="/" className="flex items-center gap-3 text-foreground">
                <span
                  aria-hidden
                  className="h-8 w-14 shrink-0 bg-[url('/brand/production/air-mark.svg')] bg-contain bg-center bg-no-repeat opacity-78"
                />
                <span>
                  <span className="block text-sm uppercase tracking-[0.12em]">{siteConfig.brandEnName}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">
                    {siteConfig.domain}
                  </span>
                </span>
              </Link>
              <nav className="hidden items-center gap-7 text-[0.72rem] text-foreground/82 lg:flex">
                {[
                  ["Collections", "/collections"],
                  ["Objects", "/objects"],
                  ["Draw", "/rituals/draw-a-lot"],
                  ["Cart", "/cart"],
                  ["Mail", "/inquiry"],
                ].map(([item, href]) => (
                  <Link key={item} href={href} className="after:ml-7 after:text-text-muted/45 after:content-['.'] last:after:hidden">
                    {item}
                  </Link>
                ))}
              </nav>
              <p className="hidden max-w-[10rem] text-right text-[0.68rem] leading-5 text-text-muted sm:block">
                Keep it beside the day.
              </p>
            </header>

            <div className="relative z-[2] grid px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[0.62fr_0.38fr] lg:px-10 lg:pb-20">
              <div className="max-w-xl">
                <p className="mb-6 text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">
                  {siteConfig.domain}
                </p>
                <h1 className="max-w-[32rem] text-[2rem] font-normal leading-[1.12] text-foreground sm:text-5xl lg:text-[3.7rem]">
                  Reverent Inquiry
                </h1>
                {!proseThin ? (
                  <p className="mt-7 max-w-md text-sm leading-7 text-text-secondary">
                    Quiet objects, a simple draw-a-lot ritual, and mail when a purchase needs a human reply.
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
                  <Link
                    href="/collections"
                    className="taoist-quiet-action rounded-[0.28rem_0.34rem_0.32rem_0.3rem] border border-foreground/8 bg-white/18 px-3 py-1.5 text-foreground/66 transition hover:bg-white/42"
                  >
                    Shop objects
                  </Link>
                  <Link href="/rituals/draw-a-lot" className="text-foreground/66 transition hover:text-foreground">
                    Draw a lot
                  </Link>
                  <Link href="/cart" className="text-foreground/66 transition hover:text-foreground">
                    Cart
                  </Link>
                </div>
              </div>
              <aside className="mt-10 hidden max-w-[18rem] text-sm leading-7 text-text-secondary lg:block lg:place-self-center">
                <p>hello@taoist365.com</p>
              </aside>
            </div>

            <div className="relative z-[2] px-5 pb-5 sm:px-8 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:px-10">
              <div className="grid gap-px overflow-hidden rounded-[0.56rem_0.82rem_0.7rem_0.74rem] border border-border-subtle/44 bg-border-subtle/34 shadow-[0_8px_24px_rgba(29,42,56,0.018)] sm:grid-cols-2 lg:grid-cols-6">
                {visibleEntries.map((entry, index) => (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    className={`quiet-air-touch group bg-white/52 p-4 transition hover:bg-white/66 ${
                      index % 3 === 1 ? "lg:translate-y-2" : index % 3 === 2 ? "lg:-translate-y-0.5" : ""
                    }`}
                  >
                    <span className="block text-[0.62rem] text-text-muted">{entry.mark}</span>
                    <span className="mt-3 block text-sm text-foreground">{entry.label}</span>
                    {!roomThin ? (
                      <span className="mt-2 block text-[0.72rem] leading-5 text-text-muted">{entry.air}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto grid max-w-[86rem] gap-6 py-11 sm:py-12 lg:grid-cols-[0.24fr_0.76fr]">
            <div className="lg:pt-8">
              <h2 className="max-w-sm text-2xl leading-tight text-foreground sm:text-3xl">Nearby pages.</h2>
              {!proseThin ? (
                <p className="mt-5 max-w-xs text-sm leading-7 text-text-secondary">
                  Linked plainly, for when they are useful.
                </p>
              ) : null}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible">
              {visibleSeasonRooms.map((room, index) => (
                <article
                  key={room.label}
                  className={`browser-air-presence min-w-[11.2rem] overflow-hidden rounded-[0.56rem_0.82rem_0.7rem_0.78rem] border border-border-subtle/60 bg-white/58 shadow-[0_8px_22px_rgba(29,42,56,0.026)] ${
                    index % 2 === 1 ? "lg:translate-y-5" : index === 4 ? "lg:translate-y-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-white/60">
                    {room.image ? (
                      <Image src={room.image} alt="" fill className="object-cover opacity-[0.8]" sizes="14rem" />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.26))]" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-[var(--font-display-serif)] text-lg text-foreground">{room.label}</h3>
                    <p className="mt-1 text-xs text-text-muted">{room.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-11 sm:py-12">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">On the shelf</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  A few objects.
                </p>
              </div>
              <Link href="/objects" className="hidden text-sm text-foreground/62 hover:text-foreground sm:block">
                Objects
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {objectRooms.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/objects#${item.id}`}
                  className={`quiet-air-touch group block ${index === 1 || index === 4 ? "lg:translate-y-4" : ""}`}
                >
                  <div className="relative aspect-[1.18/1] overflow-hidden rounded-[0.64rem_0.78rem_0.7rem_0.74rem] border border-border-subtle/70 bg-white/62">
                    <Image src={item.photo.src} alt={item.photo.alt} fill className="object-cover opacity-[0.88]" sizes="(max-width: 768px) 45vw, 13vw" />
                  </div>
                  <p className="mt-3 text-sm leading-5 text-foreground">{item.title}</p>
                  <p className="mt-1 text-[0.72rem] leading-5 text-text-muted">{item.catalogLine}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-11 sm:py-12">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">Also here</h2>
                <p className="mt-2 text-sm text-text-secondary">Nothing needs to be followed in order.</p>
              </div>
              <p className="text-xs leading-6 text-text-muted sm:max-w-xs sm:text-right">
                Same domain.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(roomThin ? fallbackRooms.slice(0, 6) : fallbackRooms).map((room, index) => (
                <Link
                  key={`${room}-${index}`}
                  href={homepagePrimaryEntries[index % homepagePrimaryEntries.length]?.href ?? "/rituals"}
                  className={`border border-border-subtle/70 bg-white/50 p-5 transition hover:bg-white/70 ${
                    index % 3 === 1 ? "rounded-[0.96rem_0.72rem_0.9rem_0.78rem]" : "rounded-[0.72rem_0.92rem_0.78rem_0.86rem]"
                  }`}
                >
                  <p className="text-sm text-foreground">{room}</p>
                  {!roomThin ? (
                    <p className="mt-3 text-xs leading-6 text-text-muted">
                      {homepageRoomNotes[index % homepageRoomNotes.length]}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-11 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="rounded-[0.95rem_1.12rem_1rem_1.05rem] border border-border-subtle/72 bg-white/48 p-5 sm:p-7">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">
                      More objects
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                      {showDriftboxResidue
                        ? "A moved object may leave a small note before it appears again."
                        : "Objects stay close to ordinary use."}
                    </p>
                  </div>
                  <Link href="/objects" className="text-sm text-foreground/62 hover:text-foreground">
                    Objects
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {windkeepObjects.map((item, index) => (
                    <Link key={item.id} href={`/objects#${item.id}`} className={index % 2 === 0 ? "lg:-translate-y-2" : "lg:translate-y-3"}>
                      <div className="relative aspect-[1.35/1] overflow-hidden rounded-[0.55rem_0.72rem_0.6rem_0.68rem] border border-border-subtle/70 bg-white/68">
                        <Image src={item.photo.src} alt={item.photo.alt} fill className="object-cover opacity-[0.86]" sizes="(max-width: 768px) 45vw, 12vw" />
                      </div>
                      <p className="mt-3 text-sm leading-5 text-foreground">{item.title}</p>
                      <p className="mt-1 text-[0.72rem] leading-5 text-text-muted">{item.roomPlacement}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/objects#driftbox"
                className="relative overflow-hidden rounded-[0.82rem_0.72rem_0.8rem_0.76rem] border border-border-subtle/46 bg-white/24 p-5 shadow-none"
              >
                <div className="wind-residue-object wind-residue-object--faint pointer-events-none absolute right-3 top-3 aspect-[5/4] w-16 rounded-[0.55rem_0.7rem_0.62rem_0.66rem]">
                  <Image src={windResiduePlacement.image} alt="" fill className="object-cover" sizes="5rem" />
                </div>
                <div className="relative z-[1] flex min-h-[12rem] flex-col justify-end border-l border-border-subtle/70 pl-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">Note</p>
                  <h3 className="mt-3 max-w-xs text-xl leading-tight text-foreground">
                    After something moves on.
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {driftbox.lowEvent.oceanicLine}
                  </p>
                </div>
              </Link>
            </div>
          </section>

          <footer className="mx-auto flex max-w-[86rem] flex-wrap items-center justify-between gap-4 border-t border-border-subtle/70 py-7 text-sm text-text-secondary">
            <div>
              <p className="font-[var(--font-display-serif)] text-xl text-foreground">{siteConfig.brandEnName}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">{siteConfig.domain}</p>
            </div>
            <div className="flex flex-wrap gap-5 text-xs text-text-muted">
              <Link href="/objects" className="hover:text-text-secondary">Objects</Link>
              <Link href="/desk" className="hover:text-text-secondary">Desk</Link>
              <Link href="/inquiry" className="hover:text-text-secondary">Mail</Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
