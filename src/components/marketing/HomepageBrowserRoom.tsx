"use client";

import Image from "next/image";
import Link from "next/link";
import { HomepageHeroCarousel } from "@/components/marketing/HomepageHeroCarousel";
import { QuietSubscription } from "@/components/marketing/QuietSubscription";
import { homepageObjectSlots } from "@/config/quiet-placement";

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

const energyFieldCards = [
  {
    title: "Morning Energy",
    href: "/healing/meditation",
    pcImage: "/brand/production/homepage/energy-field-section/pc/morning-card.png",
    mobileImage: "/brand/production/homepage/energy-field-section/mobile/morning-card-mobile.png",
  },
  {
    title: "Kitchen Energy",
    href: "/healing/elements",
    pcImage: "/brand/production/homepage/energy-field-section/pc/kitchen-card.png",
    mobileImage: "/brand/production/homepage/energy-field-section/mobile/kitchen-card-mobile.png",
  },
  {
    title: "Studio Energy",
    href: "/healing/creation",
    pcImage: "/brand/production/homepage/energy-field-section/pc/studio-card.png",
    mobileImage: "/brand/production/homepage/energy-field-section/mobile/studio-card-mobile.png",
  },
  {
    title: "Evening Energy",
    href: "/live",
    pcImage: "/brand/production/homepage/energy-field-section/pc/evening-card.png",
    mobileImage: "/brand/production/homepage/energy-field-section/mobile/evening-card-mobile.png",
  },
  {
    title: "Retreat Energy",
    href: "/healing/stories",
    pcImage: "/brand/production/homepage/energy-field-section/pc/retreat-card.png",
    mobileImage: "/brand/production/homepage/energy-field-section/mobile/retreat-card-mobile.png",
  },
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

const lifeStageCards = [
  {
    title: "Morning Ease",
    body: "Begin the day with a softer rhythm.",
    image: "/brand/production/homepage/energy-field-section/pc/morning-card.png",
    href: "/healing/meditation",
  },
  {
    title: "Quiet Reset",
    body: "Return when the room feels too full.",
    image: "/brand/production/homepage/energy-field-section/pc/kitchen-card.png",
    href: "/healing/elements",
  },
  {
    title: "Inner Room",
    body: "Make space for attention to settle.",
    image: "/brand/production/homepage/energy-field-section/pc/studio-card.png",
    href: "/healing/creation",
  },
  {
    title: "Evening Repair",
    body: "Let the day close without pressure.",
    image: "/brand/production/homepage/energy-field-section/pc/evening-card.png",
    href: "/live",
  },
  {
    title: "Seasonal Return",
    body: "Move with the quiet weather of life.",
    image: "/brand/production/homepage/energy-field-section/pc/retreat-card.png",
    href: "/healing/stories",
  },
] as const;

const companionMoments = [
  {
    title: "Gentle Guidance",
    body: "Support for your everyday pause.",
    image: "/brand/production/homepage/ways-to-begin/daily-guidance-tao-doll.png",
    href: "/rituals/daily-guidance",
  },
  {
    title: "Moonlight Moment",
    body: "Small rituals for soft returns.",
    image: "/brand/production/homepage/ways-to-begin/fortune-draw-lotus-incense.png",
    href: "/rituals/draw-a-lot",
  },
  {
    title: "Elemental Ease",
    body: "Calm your room, soften your mind.",
    image: "/brand/production/homepage/ways-to-begin/feng-shui-wind-chime.png",
    href: "/rituals/home-harmony",
  },
  {
    title: "Quiet Letters",
    body: "A place for questions to move slowly.",
    image: "/brand/production/homepage/ways-to-begin/driftbox-letter-leaf.png",
    href: "/inquiry",
  },
] as const;

const veluneCards = [
  {
    title: "Flow Soft",
    image: "/velune-storefront/assets/card-expanded/products/vel-wd-001-flow-soft.jpg",
    href: "/store/products/vel-wd-001-flow-soft",
  },
  {
    title: "Night Ease",
    image: "/velune-storefront/assets/card-expanded/products/vel-wd-002-night-ease.jpg",
    href: "/store/products/vel-wd-002-night-ease",
  },
  {
    title: "Pure Breath",
    image: "/velune-storefront/assets/card-expanded/products/vel-mt-001-pure-breath.jpg",
    href: "/store/products/vel-mt-001-pure-breath",
  },
] as const;

export function HomepageBrowserRoom() {
  const objectShelf = homepageObjectSlots.shelf.slice(0, 6);

  return (
    <main className="ri-homepage homepage-wind-morning min-h-full bg-[#f6fafb] text-foreground">
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#f5fbfd_0%,#ffffff_38%,#f4faf9_100%)]" />
        <div className="ri-global-wind ri-global-wind-a" aria-hidden />
        <div className="ri-global-wind ri-global-wind-b" aria-hidden />
        <div className="ri-global-wind ri-global-wind-c" aria-hidden />
        <HomepageHeroCarousel />

        <div className="ri-home-stack relative z-[1] mx-auto w-full max-w-[92rem] px-4 pb-16 sm:px-7 lg:px-10">
          <section className="ri-home-section ri-section-ways -mt-5 mx-auto max-w-[86rem] rounded-[1.35rem_1.35rem_0_0] sunlit-air-zone px-4 pb-8 pt-8 shadow-[0_-10px_38px_rgba(38,61,78,0.04)] sm:px-6 lg:px-8">
            <span className="ri-section-breath ri-section-breath-left" aria-hidden />
            <span className="ri-section-breath ri-section-breath-right" aria-hidden />
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
                  className="quiet-air-touch block rounded-[1.15rem]"
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

          <section className="ri-home-section ri-section-explore mx-auto max-w-[86rem] py-7 lg:py-8">
            <span className="ri-section-breath ri-section-breath-left" aria-hidden />
            <div className="relative hidden rounded-lg lg:block">
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
            <div className="relative rounded-lg lg:hidden">
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

          <section className="ri-home-section ri-section-objects mx-auto max-w-[86rem] rounded-[1.25rem] px-4 py-7 sm:px-6 lg:px-8">
            <span className="ri-section-breath ri-section-breath-right" aria-hidden />
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#7d93a7]">Objects</p>
                <h2 className="mt-2 font-[var(--font-display-serif)] text-2xl leading-tight text-foreground sm:text-3xl">
                  Objects for daily quiet.
                </h2>
              </div>
              <Link href="/objects" className="text-sm text-foreground/62 hover:text-foreground">
                View objects -&gt;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {objectShelf.map((item) => (
                <Link key={item.id} href={`/objects/${item.id}`} className="quiet-air-touch ri-object-card rounded-[0.9rem] border border-[#d7dfe5]/70 bg-white/68 p-3">
                  <div className="flex aspect-[4/3] items-center justify-center rounded-[0.7rem] bg-[#f0f2f5]/78 p-2">
                    <Image src={item.photo.src} alt={item.title} width={320} height={240} className="h-full w-full object-contain" sizes="(max-width: 768px) 44vw, 14vw" />
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-5 text-foreground">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted">{item.roomTrace}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="ri-home-section ri-section-life-stages mx-auto max-w-[86rem] rounded-[1.35rem] px-4 py-8 sm:px-6 lg:px-8">
            <span className="ri-section-breath ri-section-breath-left" aria-hidden />
            <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#8a7c6e]">Life Stages, Gentle Paths</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl leading-tight text-foreground sm:text-4xl">
                  Soft support for every return.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-text-secondary">
                  Different days ask for different kinds of quiet. Move through the paths without pressure.
                </p>
                <Link href="/healing" className="mt-5 inline-flex rounded-full border border-[#cbd9df] bg-white/72 px-5 py-2 text-sm text-foreground/72 hover:text-foreground">
                  Explore paths
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {lifeStageCards.map((card) => (
                  <Link key={card.title} href={card.href} className="quiet-air-touch rounded-[0.9rem] border border-[#d7dfe5]/70 bg-white/66 p-2">
                    <Image src={card.image} alt={card.title} width={360} height={220} className="h-auto w-full rounded-[0.7rem]" sizes="(max-width: 768px) 44vw, 10vw" />
                    <p className="mt-3 text-sm leading-5 text-foreground">{card.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted">{card.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="ri-home-section ri-section-find-moment mx-auto max-w-[86rem] rounded-[1.35rem] px-4 py-8 sm:px-6 lg:px-8">
            <span className="ri-section-breath ri-section-breath-right" aria-hidden />
            <div className="grid gap-7 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#7d93a7]">Find Your Moment</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl leading-tight text-foreground sm:text-5xl">
                  Find your moment, we will walk with you.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-text-secondary">
                  Little rooms for attention, breath, and ordinary return. Choose a soft beginning and let it stay open.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {companionMoments.map((card) => (
                  <Link key={card.title} href={card.href} className="quiet-air-touch rounded-[1rem] border border-[#d7dfe5]/70 bg-white/64 p-3 text-center">
                    <Image src={card.image} alt={card.title} width={320} height={420} className="mx-auto h-auto max-h-[12rem] w-auto" sizes="(max-width: 768px) 40vw, 10vw" />
                    <p className="mt-3 text-sm text-foreground">{card.title}</p>
                    <p className="mt-1 text-xs leading-5 text-text-muted">{card.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="ri-home-section ri-section-velune mx-auto max-w-[86rem] rounded-[1.35rem] px-4 py-8 sm:px-6 lg:px-8">
            <span className="ri-section-breath ri-section-breath-left" aria-hidden />
            <div className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
              <Link href="/store" className="quiet-air-touch block rounded-[1.2rem]">
                <Image src="/velune-storefront/assets/banners/velune-home-banner.jpg" alt="Velune botanical daily tonics" width={1920} height={600} className="h-auto w-full rounded-[1.2rem]" sizes="(max-width: 1024px) 92vw, 50vw" />
              </Link>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#8a7c6e]">Velune</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl leading-tight text-foreground sm:text-4xl">
                  Plant air moving through light.
                </h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Botanical daily tonics for quiet routines, soft balance, and a calmer everyday rhythm.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {veluneCards.map((card) => (
                    <Link key={card.title} href={card.href} className="quiet-air-touch rounded-[0.85rem] bg-white/64 p-2">
                      <Image src={card.image} alt={card.title} width={360} height={360} className="h-auto w-full rounded-[0.7rem]" sizes="10vw" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="ri-home-section ri-section-windkeep mx-auto max-w-[86rem]">
            <span className="ri-section-breath ri-section-breath-right" aria-hidden />
            <div className="relative hidden rounded-lg lg:block">
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
            <div className="relative rounded-lg lg:hidden">
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

          <section className="ri-home-section ri-section-moments mx-auto max-w-[86rem] border-t border-border-subtle/60 py-8">
            <span className="ri-section-breath ri-section-breath-left" aria-hidden />
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
                <Link key={moment.title} href={moment.href} className="quiet-air-touch block w-[180px] shrink-0 rounded-[16px]">
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
                <Link key={moment.title} href={moment.href} className="quiet-air-touch block rounded-xl">
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

          <section className="ri-home-section ri-section-energy-lives mx-auto max-w-[86rem] rounded-[1.35rem] px-4 py-8 sm:px-6 lg:px-8">
            <span className="ri-section-breath ri-section-breath-left" aria-hidden />
            <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#8a7c6e]">The Energy Field</p>
                <h2 className="mt-3 font-[var(--font-display-serif)] text-3xl leading-tight text-foreground sm:text-4xl">
                  Energy lives where life happens.
                </h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Every object holds a frequency. Let the room breathe, and choose one quiet place to begin.
                </p>
                <Link href="/healing/elements" className="mt-5 inline-flex text-sm text-foreground/62 hover:text-foreground">
                  Explore energy layers -&gt;
                </Link>
              </div>
              <Link href="/healing/elements" className="quiet-air-touch block rounded-[1.2rem]">
                <Image src="/brand/production/homepage/energy-field-section/pc/hero-energy-field.png" alt="Energy lives where life happens" width={1600} height={700} className="h-auto w-full rounded-[1.2rem]" sizes="(max-width: 1024px) 92vw, 56vw" />
              </Link>
            </div>
          </section>

          <section
            className="ri-home-section ri-section-energy-field mx-auto max-w-[86rem] rounded-[1.35rem] bg-[#f0f2f5]/70 px-4 py-8 sm:px-6 lg:px-8"
            aria-label="Energy Flows"
          >
            <span className="ri-section-breath ri-section-breath-right" aria-hidden />
            <div className="mb-5 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a7c6e]">Energy Flows</p>
              <h2 className="mt-2 font-[var(--font-display-serif)] text-3xl leading-tight text-foreground sm:text-4xl">
                Energy flows. Life aligns.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary">
                Different places, different moments, one quiet alignment.
              </p>
            </div>
            <div className="hidden grid-cols-5 gap-4 lg:grid">
              {energyFieldCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="quiet-air-touch block rounded-[0.9rem]"
                  aria-label={card.title}
                >
                  <Image
                    src={card.pcImage}
                    alt={card.title}
                    width={640}
                    height={360}
                    className="h-auto w-full"
                    sizes="17vw"
                  />
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {energyFieldCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="quiet-air-touch block rounded-[0.8rem]"
                  aria-label={card.title}
                >
                  <Image
                    src={card.mobileImage}
                    alt={card.title}
                    width={440}
                    height={264}
                    className="h-auto w-full"
                    sizes="46vw"
                  />
                </Link>
              ))}
            </div>
          </section>

          <footer className="ri-home-section ri-section-footer mx-auto grid max-w-[86rem] gap-8 border-t border-border-subtle/70 py-8 text-sm text-text-secondary lg:grid-cols-[1fr_1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/brand/production/identity/reverent-inquiry-logo-gradient.png"
                  alt="Reverent Inquiry"
                  className="h-auto w-[11rem] object-contain mix-blend-multiply opacity-82"
                  loading="lazy"
                  decoding="async"
                />
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
