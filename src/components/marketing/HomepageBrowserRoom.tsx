"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroAirRotation } from "@/components/marketing/HomepageHeroAirRotation";
import { LivingAtmosphereVeil } from "@/components/ritual/LivingAtmosphereVeil";
import { siteConfig } from "@/config/site";
import { taoist365ObjectsCatalog } from "@/data/taoist365-objects-collection/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";
import { browserRoomHomeSurface } from "@/runtime/browser-room-runtime";
import { resolveDriftboxRuntimeForDayKey } from "@/runtime/driftbox-runtime";
import { quietCivilizationRoomDirections, quietHallDirections } from "@/runtime/hall-runtime-map";
import { homepagePrimaryEntries } from "@/runtime/homepage-runtime-map";
import { windkeepHomeSurface } from "@/runtime/windkeep-runtime";

const objectRooms = taoist365ObjectsCatalog.slice(0, 6);
const windkeepObjects = taoist365ObjectsCatalog.slice(2, 8);

const roomEntries = [
  { label: "Daily Note", href: "/rituals/daily-guidance", air: "One line near the morning.", mark: "01" },
  { label: "Windkeep", href: "/objects", air: "Objects that can sit on a shelf.", mark: "03" },
  { label: "Quiet Mail", href: "/inquiry", air: "A letter that can wait.", mark: "04" },
  { label: "Home Notes", href: "/rituals/home-harmony", air: "A page for the room.", mark: "07" },
  { label: "Evening Page", href: "/rituals", air: "Night light kept low.", mark: "08" },
  { label: "Small Line", href: "/rituals/daily-guidance", air: "A small sentence for the day.", mark: "11" },
] as const;

const seasonalRooms = [
  {
    label: "Morning",
    note: "Before work",
    image: taoist365ObjectsCatalog[1]?.photo.src,
  },
  {
    label: "Kitchen",
    note: "Counter light",
    image: taoist365ObjectsCatalog[2]?.photo.src,
  },
  {
    label: "Shelf",
    note: "Put down",
    image: taoist365ObjectsCatalog[6]?.photo.src,
  },
  {
    label: "Window",
    note: "Later",
    image: taoist365ObjectsCatalog[3]?.photo.src,
  },
  {
    label: "Return",
    note: "Back later",
    image: "/homepage-hero/windkeep-lantern-sea.png",
  },
] as const;

const quietRoomNotes = [
  "This link can sit here without needing a reason.",
  "Some pages are clearer when they stay partly unfinished.",
  "The browser keeps ordinary things close enough.",
  "Nothing here needs to become a list to complete.",
] as const;

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
  const visibleEntries = roomThin ? roomEntries.slice(0, 4) : roomEntries;
  const visibleSeasonRooms = roomSettled ? seasonalRooms.slice(0, 3) : seasonalRooms;
  const fallbackRooms = roomThin ? quietHallDirections : quietCivilizationRoomDirections.slice(0, 6);

  return (
    <main className="min-h-full bg-background text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(240,242,245,0.98)_0%,rgba(244,246,248,0.94)_38%,rgba(232,236,241,0.78)_100%)]" />
        <LivingAtmosphereVeil tone="default" />
        <div className="relative z-[1] mx-auto w-full max-w-[92rem] px-4 pb-16 sm:px-7 lg:px-10">
          <section className="relative min-h-[70svh] overflow-hidden rounded-[0_0_0.78rem_0.92rem] border-x border-b border-white/40 bg-white/28 shadow-[0_10px_32px_rgba(29,42,56,0.026)] sm:min-h-[78svh]">
            <HomepageHeroAirRotation className="absolute inset-0 min-h-full rounded-none border-0 bg-transparent">
              <div className="hidden" />
            </HomepageHeroAirRotation>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(240,242,245,0.92)_0%,rgba(240,242,245,0.72)_34%,rgba(240,242,245,0.12)_64%),linear-gradient(180deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_72%,rgba(240,242,245,0.58)_100%)]" />

            <header className="relative z-[2] flex items-start justify-between gap-6 px-5 py-6 sm:px-8 lg:px-10">
              <Link href="/" className="flex items-center gap-3 text-foreground">
                <span className="grid size-11 place-items-center rounded-full border border-foreground/35 font-[var(--font-display-serif)] text-lg">
                  RI
                </span>
                <span>
                  <span className="block text-sm uppercase tracking-[0.12em]">{siteConfig.brandEnName}</span>
                  <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.12em] text-text-muted">
                    Taoist365
                  </span>
                </span>
              </Link>
              <nav className="hidden items-center gap-7 text-[0.72rem] text-foreground/82 lg:flex">
                {["Guidance", "Objects", "Desk", "Mail", "Pause"].map((item) => (
                  <span key={item} className="after:ml-7 after:text-text-muted/45 after:content-['.'] last:after:hidden">
                    {item}
                  </span>
                ))}
              </nav>
              <p className="hidden max-w-[10rem] text-right text-[0.68rem] leading-5 text-text-muted sm:block">
                Keep it beside the day.
              </p>
            </header>

            <div className="relative z-[2] grid min-h-[40svh] content-center px-5 pb-8 pt-7 sm:min-h-[54svh] sm:px-8 lg:grid-cols-[0.58fr_0.42fr] lg:px-10 lg:pb-24">
              <div className="max-w-xl">
                <p className="mb-6 text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">
                  {browserRoomHomeSurface.airRoomLabel}
                </p>
                <h1 className="max-w-[38rem] text-[2.25rem] font-normal leading-[1.09] text-foreground sm:text-6xl lg:text-[4.85rem]">
                  A quiet page to keep beside the day.
                </h1>
                {!proseThin ? (
                  <p className="mt-7 max-w-md text-sm leading-7 text-text-secondary">
                    Open it for a minute, leave it in a tab, or come back after ordinary things.
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
                  <Link
                    href="/rituals"
                    className="rounded-[0.32rem] border border-foreground/12 bg-white/28 px-3.5 py-2 text-foreground/78 transition hover:bg-white/56"
                  >
                    Open a page
                  </Link>
                  <Link href="/guidance" className="text-foreground/82 transition hover:text-foreground">
                    Read a line {"->"}
                  </Link>
                </div>
              </div>
              <aside className="mt-10 hidden max-w-[18rem] border-l border-border-subtle/80 bg-white/28 px-6 py-5 text-sm leading-7 text-text-secondary backdrop-blur-[1px] lg:block lg:place-self-center">
                <p className="mb-3 font-[var(--font-display-serif)] text-3xl text-foreground/82">&ldquo;</p>
                <p>The page can stay open without asking much.</p>
                <p className="mt-4 text-[0.68rem] text-text-muted">Master Sandong, off-frame</p>
              </aside>
            </div>

            <div className="relative z-[2] px-5 pb-5 sm:px-8 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:px-10">
              <div className="grid gap-px overflow-hidden rounded-[0.56rem_0.82rem_0.7rem_0.74rem] border border-border-subtle/54 bg-border-subtle/42 shadow-[0_8px_24px_rgba(29,42,56,0.026)] sm:grid-cols-2 lg:grid-cols-6">
                {visibleEntries.map((entry, index) => (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    className={`group bg-white/64 p-4 transition hover:bg-white/78 ${
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

          <section className="mx-auto grid max-w-[86rem] gap-8 py-14 sm:py-16 lg:grid-cols-[0.24fr_0.76fr]">
            <div className="lg:pt-8">
              <h2 className="max-w-sm text-2xl leading-tight text-foreground sm:text-3xl">
                A few pages for different moments.
              </h2>
              {!proseThin ? (
                <p className="mt-5 max-w-xs text-sm leading-7 text-text-secondary">
                  Small pages, linked plainly, for when they are useful.
                </p>
              ) : null}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible">
              {visibleSeasonRooms.map((room, index) => (
                <article
                  key={room.label}
                  className={`min-w-[11.2rem] overflow-hidden rounded-[0.56rem_0.82rem_0.7rem_0.78rem] border border-border-subtle/60 bg-white/58 shadow-[0_8px_22px_rgba(29,42,56,0.026)] ${
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

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-14 sm:py-16">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">Objects resting nearby</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Things that can sit in a real room before they become anything else.
                </p>
              </div>
              <Link href="/objects" className="hidden text-sm text-foreground/76 hover:text-foreground sm:block">
                View all objects {"->"}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {objectRooms.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/objects#${item.id}`}
                  className={`group block ${index === 1 || index === 4 ? "lg:translate-y-4" : ""}`}
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

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-14 sm:py-16">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">Other pages nearby</h2>
                <p className="mt-2 text-sm text-text-secondary">Nothing needs to be followed in order.</p>
              </div>
              <p className="text-xs leading-6 text-text-muted sm:max-w-xs sm:text-right">
                The site can be left alone.
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
                      {quietRoomNotes[index % quietRoomNotes.length]}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/80 py-14 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="rounded-[0.95rem_1.12rem_1rem_1.05rem] border border-border-subtle/72 bg-white/48 p-5 sm:p-7">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="text-2xl leading-tight text-foreground sm:text-3xl">
                      {windkeepHomeSurface.kicker} . Objects in passage
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                      {showDriftboxResidue
                        ? "A moved object may leave a small note before it appears again."
                        : "Objects stay close to ordinary use."}
                    </p>
                  </div>
                  <Link href="/objects" className="text-sm text-foreground/76 hover:text-foreground">
                    View objects {"->"}
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
                className="relative overflow-hidden rounded-[0.82rem_0.72rem_0.8rem_0.76rem] border border-border-subtle/55 bg-white/34 p-5 shadow-none"
              >
                <div className="relative z-[1] flex min-h-[12rem] flex-col justify-end border-l border-border-subtle/70 pl-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">Inside Windkeep</p>
                  <h3 className="mt-3 max-w-xs text-xl leading-tight text-foreground">Driftbox, after something moves on.</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    {driftbox.lowEvent.oceanicLine}
                  </p>
                </div>
              </Link>
            </div>
          </section>

          <footer className="mx-auto grid max-w-[86rem] gap-8 border-t border-border-subtle/70 py-10 text-sm text-text-secondary lg:grid-cols-[0.48fr_0.52fr]">
            <div>
              <p className="font-[var(--font-display-serif)] text-xl text-foreground">{siteConfig.brandEnName}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-text-muted">Taoist365</p>
              <p className="mt-5 max-w-sm leading-7">
                A page can stay open, or not. Mail still works.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr_1.15fr]">
              {["Line", "Shelf", "Mail"].map((group, index) => (
                <div key={group} className="border-b border-border-subtle/70 pb-4 sm:border-b-0">
                  <p className="text-foreground">{group}</p>
                  <p className="mt-3 text-xs leading-6 text-text-muted">
                    {index === 0
                      ? "A line, then the day continues."
                      : index === 1
                        ? "Things can move by mail."
                        : "A note can wait."}
                  </p>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
