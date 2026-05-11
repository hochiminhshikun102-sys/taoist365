export interface ExperienceRoute {
  path: string;
  title: string;
  navLabel: string;
  purpose: string;
  brandLayer: "product" | "brand-expression" | "cultural-signature";
}

export const experienceRoutes: ExperienceRoute[] = [
  {
    path: "/rituals/homepage",
    title: "Homepage layout",
    navLabel: "Scroll sketch",
    purpose: "Earlier layout sketch—same site, alternate scroll.",
    brandLayer: "brand-expression",
  },
  {
    path: "/rituals/draw-a-lot",
    title: "Draw a lot",
    navLabel: "Draw",
    purpose: "Slow lines, optional pause—same page style as the rest.",
    brandLayer: "brand-expression",
  },
  {
    path: "/rituals/daily-guidance",
    title: "Daily guidance",
    navLabel: "Daily note",
    purpose: "One plain nudge for the day if you want it.",
    brandLayer: "brand-expression",
  },
  {
    path: "/rituals/home-harmony",
    title: "Home harmony",
    navLabel: "Room notes",
    purpose: "Room notes without rearranging.",
    brandLayer: "brand-expression",
  },
];

export const namingSystem = {
  productName: "Taoist365",
  brandEnName: "Reverent Inquiry",
  brandCnName: "\u8c12\u95ee",
  domain: "taoist365.com",
  rules: {
    productUse: "site navigation, routes, product labels, metadata siteName",
    brandEnUse: "atmosphere and brand-expression language",
    brandCnUse: "cultural signature and root context",
  },
} as const;
