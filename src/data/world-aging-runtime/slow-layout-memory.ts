import type { WorldAgeStateId } from "./world-age-state";

export type SlowLayoutMemory = {
  pinnedAsideOrder: "default" | "sediment-first" | "quiet-first";
  longStayedSection: "living-room" | "ritual-corner" | "mail-notes";
  sectionDriftNote: string;
};

export const slowLayoutMemoryByAge: Record<WorldAgeStateId, SlowLayoutMemory> = {
  "newly-settled": {
    pinnedAsideOrder: "default",
    longStayedSection: "living-room",
    sectionDriftNote: "Layout still breathes, but one living section is already stable.",
  },
  "quietly-lived-in": {
    pinnedAsideOrder: "quiet-first",
    longStayedSection: "living-room",
    sectionDriftNote: "A few asides have stayed in the same order for a while.",
  },
  "heavy-air-season": {
    pinnedAsideOrder: "quiet-first",
    longStayedSection: "ritual-corner",
    sectionDriftNote: "The ritual side has stayed still longer than usual.",
  },
  "slow-drift-month": {
    pinnedAsideOrder: "sediment-first",
    longStayedSection: "mail-notes",
    sectionDriftNote: "Some quiet fragments now sit first by default.",
  },
  "long-static-period": {
    pinnedAsideOrder: "sediment-first",
    longStayedSection: "mail-notes",
    sectionDriftNote: "Structure has held long enough to feel older than copy updates.",
  },
  "late-year-room": {
    pinnedAsideOrder: "sediment-first",
    longStayedSection: "living-room",
    sectionDriftNote: "The same sections keep opening in the same visual order.",
  },
  "old-browser-period": {
    pinnedAsideOrder: "sediment-first",
    longStayedSection: "living-room",
    sectionDriftNote: "Page order now behaves like long-held tab memory.",
  },
  "worn-in-cycle": {
    pinnedAsideOrder: "sediment-first",
    longStayedSection: "living-room",
    sectionDriftNote: "Layout inertia is visible: long-set order, little rearrangement.",
  },
};
