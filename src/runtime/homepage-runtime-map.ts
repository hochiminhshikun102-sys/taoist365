/**
 * Homepage browser-room surface mapping — layout-facing labels and hero asset paths.
 * Not business logic.
 */

export const homepageHeroAirCycleSeconds = 96;

export const homepageHeroFrames = [
  {
    id: "sandong-writing-residue",
    src: "/homepage-hero/sandong-writing-sea-focus.png",
    alt: "Ink and paper by the sea — hands and vessels partly off-frame, wind-lit residue.",
    imageClassName: "object-cover object-[60%_center] opacity-[0.92]",
  },
  {
    id: "windkeep-lantern-passage",
    src: "/homepage-hero/windkeep-lantern-sea.png",
    alt: "Lantern and vessels near open water — object passage in pale air.",
    imageClassName: "object-cover object-[58%_center] opacity-[0.9]",
  },
] as const;

export const homepagePrimaryEntries = [
  {
    label: "Windkeep",
    href: "/objects",
    note: "Time objects resting in the browser room.",
    className: "sm:translate-y-3 lg:translate-y-5",
  },
  {
    label: "The Daily Verse",
    href: "/rituals/daily-guidance",
    note: "One weather-like line for the day.",
    className: "sm:-translate-y-1 lg:translate-y-0",
  },
  {
    label: "Cloud Meditation Altar",
    href: "/rituals/home-harmony",
    note: "A quiet surface for light, room, and breath.",
    className: "sm:translate-y-5 lg:translate-y-8",
  },
  {
    label: "Quiet Moments Subscription",
    href: "/inquiry",
    note: "Mail only when the thread should continue.",
    className: "sm:translate-y-1 lg:translate-y-3",
  },
] as const;
