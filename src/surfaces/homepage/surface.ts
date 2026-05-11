import { surfaceTonePlaceholders } from "@/design-system/surface-tone";
import { surfaceSpacing } from "@/design-system/surface-spacing";

export interface HomepageSurfaceSection {
  id: string;
  role:
    | "calm-entry"
    | "calm-opening-settle"
    | "flow-discovery"
    | "surface-layout"
    | "home-harmony"
    | "daily-rhythm"
    | "soft-onboarding"
    | "gentle-continuation";
  viewportHeight: "100svh" | "86svh" | "auto";
  sectionSilenceRatio: number;
  revealOrder: number;
  ctaPressure: "none" | "low";
  sectionShift: string;
}

export const homepageExperienceSurface: HomepageSurfaceSection[] = [
  {
    id: "entry",
    role: "calm-entry",
    viewportHeight: "100svh",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.high,
    revealOrder: 1,
    ctaPressure: "none",
    sectionShift: "from external hurry to calm arrival",
  },
  {
    id: "calm-opening",
    role: "calm-opening-settle",
    viewportHeight: "86svh",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.medium,
    revealOrder: 2,
    ctaPressure: "low",
    sectionShift: "from arrival to gentle orientation",
  },
  {
    id: "rituals",
    role: "flow-discovery",
    viewportHeight: "auto",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.medium,
    revealOrder: 3,
    ctaPressure: "low",
    sectionShift: "from curiosity to flow continuity",
  },
  {
    id: "atmosphere",
    role: "surface-layout",
    viewportHeight: "auto",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.high,
    revealOrder: 4,
    ctaPressure: "none",
    sectionShift: "from features to plain layout context",
  },
  {
    id: "home",
    role: "home-harmony",
    viewportHeight: "86svh",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.high,
    revealOrder: 5,
    ctaPressure: "none",
    sectionShift: "from visual clutter to spatial calm",
  },
  {
    id: "rhythm",
    role: "daily-rhythm",
    viewportHeight: "auto",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.medium,
    revealOrder: 6,
    ctaPressure: "low",
    sectionShift: "from concept to daily gentle rhythm",
  },
  {
    id: "onboarding",
    role: "soft-onboarding",
    viewportHeight: "auto",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.medium,
    revealOrder: 7,
    ctaPressure: "low",
    sectionShift: "from exploration to quiet environmental adaptation",
  },
  {
    id: "continuation",
    role: "gentle-continuation",
    viewportHeight: "auto",
    sectionSilenceRatio: surfaceSpacing.sectionSilenceRatio.high,
    revealOrder: 8,
    ctaPressure: "none",
    sectionShift: "from completion to optional continuation",
  },
];

export const homepageSurfaceToneBlocks = surfaceTonePlaceholders;
