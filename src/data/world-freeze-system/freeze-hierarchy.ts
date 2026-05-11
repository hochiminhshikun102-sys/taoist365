/** Mature world: what tier each *channel* sits in — deterministic map fills tiers. */
export type ForegroundFreezeTier =
  | "permanentForeground"
  | "semiForeground"
  | "background"
  | "rareResurfacing"
  | "permanentAbsence";

/** Almost always visible (policy names — not UI component ids). */
export const PERMANENT_FOREGROUND_CHANNELS = [
  "roomWeather",
  "browserFamiliarity",
  "worldBreathing",
  "shareableResidue",
  "hostnameFamiliarity",
] as const;

export const SEMI_FOREGROUND_CHANNELS = ["dailyResidue", "objectCoordinate", "ritualTraces"] as const;

export const BACKGROUND_CHANNELS = ["humanInterruption", "mailSediment", "objectAging", "touchSediment"] as const;

export const RARE_RESURFACING_CHANNELS = [
  "antiMeta",
  "antiOverdesign",
  "antiPerformance",
  "runtimeAwareness",
] as const;

/** Never narrate the system — copy policy only */
export const PERMANENT_ABSENCE_TOPICS = [
  "systemExplainsItself",
  "runtimeTalk",
  "worldbuildingSelfNarration",
  "aiAwareProse",
] as const;
