export type ScrollRhythmZoneType =
  | "slow-entry"
  | "pause-section"
  | "continuity-gap"
  | "layout-bridge";

export interface ScrollRhythmZone {
  id: string;
  type: ScrollRhythmZoneType;
  viewportShare: number;
  revealAfterViewportEnterMs: number;
  intent: string;
}

export const defaultScrollRhythmZones: ScrollRhythmZone[] = [
  {
    id: "entry-slow-01",
    type: "slow-entry",
    viewportShare: 0.95,
    revealAfterViewportEnterMs: 700,
    intent: "create calm arrival before interaction",
  },
  {
    id: "pause-01",
    type: "pause-section",
    viewportShare: 0.55,
    revealAfterViewportEnterMs: 900,
    intent: "short vertical pause between sections",
  },
  {
    id: "gap-01",
    type: "continuity-gap",
    viewportShare: 0.35,
    revealAfterViewportEnterMs: 0,
    intent: "spacing between stacked guidance blocks",
  },
  {
    id: "transition-01",
    type: "layout-bridge",
    viewportShare: 0.75,
    revealAfterViewportEnterMs: 500,
    intent: "ease layout tone between adjacent sections",
  },
];
