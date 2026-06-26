export interface ExperienceRoute {
  path: string;
  title: string;
  navLabel: string;
  purpose: string;
  brandLayer: "primary-brand" | "browser-surface" | "archive-source";
}

export const experienceRoutes: ExperienceRoute[] = [
  {
    path: "/rituals/homepage",
    title: "Homepage layout",
    navLabel: "Scroll sketch",
    purpose: "Earlier layout sketch, same site, alternate scroll.",
    brandLayer: "browser-surface",
  },
  {
    path: "/rituals/draw-a-lot",
    title: "Draw a lot",
    navLabel: "Draw",
    purpose: "Slow lines, optional pause, same page style as the rest.",
    brandLayer: "browser-surface",
  },
  {
    path: "/rituals/daily-guidance",
    title: "Daily guidance",
    navLabel: "Daily note",
    purpose: "One plain nudge for the day if you want it.",
    brandLayer: "browser-surface",
  },
  {
    path: "/rituals/home-harmony",
    title: "Home harmony",
    navLabel: "Room notes",
    purpose: "Room notes without rearranging.",
    brandLayer: "browser-surface",
  },
];

export const namingSystem = {
  primaryBrandName: "Dohara",
  ecosystemAnchor: "taoist365.com",
  archiveSourceName: "Yewen / \u8c12\u95ee",
  rules: {
    primaryBrandUse: "front-facing site navigation, metadata siteName, and public identity",
    ecosystemAnchorUse: "domain, inbox, stable URL, and ecosystem anchor",
    archiveSourceUse: "historical source layer only; never production UI",
  },
} as const;
