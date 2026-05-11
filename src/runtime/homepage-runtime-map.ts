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
    note: "Objects resting on the page.",
    className: "sm:translate-y-3 lg:translate-y-5",
  },
  {
    label: "Daily note",
    href: "/rituals/daily-guidance",
    note: "One line for the day.",
    className: "sm:-translate-y-1 lg:translate-y-0",
  },
  {
    label: "Home note",
    href: "/rituals/home-harmony",
    note: "A page for the room.",
    className: "sm:translate-y-5 lg:translate-y-8",
  },
  {
    label: "Mail",
    href: "/inquiry",
    note: "Only when something should be sent.",
    className: "sm:translate-y-1 lg:translate-y-3",
  },
] as const;
