"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroCarousel } from "@/components/marketing/HomepageHeroCarousel";
import { QuietSubscription } from "@/components/marketing/QuietSubscription";
import { lilaHumanPresence } from "@/config/lila-human-presence";
import {
  homepageObjectSlots,
  homepageSeasonalRooms,
} from "@/config/quiet-placement";
import { siteConfig } from "@/config/site";
import { useWorldRuntime } from "@/lib/use-world-runtime";

const waysToBegin = [
  {
    title: "Daily Guidance",
    body: "A gentle note to start your day.",
    href: "/rituals/daily-guidance",
    image: "/brand/production/homepage/ways-to-begin/daily-guidance-tao-doll.png",
    width: 390,
    height: 700,
    mark: "sun",
  },
  {
    title: "Feng Shui Space",
    body: "Let a room feel easier to stay in.",
    href: "/rituals/home-harmony",
    image: "/brand/production/homepage/ways-to-begin/feng-shui-wind-chime.png",
    width: 410,
    height: 700,
    mark: "air",
  },
  {
    title: "Fortune Draw",
    body: "Listen to a small message without pressure.",
    href: "/rituals/draw-a-lot",
    image: "/brand/production/homepage/ways-to-begin/fortune-draw-lotus-incense.png",
    width: 410,
    height: 700,
    mark: "lot",
  },
  {
    title: "Driftbox",
    body: "Send a question into quiet correspondence.",
    href: "/inquiry",
    image: "/brand/production/homepage/ways-to-begin/driftbox-letter-leaf.png",
    width: 430,
    height: 700,
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
    pcImage: "/brand/production/homepage/moments-of-presence/final-v1/pc/card-01-shine-your-way.jpg",
    mobileImage: "/brand/production/homepage/moments-of-presence/final-v1/mobile/mobile-card-01.jpg",
  },
  {
    title: "Five Elements Flow",
    subtitle: "light movement",
    href: "/healing/elements",
    pcImage: "/brand/production/homepage/moments-of-presence/final-v1/pc/card-02-small-joys.jpg",
    mobileImage: "/brand/production/homepage/moments-of-presence/final-v1/mobile/mobile-card-02.jpg",
  },
  {
    title: "Tea in Silence",
    subtitle: "quiet tea",
    href: "/healing/meditation",
    pcImage: "/brand/production/homepage/moments-of-presence/final-v1/pc/card-03-keep-growing.jpg",
    mobileImage: "/brand/production/homepage/moments-of-presence/final-v1/mobile/mobile-card-03.jpg",
  },
  {
    title: "Mountain Story",
    subtitle: "far water",
    href: "/healing/stories",
    pcImage: "/brand/production/homepage/moments-of-presence/final-v1/pc/card-04-dream-big.jpg",
    mobileImage: "/brand/production/homepage/moments-of-presence/final-v1/mobile/mobile-card-04.jpg",
  },
  {
    title: "Write Freely",
    subtitle: "soft paper",
    href: "/healing/creation",
    pcImage: "/brand/production/homepage/moments-of-presence/final-v1/pc/card-05-good-food-good-life.jpg",
    mobileImage: "/brand/production/homepage/moments-of-presence/final-v1/mobile/mobile-card-05.jpg",
  },
  {
    title: "Night Whisper",
    subtitle: "soft light",
    href: "/live",
    pcImage: "/brand/production/homepage/moments-of-presence/final-v1/pc/card-06-better-together.jpg",
    mobileImage: "/brand/production/homepage/moments-of-presence/final-v1/mobile/mobile-card-06.jpg",
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
  const { worldAiNativeInfrastructure } = useWorldRuntime();
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
                  className="quiet-air-touch block overflow-hidden rounded-[1.15rem]"
                >
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    width={entry.width}
                    height={entry.height}
                    className="h-auto w-full"
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 45vw, 22vw"
                  />
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

          <section className="mx-auto max-w-[86rem] py-7 lg:py-8">
            <div className="relative hidden overflow-hidden rounded-lg lg:block">
              <Image
                src="/brand/production/homepage/healing-world-layer/fixed-v3/pc/healing-world-layer-pc-final.jpg"
                alt="Healing, Windkeep, Driftbox, Live, Objects, and Journal"
                width={1686}
                height={933}
                className="h-auto w-full"
                sizes="86rem"
              />
              {mainEntries.map((entry, index) => (
                <Link
                  key={entry.title}
                  href={entry.href}
                  aria-label={entry.title}
                  className="absolute top-0 h-full"
                  style={{ left: `${(index / mainEntries.length) * 100}%`, width: `${100 / mainEntries.length}%` }}
                />
              ))}
            </div>
            <div className="relative overflow-hidden rounded-lg lg:hidden">
              <Image
                src="/brand/production/homepage/healing-world-layer/fixed-v3/mobile/healing-world-layer-mobile-grid.jpg"
                alt="Healing, Windkeep, Driftbox, Live, Objects, and Journal"
                width={750}
                height={1334}
                className="h-auto w-full"
                sizes="92vw"
              />
              {mainEntries.map((entry, index) => {
                const col = index % 2;
                const row = Math.floor(index / 2);

                return (
                  <Link
                    key={entry.title}
                    href={entry.href}
                    aria-label={entry.title}
                    className="absolute"
                    style={{ left: `${col * 50}%`, top: `${row * (100 / 3)}%`, width: "50%", height: `${100 / 3}%` }}
                  />
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-[86rem]">
            <div className="relative hidden overflow-hidden rounded-lg lg:block">
              <Image
                src="/brand/production/homepage/windkeep-section/fixed-v1/pc/windkeep-section-hero-pc.png"
                alt="Windkeep objects meeting time"
                width={1920}
                height={720}
                className="h-auto w-full"
                sizes="86rem"
              />
              <Link href="/windkeep" aria-label="Enter Windkeep" className="absolute inset-y-0 left-0 w-[64%]" />
              <Link href="/quiet-receiving" aria-label="Quiet Receiving" className="absolute inset-y-0 right-0 w-[36%]" />
            </div>
            <div className="relative overflow-hidden rounded-lg lg:hidden">
              <Image
                src="/brand/production/homepage/windkeep-section/fixed-v1/mobile/windkeep-section-mobile-card.png"
                alt="Windkeep objects meeting time"
                width={1170}
                height={1600}
                className="h-auto w-full"
                sizes="92vw"
              />
              <Link href="/windkeep" aria-label="Enter Windkeep" className="absolute inset-0" />
            </div>
          </section>

          <section className="mx-auto max-w-[86rem] border-t border-border-subtle/60 py-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#6f86a6]">Moments of Presence</p>
                <h2 className="mt-2 font-[var(--font-display-serif)] text-2xl leading-tight text-foreground sm:text-3xl">
                  Moments of Presence
                </h2>
                <p className="mt-2 text-sm text-[#6f86a6]">Real energy. Bright days. A world waiting.</p>
              </div>
              <Link href="/live" className="text-sm text-foreground/62 hover:text-foreground">
                View all -&gt;
              </Link>
            </div>
            <div className="hidden gap-6 overflow-x-auto pb-3 lg:flex">
              {momentsOfPresence.map((moment) => (
                <Link key={moment.title} href={moment.href} className="quiet-air-touch block w-[180px] shrink-0 overflow-hidden rounded-[16px]">
                  <Image
                    src={moment.pcImage}
                    alt={moment.title}
                    width={180}
                    height={375}
                    className="h-auto w-full"
                    sizes="180px"
                  />
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 lg:hidden">
              {momentsOfPresence.map((moment) => (
                <Link key={moment.title} href={moment.href} className="quiet-air-touch block overflow-hidden rounded-xl">
                  <Image
                    src={moment.mobileImage}
                    alt={moment.title}
                    width={440}
                    height={208}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 46vw, 220px"
                  />
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
