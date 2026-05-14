"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroCarousel } from "@/components/marketing/HomepageHeroCarousel";
import { QuietSubscription } from "@/components/marketing/QuietSubscription";
import { lilaHumanPresence } from "@/config/lila-human-presence";
import { commerceObjects } from "@/config/operational-commerce";
import {
  homepageObjectSlots,
  homepageSeasonalRooms,
  windResiduePlacement,
} from "@/config/quiet-placement";
import { siteConfig } from "@/config/site";
import { useWorldRuntime } from "@/lib/use-world-runtime";
import { resolveDriftboxRuntimeForDayKey } from "@/runtime/driftbox-runtime";

const waysToBegin = [
  {
    title: "Daily Guidance",
    body: "A gentle note to start your day.",
    href: "/rituals/daily-guidance",
    image: "/brand/production/homepage/ways-to-begin/daily-guidance-tao-doll.png",
    mark: "sun",
  },
  {
    title: "Feng Shui Space",
    body: "Let a room feel easier to stay in.",
    href: "/rituals/home-harmony",
    image: "/brand/production/homepage/ways-to-begin/feng-shui-wind-chime.png",
    mark: "air",
  },
  {
    title: "Fortune Draw",
    body: "Listen to a small message without pressure.",
    href: "/rituals/draw-a-lot",
    image: "/brand/production/homepage/ways-to-begin/fortune-draw-lotus-incense.png",
    mark: "lot",
  },
  {
    title: "Driftbox",
    body: "Send a question into quiet correspondence.",
    href: "/inquiry",
    image: "/brand/production/homepage/ways-to-begin/driftbox-letter-leaf.png",
    mark: "mail",
  },
] as const;

const pathsOfLife = [
  { title: "Relationships", body: "Connection and repair", href: "/healing/stories", mark: "rel" },
  { title: "Home", body: "A room with room to breathe", href: "/healing/elements", mark: "home" },
  { title: "Timing", body: "Moving with the right moment", href: "/healing/philosophy", mark: "time" },
  { title: "Energy", body: "Returning to your own pace", href: "/healing/meditation", mark: "leaf" },
  { title: "Direction", body: "Finding a quiet next step", href: "/healing/creation", mark: "path" },
  { title: "Choices", body: "Deciding without force", href: "/healing/playground", mark: "turn" },
  { title: "Return", body: "Coming back to yourself", href: "/healing/subscriptions", mark: "rest" },
] as const;

const mainEntries = [
  {
    title: "Healing",
    body: "Quiet rooms for body, mind, and spirit.",
    href: "/healing",
    image: "/brand/production/homepage/healing-world-layer/healing.jpg",
    mark: "leaf",
  },
  {
    title: "Windkeep",
    body: "A world of objects in passage.",
    href: "/windkeep",
    image: "/brand/production/homepage/healing-world-layer/windkeep.jpg",
    mark: "air",
  },
  {
    title: "Driftbox",
    body: "Quiet correspondence and reflection.",
    href: "/inquiry",
    image: "/brand/production/homepage/healing-world-layer/driftbox.jpg",
    mark: "mail",
  },
  {
    title: "Live",
    body: "Ambient rooms for gentle presence.",
    href: "/live",
    image: "/brand/production/homepage/healing-world-layer/live.jpg",
    mark: "live",
  },
  {
    title: "Objects",
    body: "Thoughtful things for slow living.",
    href: "/objects",
    image: "/brand/production/homepage/healing-world-layer/objects.jpg",
    mark: "obj",
  },
  {
    title: "Journal",
    body: "Notes, traces, and small returns.",
    href: "/healing/stories",
    image: "/brand/production/homepage/healing-world-layer/journal.jpg",
    mark: "note",
  },
] as const;

const momentsOfPresence = [
  {
    title: "Breath of Wind",
    subtitle: "wind and breath",
    href: "/live",
    image: "/homepage-hero/windkeep-lantern-sea.png",
  },
  {
    title: "Five Elements Flow",
    subtitle: "light movement",
    href: "/healing/elements",
    image: "/objects-living/crystal-window-plant.jpg",
  },
  {
    title: "Tea in Silence",
    subtitle: "quiet tea",
    href: "/healing/meditation",
    image: "/objects-living/incense-box.jpg",
  },
  {
    title: "Mountain Story",
    subtitle: "far water",
    href: "/healing/stories",
    image: "/home-hero/desktop-03.png",
  },
  {
    title: "Write Freely",
    subtitle: "soft paper",
    href: "/healing/creation",
    image: "/objects-living/tea-gift-box.jpg",
  },
  {
    title: "Night Whisper",
    subtitle: "low light",
    href: "/live",
    image: "/home-hero/desktop-02.png",
  },
] as const;

function SoftMark({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-6 w-6 items-center justify-center rounded-full border border-[#b7c9d2]/50 bg-white/48 text-[0.43rem] uppercase tracking-[0.04em] text-foreground/52 shadow-[0_3px_8px_rgba(38,61,78,0.026)] sm:h-9 sm:w-9 sm:text-[0.56rem]"
    >
      {name}
    </span>
  );
}

function ArrowLink() {
  return (
    <span
      aria-hidden
      className="mt-auto flex h-5 w-5 items-center justify-center rounded-full border border-foreground/10 bg-white/42 text-[0.52rem] text-foreground/48 sm:h-7 sm:w-7"
    >
      -&gt;
    </span>
  );
}

export function HomepageBrowserRoom() {
  const { structuralSilence, worldAiNativeInfrastructure } = useWorldRuntime();
  const driftbox = resolveDriftboxRuntimeForDayKey(structuralSilence.dayKey);
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;
  const roomThin = st.combinedProseBias > 0.66 || st.dailyForceCloseEchoes;
  const windkeepObjects = homepageObjectSlots.secondaryShelf.slice(0, 3);
  const presenceRooms = roomThin ? homepageSeasonalRooms.slice(0, 4) : homepageSeasonalRooms;

  return (
    <main className="min-h-full bg-[#f6fafb] text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f5fbfd_0%,#ffffff_38%,#f4faf9_100%)]" />
        <HomepageHeroCarousel />

        <div className="relative z-[1] mx-auto w-full max-w-[92rem] px-4 pb-16 sm:px-7 lg:px-10">
          <section className="-mt-5 mx-auto max-w-[86rem] rounded-[1.35rem_1.35rem_0_0] sunlit-air-zone px-4 pb-8 pt-8 shadow-[0_-10px_38px_rgba(38,61,78,0.04)] sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <h2 className="font-[var(--font-display-serif)] text-2xl leading-tight text-foreground sm:text-3xl">
                Ways to Begin
              </h2>
              <span className="text-lg text-foreground/46" aria-hidden>
                /
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {waysToBegin.map((entry) => (
                <Link
                  key={entry.title}
                  href={entry.href}
                  className="quiet-air-touch relative block aspect-[390/700] min-h-0 overflow-hidden rounded-[1.15rem] bg-transparent p-0"
                >
                  <Image src={entry.image} alt="" fill className="object-cover opacity-[0.99]" sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 22vw" />
                  <span className="sr-only">{entry.title}</span>
                  <span className="sr-only">{entry.body}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] rounded-b-[1rem] bg-white/72 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <h2 className="font-[var(--font-display-serif)] text-2xl leading-tight text-foreground sm:text-3xl">
                Paths of Life
              </h2>
              <p className="mt-2 text-sm text-text-secondary">Explore healing spaces for every chapter.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {pathsOfLife.map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="quiet-air-touch clear-air-card flex min-h-[10.5rem] flex-col items-center rounded-lg border px-3 py-5 text-center"
                >
                  <SoftMark name={path.mark} />
                  <h3 className="mt-4 font-[var(--font-display-serif)] text-lg font-semibold leading-tight text-foreground">
                    {path.title}
                  </h3>
                  <p className="grounded-card-copy mt-2 text-xs leading-5">{path.body}</p>
                  <ArrowLink />
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto grid max-w-[86rem] grid-cols-2 gap-3 py-7 sm:gap-4 lg:grid-cols-6 lg:py-8">
            {mainEntries.map((entry, index) => (
              <Link
                key={entry.title}
                href={entry.href}
                className={`quiet-air-touch browser-air-presence clear-air-card grid min-h-0 overflow-hidden rounded-lg border p-0 lg:min-h-[18rem] ${
                  index === 0 || index === 2 ? "lg:-translate-y-2" : index === 4 ? "lg:translate-y-3" : ""
                }`}
              >
                <div className="grounded-card-image relative aspect-[1.2/1] overflow-hidden lg:aspect-[1.04/1]">
                  <Image src={entry.image} alt="" fill className="object-cover opacity-[0.94]" sizes="(max-width: 768px) 46vw, 16vw" />
                </div>
                <div className="relative z-[1] flex min-h-[7.4rem] flex-col p-3.5 sm:p-4 lg:min-h-[10rem] lg:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <SoftMark name={entry.mark} />
                    <ArrowLink />
                  </div>
                  <h2 className="mt-3 font-[var(--font-display-serif)] text-xl font-semibold leading-tight text-foreground lg:mt-5 lg:text-2xl">
                    {entry.title}
                  </h2>
                  <p className="grounded-card-copy mt-2 line-clamp-2 text-xs leading-5 lg:mt-3 lg:text-sm lg:leading-6">{entry.body}</p>
                </div>
              </Link>
            ))}
          </section>

          <section className="mx-auto max-w-[86rem] overflow-hidden rounded-lg border border-[#c7d7df]/46 bg-white/76 shadow-[0_18px_46px_rgba(38,61,78,0.055)]">
            <div className="grid gap-px bg-[#d8e5ea]/44 lg:grid-cols-[0.7fr_1fr_1fr]">
              <div className="bg-white/86 p-6 sm:p-8">
                <p className="font-[var(--font-display-serif)] text-2xl uppercase tracking-[0.04em] text-foreground">
                  Windkeep
                </p>
                <h2 className="mt-3 text-xl leading-8 text-foreground">Objects continue through time.</h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
                  Each object keeps its own journey, meeting the right person in quiet time.
                </p>
                <p className="mt-3 max-w-sm text-xs leading-6 text-text-muted">
                  {driftbox.lowEvent.oceanicLine}
                </p>
                <Link
                  href="/windkeep"
                  className="mt-6 inline-flex items-center gap-3 rounded-[0.28rem] border border-foreground/18 bg-white/74 px-4 py-2 text-xs tracking-[0.08em] text-foreground/82"
                >
                  Enter Windkeep <span aria-hidden>-&gt;</span>
                </Link>
              </div>
              <Link href="/windkeep#objects" className="quiet-air-touch relative min-h-[15rem] overflow-hidden bg-white/72 p-6 sm:p-8">
                <Image src="/homepage-hero/windkeep-lantern-sea.png" alt="" fill className="object-cover opacity-[0.68]" sizes="(max-width: 1024px) 92vw, 32vw" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.48),rgba(255,255,255,0.04))]" />
                <div className="relative z-[1] max-w-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Passing Things</p>
                  <h3 className="mt-3 text-xl leading-tight text-foreground">Objects meeting time</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    Objects in passage, meeting the right person at the right time.
                  </p>
                  <ArrowLink />
                </div>
              </Link>
              <Link href="/quiet-receiving" className="quiet-air-touch relative min-h-[15rem] overflow-hidden bg-white/72 p-6 sm:p-8">
                <Image src={commerceObjects[1]?.media.placement ?? windResiduePlacement.image} alt="" fill className="object-cover opacity-[0.66]" sizes="(max-width: 1024px) 92vw, 32vw" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.5),rgba(255,255,255,0.04))]" />
                <div className="relative z-[1] max-w-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet Receiving</p>
                  <h3 className="mt-3 text-xl leading-tight text-foreground">A quiet yes</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    Objects waiting quietly to be received by the next keeper.
                  </p>
                  <ArrowLink />
                </div>
              </Link>
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/60 py-9">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="font-[var(--font-display-serif)] text-2xl leading-tight text-foreground sm:text-3xl">
                Moments of Presence
              </h2>
              <Link href="/live" className="text-sm text-foreground/62 hover:text-foreground">
                View all -&gt;
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {momentsOfPresence.map((moment) => (
                <Link key={moment.title} href={moment.href} className="quiet-air-touch min-w-[12.5rem]">
                  <div className="browser-air-presence relative aspect-[1.82/1] overflow-hidden rounded-lg border border-[#c7d7df]/50 bg-white/78">
                    <Image src={moment.image} alt="" fill className="object-cover opacity-[0.92]" sizes="13rem" />
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/54 text-[0.56rem] uppercase tracking-[0.08em] text-foreground/70 shadow-[0_8px_20px_rgba(29,42,56,0.14)]">
                      play
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground">{moment.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{moment.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/60 py-9">
            <div className="mb-7 grid gap-5 rounded-lg border border-[#c7d7df]/42 bg-white/70 p-5 shadow-[0_12px_34px_rgba(38,61,78,0.045)] sm:grid-cols-[0.34fr_0.66fr] sm:p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Human presence</p>
                <h2 className="mt-2 font-[var(--font-display-serif)] text-2xl leading-tight text-foreground">
                  {lilaHumanPresence.name}
                </h2>
                <p className="mt-1 text-sm text-text-muted">{lilaHumanPresence.role}</p>
              </div>
              <div>
                <p className="text-sm leading-8 text-text-secondary">{lilaHumanPresence.homepageNote}</p>
                <Link href="/about" className="mt-4 inline-flex text-sm text-foreground/68 hover:text-foreground">
                  Read about the keeper
                </Link>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {windkeepObjects.map((item) => (
                <Link key={item.id} href={`/objects#${item.id}`} className="quiet-air-touch flex gap-4 rounded-lg bg-white/62 p-3">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-white/80">
                    <Image src={item.photo.src} alt="" fill className="object-cover opacity-[0.9]" sizes="5rem" />
                  </div>
                  <div>
                    <p className="text-sm leading-5 text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-text-muted">{item.roomPlacement}</p>
                  </div>
                </Link>
              ))}
              {presenceRooms.slice(0, 2).map((room) => (
                <div key={room.label} className="rounded-lg bg-white/58 p-4">
                  <p className="text-sm text-foreground">{room.label}</p>
                  <p className="mt-1 text-xs text-text-muted">{room.note}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mx-auto grid max-w-[86rem] gap-8 border-t border-border-subtle/70 py-8 text-sm text-text-secondary lg:grid-cols-[1fr_1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-8 w-14 shrink-0 bg-[url('/brand/production/air-mark.svg')] bg-contain bg-center bg-no-repeat opacity-80"
                />
                <p className="font-[var(--font-display-serif)] text-xl text-foreground">{siteConfig.brandEnName}</p>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-7 text-text-secondary">
                A quiet space in the browser, for healing, presence, and return.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {["Healing", "Windkeep", "Driftbox", "Live", "Objects", "Journal", "About"].map((item) => {
                const href =
                  item === "Healing"
                    ? "/healing"
                    : item === "Windkeep"
                      ? "/windkeep"
                      : item === "Driftbox"
                        ? "/inquiry"
                        : item === "Live"
                          ? "/live"
                          : item === "Objects"
                            ? "/objects"
                            : item === "About"
                              ? "/about"
                              : "/healing/stories";

                return (
                  <Link key={item} href={href} className="text-foreground/62 hover:text-foreground">
                    {item}
                  </Link>
                );
              })}
            </div>
            <div>
              <QuietSubscription />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
