import { getLivingDayKey, dailyIndex } from "@/lib/living-day-key";
import { worldStateIdForDayKey, type WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";
import type { SessionWeatherId } from "@/data/guidance-operating-layer/session-weather";
import { pickAmbientHouseholdFlow } from "./ambient-household-flow";
import { pickDomesticTemporality } from "./domestic-temporality";
import { humanRhythmBoundaries } from "./human-rhythm-boundaries";
import { pickInvisibleCoLiving } from "./invisible-co-living";
import { pickInterruptedRhythm } from "./interrupted-rhythm";
import { pickLateNightContinuity } from "./late-night-continuity";
import { pickLightUsageCycle } from "./light-usage-cycles";
import { pickObjectRelocationMemory } from "./object-relocation-memory";
import { pickOrdinaryExhaustion } from "./ordinary-exhaustion-runtime";
import { pickObjectSurvivedRhythm } from "./object-survived-rhythm";
import { pickRoomSilenceDensity } from "./room-silence-density";
import { pickSleepResidue } from "./sleep-residue";
import { pickUnfinishedDomesticity } from "./unfinished-domesticity";

export { humanRhythmBoundaries } from "./human-rhythm-boundaries";
export { pickUnfinishedDomesticity } from "./unfinished-domesticity";
export { pickLateNightContinuity } from "./late-night-continuity";
export { pickSleepResidue } from "./sleep-residue";
export { pickInterruptedRhythm } from "./interrupted-rhythm";
export { pickRoomSilenceDensity } from "./room-silence-density";
export { pickDomesticTemporality } from "./domestic-temporality";
export { pickObjectRelocationMemory } from "./object-relocation-memory";
export { pickOrdinaryExhaustion } from "./ordinary-exhaustion-runtime";
export { pickAmbientHouseholdFlow } from "./ambient-household-flow";
export { pickLightUsageCycle } from "./light-usage-cycles";
export { pickInvisibleCoLiving } from "./invisible-co-living";
export { pickObjectSurvivedRhythm } from "./object-survived-rhythm";

/** Shared atmosphere label—same day, whole domain leans together. */
export function humanRhythmAtmosphere(worldId: WorldStateId): string {
  const heavy: WorldStateId[] = [
    "slow-laundry-week",
    "late-night-desk-season",
    "grey-afternoon",
    "quiet-hallway-week",
  ];
  const lighter: WorldStateId[] = ["open-window-weather", "humid-apartment", "kettle-slower-week"];
  if (heavy.includes(worldId)) return "tired apartment week—slower resets, longer pauses.";
  if (lighter.includes(worldId)) return "movement returning uneven—windows, kettles, ordinary drift.";
  if (worldId === "rain-entryway-week" || worldId === "colder-evening")
    return "colder slower rooms—wet geometry, thinner urgency.";
  return "unfinished domestic cycle—things stay where fatigue landed them.";
}

const GUIDANCE_RHYTHM: readonly string[] = [
  "Some routines already slipped this week—room stopped resetting nightly.",
  "Attention returns uneven—tabs and kettles disagree on pace.",
  "Things remain where they landed—reset energy thinner, not failure.",
  "Hallway quieter than ambition—ordinary week geometry.",
  "Mail and dishes share the same deferral—no moral attached.",
  "Chair angle survived another evening—nobody corrected it.",
];

const MAIL_RHYTHM: readonly string[] = [
  "Replies later lately—shelf checked after dinner, uneven human pace.",
  "Some mail drafted half-asleep—thumb typos ordinary.",
  "Photos taken under weak kitchen light—flash avoided honestly.",
  "Stamp licked quieter—tongue tired, not sentimental.",
  "Thread picked up mid-week—continuity without ticket tone.",
  "Envelope weighted with receipt ghosts—sorting deferred.",
];

export type HumanRhythmBundle = {
  dayKey: string;
  worldId: WorldStateId;
  atmosphereSummary: string;
  unfinishedLine: string;
  interruptionLine: string;
  silenceLine: string;
  domesticLine: string;
  relocationLine: string;
  exhaustionLine: string;
  householdFlowLine: string;
  lightCycleLine: string;
  lateNightLine: string | null;
  sleepResidueLine: string | null;
  coLivingLine: string | null;
  guidanceRhythmLine: string;
  mailRhythmLine: string;
  boundariesWhatThisIs: string;
};

export function resolveHumanRhythmBundle(now: Date = new Date()): HumanRhythmBundle {
  const dayKey = getLivingDayKey(now);
  const worldId = worldStateIdForDayKey(dayKey);
  const h = now.getHours();

  return {
    dayKey,
    worldId,
    atmosphereSummary: humanRhythmAtmosphere(worldId),
    unfinishedLine: pickUnfinishedDomesticity(dayKey, worldId),
    interruptionLine: pickInterruptedRhythm(dayKey),
    silenceLine: pickRoomSilenceDensity(dayKey, worldId),
    domesticLine: pickDomesticTemporality(dayKey, worldId),
    relocationLine: pickObjectRelocationMemory(dayKey, worldId),
    exhaustionLine: pickOrdinaryExhaustion(dayKey, worldId),
    householdFlowLine: pickAmbientHouseholdFlow(dayKey, worldId),
    lightCycleLine: pickLightUsageCycle(dayKey, worldId),
    lateNightLine: pickLateNightContinuity(dayKey, worldId, h),
    sleepResidueLine: pickSleepResidue(dayKey, h),
    coLivingLine: pickInvisibleCoLiving(dayKey, worldId),
    guidanceRhythmLine: GUIDANCE_RHYTHM[dailyIndex(dayKey + ":gr" + worldId, GUIDANCE_RHYTHM.length)]!,
    mailRhythmLine: MAIL_RHYTHM[dailyIndex(dayKey + ":mr" + worldId, MAIL_RHYTHM.length)]!,
    boundariesWhatThisIs: humanRhythmBoundaries.whatThisIs,
  };
}

export function guidanceRhythmContinuity(
  worldId: WorldStateId,
  sessionWeatherId: SessionWeatherId,
  dayKey: string,
): string {
  const base = GUIDANCE_RHYTHM[dailyIndex(dayKey + ":grc" + sessionWeatherId + worldId, GUIDANCE_RHYTHM.length)]!;
  return base;
}

export { pickObjectSurvivedRhythm as pickObjectRhythmLine };
