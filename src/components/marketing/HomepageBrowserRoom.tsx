"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroCarousel } from "@/components/marketing/HomepageHeroCarousel";
import { QuietSubscription } from "@/components/marketing/QuietSubscription";
import { LivingAtmosphereVeil } from "@/components/ritual/LivingAtmosphereVeil";
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
    image: "/objects-living/crystal-window-plant.jpg",
    mark: "sun",
  },
  {
    title: "Feng Shui Space",
    body: "Bring balance into your room.",
    href: "/rituals/home-harmony",
    image: "/homepage-hero/windkeep-lantern-sea.png",
    mark: "wind",
  },
  {
    title: "Fortune Draw",
    body: "Listen to a message meant for you.",
    href: "/rituals/draw-a-lot",
    image: "/objects-living/incense-box.jpg",
    mark: "lotus",
  },
  {
    title: "Driftbox",
    body: "Send a question into the wind.",
    href: "/inquiry",
    image: "/objects-living/tea-gift-box.jpg",
    mark: "mail",
  },
] as const;

const pathsOfLife = [
  { title: "Relationships", body: "Connection and healing", href: "/healing/stories", mark: "people" },
  { title: "Home", body: "Creating a harmonious space", href: "/healing/elements", mark: "home" },
  { title: "Timing", body: "Flowing with the right moment", href: "/healing/philosophy", mark: "time" },
  { title: "Energy", body: "Nourish your inner vitality", href: "/healing/meditation", mark: "leaf" },
  { title: "Direction", body: "Finding your true north", href: "/healing/creation", mark: "compass" },
  { title: "Choices", body: "Make decisions with clarity", href: "/healing/playground", mark: "branch" },
  { title: "Return", body: "Coming home to yourself", href: "/healing/subscriptions", mark: "circle" },
] as const;

const mainEntries = [
  {
    title: "Healing",
    body: "45 quiet rooms for body, mind and spirit.",
    href: "/healing",
    image: "/objects-living/crystal-window-plant.jpg",
    mark: "leaf",
  },
  {
    title: "Windkeep",
    body: "A world of objects in passage.",
    href: "/windkeep",
    image: "/homepage-hero/windkeep-lantern-sea.png",
    mark: "wind",
  },
  {
    title: "Driftbox",
    body: "Quiet correspondence and reflection.",
    href: "/inquiry",
    image: "/objects-living/tea-gift-box.jpg",
    mark: "mail",
  },
  {
    title: "Live",
    body: "Ambient spaces for presence and companionship.",
    href: "/live",
    image: "/objects-living/incense-box.jpg",
    mark: "cloud",
  },
  {
    title: "Objects",
    body: "Thoughtful things for slow living.",
    href: "/objects",
    image: commerceObjects[0]?.media.placement ?? "/objects-living/incense-box.jpg",
    mark: "vase",
  },
  {
    title: "Journal",
    body: "Record, reflect and return to what matters.",
    href: "/healing/stories",
    image: "/objects-living/tea-gift-box.jpg",
    mark: "pen",
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
  const marks: Record<string, string> = {
    sun: "☼",
    wind: "≋",
    lotus: "♧",
    mail: "✉",
    people: "♙",
    home: "⌂",
    time: "◷",
    leaf: "♧",
    compass: "◌",
    branch: "⌯",
    circle: "○",
    cloud: "☁",
    vase: "♢",
    pen: "✎",
  };

  return (
    <span
      aria-hidden
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/70 text-xl leading-none text-foreground/72 shadow-[0_10px_30px_rgba(29,42,56,0.05)]"
    >
      {marks[name] ?? "○"}
    </span>
  );
}

function ArrowLink() {
  return (
    <span
      aria-hidden
      className="mt-auto flex h-8 w-8 items-center justify-center rounded-full border border-foreground/12 bg-white/68 text-sm text-foreground/72"
    >
      →
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
    <main className="min-h-full bg-[#f4f7f8] text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(239,246,250,0.98)_0%,rgba(250,250,247,0.94)_42%,rgba(244,247,247,0.96)_100%)]" />
        <LivingAtmosphereVeil tone="default" />
        <HomepageHeroCarousel />

        <div className="relative z-[1] mx-auto w-full max-w-[92rem] px-4 pb-16 sm:px-7 lg:px-10">
          <section className="-mt-5 mx-auto max-w-[86rem] rounded-[1.35rem_1.35rem_0_0] bg-[#fbfbf8]/88 px-4 pb-8 pt-8 shadow-[0_-16px_45px_rgba(29,42,56,0.035)] backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <h2 className="font-[var(--font-display-serif)] text-2xl leading-tight text-foreground sm:text-3xl">
                Ways to Begin
              </h2>
              <span className="text-lg text-foreground/46" aria-hidden>
                ♧
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {waysToBegin.map((entry) => (
                <Link
                  key={entry.title}
                  href={entry.href}
                  className="quiet-air-touch browser-air-presence relative flex min-h-[13.8rem] overflow-hidden rounded-lg border border-white/70 bg-white/56 p-5 shadow-[0_12px_32px_rgba(29,42,56,0.035)]"
                >
                  <Image src={entry.image} alt="" fill className="object-cover opacity-[0.45]" sizes="(max-width: 768px) 45vw, 22vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.72),rgba(255,255,255,0.2))]" />
                  <div className="relative z-[1] flex min-h-full max-w-[12rem] flex-col">
                    <SoftMark name={entry.mark} />
                    <h3 className="mt-5 font-[var(--font-display-serif)] text-xl leading-tight text-foreground">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">{entry.body}</p>
                    <ArrowLink />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] rounded-b-[1rem] bg-white/50 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
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
                  className="quiet-air-touch flex min-h-[10.5rem] flex-col items-center rounded-lg border border-white/70 bg-white/48 px-3 py-5 text-center shadow-[0_10px_26px_rgba(29,42,56,0.025)]"
                >
                  <SoftMark name={path.mark} />
                  <h3 className="mt-4 font-[var(--font-display-serif)] text-lg leading-tight text-foreground">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-text-secondary">{path.body}</p>
                  <ArrowLink />
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto grid max-w-[86rem] gap-4 py-8 sm:grid-cols-2 lg:grid-cols-6">
            {mainEntries.map((entry, index) => (
              <Link
                key={entry.title}
                href={entry.href}
                className={`quiet-air-touch browser-air-presence relative min-h-[17.5rem] overflow-hidden rounded-lg border border-white/72 bg-white/54 p-5 shadow-[0_14px_36px_rgba(29,42,56,0.035)] ${
                  index === 0 || index === 2 ? "lg:-translate-y-2" : index === 4 ? "lg:translate-y-3" : ""
                }`}
              >
                <Image src={entry.image} alt="" fill className="object-cover opacity-[0.52]" sizes="(max-width: 768px) 92vw, 16vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.26))]" />
                <div className="relative z-[1] flex h-full flex-col">
                  <SoftMark name={entry.mark} />
                  <h2 className="mt-auto font-[var(--font-display-serif)] text-2xl leading-tight text-foreground">
                    {entry.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{entry.body}</p>
                  <ArrowLink />
                </div>
              </Link>
            ))}
          </section>

          <section className="mx-auto max-w-[86rem] overflow-hidden rounded-lg border border-white/70 bg-white/58 shadow-[0_14px_38px_rgba(29,42,56,0.03)]">
            <div className="grid gap-px bg-border-subtle/36 lg:grid-cols-[0.7fr_1fr_1fr]">
              <div className="bg-[#fbfaf6]/84 p-6 sm:p-8">
                <p className="font-[var(--font-display-serif)] text-2xl uppercase tracking-[0.04em] text-foreground">
                  Windkeep
                </p>
                <h2 className="mt-3 text-xl leading-8 text-foreground">风栈 · 物件持续文明世界</h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
                  Each object keeps its own journey, meeting the right person in quiet time.
                </p>
                <p className="mt-3 max-w-sm text-xs leading-6 text-text-muted">
                  {driftbox.lowEvent.oceanicLine}
                </p>
                <Link
                  href="/windkeep"
                  className="mt-6 inline-flex items-center gap-3 rounded-[0.28rem] border border-foreground/18 bg-white/42 px-4 py-2 text-xs tracking-[0.08em] text-foreground/82"
                >
                  Enter Windkeep <span aria-hidden>→</span>
                </Link>
              </div>
              <Link href="/windkeep#objects" className="quiet-air-touch relative min-h-[15rem] overflow-hidden bg-white/64 p-6 sm:p-8">
                <Image src="/homepage-hero/windkeep-lantern-sea.png" alt="" fill className="object-cover opacity-[0.48]" sizes="(max-width: 1024px) 92vw, 32vw" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.78),rgba(255,255,255,0.22))]" />
                <div className="relative z-[1] max-w-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Passing Things</p>
                  <h3 className="mt-3 text-xl leading-tight text-foreground">物与时遇</h3>
                  <p className="mt-4 text-sm leading-7 text-text-secondary">
                    Objects in passage, meeting the right person at the right time.
                  </p>
                  <ArrowLink />
                </div>
              </Link>
              <Link href="/quiet-receiving" className="quiet-air-touch relative min-h-[15rem] overflow-hidden bg-white/64 p-6 sm:p-8">
                <Image src={commerceObjects[1]?.media.placement ?? windResiduePlacement.image} alt="" fill className="object-cover opacity-[0.42]" sizes="(max-width: 1024px) 92vw, 32vw" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.78),rgba(255,255,255,0.2))]" />
                <div className="relative z-[1] max-w-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Quiet Receiving</p>
                  <h3 className="mt-3 text-xl leading-tight text-foreground">笑纳</h3>
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
                View all →
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {momentsOfPresence.map((moment) => (
                <Link key={moment.title} href={moment.href} className="quiet-air-touch min-w-[12.5rem]">
                  <div className="browser-air-presence relative aspect-[1.82/1] overflow-hidden rounded-lg border border-white/70 bg-white/60">
                    <Image src={moment.image} alt="" fill className="object-cover opacity-[0.86]" sizes="13rem" />
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/42 text-xs text-white shadow-[0_8px_20px_rgba(29,42,56,0.14)]">
                      ▶
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground">{moment.title}</p>
                  <p className="mt-1 text-xs text-text-muted">{moment.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/60 py-9">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {windkeepObjects.map((item) => (
                <Link key={item.id} href={`/objects#${item.id}`} className="quiet-air-touch flex gap-4 rounded-lg bg-white/38 p-3">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-white/60">
                    <Image src={item.photo.src} alt="" fill className="object-cover opacity-[0.78]" sizes="5rem" />
                  </div>
                  <div>
                    <p className="text-sm leading-5 text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-text-muted">{item.roomPlacement}</p>
                  </div>
                </Link>
              ))}
              {presenceRooms.slice(0, 2).map((room) => (
                <div key={room.label} className="rounded-lg bg-white/32 p-4">
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
                A quiet space in the browser, for healing, presence and return.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {["Healing", "Windkeep", "Driftbox", "Live", "Objects", "Journal"].map((item) => {
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
