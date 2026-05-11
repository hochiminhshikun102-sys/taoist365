import { getLivingDayKey } from "@/lib/living-day-key";
import { worldStateIdForDayKey, type WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";
import { pickBackgroundObjectAging } from "./background-object-aging";
import { pickRoomDustLine } from "./room-dust-runtime";
import { pickSedimentLine } from "./sediment-lines";
import { pickSlowForgetting } from "./slow-forgetting";
import { pickSlowMemoryRecurrence } from "./slow-memory-recurrence";
import { slowLayoutMemoryByAge } from "./slow-layout-memory";
import { temporalDriftByAge } from "./temporal-drift";
import { worldAgeIndex } from "./world-age-index";
import { worldAgeStateId, worldAgeStateMap, type WorldAgeStateId } from "./world-age-state";

export { worldAgeStateMap, worldAgeStateId, type WorldAgeStateId } from "./world-age-state";
export { pickSedimentLine } from "./sediment-lines";
export { pickSlowForgetting } from "./slow-forgetting";
export { temporalDriftByAge } from "./temporal-drift";
export { pickBackgroundObjectAging } from "./background-object-aging";
export { pickRoomDustLine } from "./room-dust-runtime";
export { pickSlowMemoryRecurrence } from "./slow-memory-recurrence";
export { slowLayoutMemoryByAge } from "./slow-layout-memory";
export { worldAgeIndex } from "./world-age-index";

export type WorldAgingBundle = {
  dayKey: string;
  worldStateId: WorldStateId;
  ageStateId: WorldAgeStateId;
  ageLabel: string;
  sedimentLine: string;
  forgettingLine: string | null;
  driftWording: "full" | "shorter" | "compressed";
  driftGuidance: "normal" | "reduced" | "quiet";
  backgroundObjectLine: string;
  roomDustLine: string;
  slowMemoryRecurrence: string | null;
  layoutAgeLine: string;
  ritualAgingLine: string;
  guidanceFatigueLine: string;
  mailSedimentLine: string;
  antiRetroLine: string;
  index: ReturnType<typeof worldAgeIndex>;
};

export function resolveWorldAgingBundle(now: Date = new Date()): WorldAgingBundle {
  const dayKey = getLivingDayKey(now);
  const worldId = worldStateIdForDayKey(dayKey);
  const ageId = worldAgeStateId(dayKey, worldId);
  const age = worldAgeStateMap[ageId];
  const drift = temporalDriftByAge[ageId];
  const idx = worldAgeIndex(ageId, dayKey);

  return {
    dayKey,
    worldStateId: worldId,
    ageStateId: ageId,
    ageLabel: age.label,
    sedimentLine: pickSedimentLine(ageId, dayKey),
    forgettingLine: pickSlowForgetting(ageId, dayKey),
    driftWording: drift.wordingShortness,
    driftGuidance: drift.guidanceExplanation,
    backgroundObjectLine: pickBackgroundObjectAging(ageId, dayKey),
    roomDustLine: pickRoomDustLine(ageId, dayKey),
    slowMemoryRecurrence: pickSlowMemoryRecurrence(ageId, dayKey),
    layoutAgeLine: slowLayoutMemoryByAge[ageId].sectionDriftNote,
    ritualAgingLine:
      age.stillnessWeight > 0.6
        ? "Some ritual language has stayed unchanged long enough to feel older than the session."
        : "Ritual wording still shifts, but certain quiet lines now linger longer.",
    guidanceFatigueLine:
      drift.guidanceExplanation === "quiet"
        ? "Guidance is using fewer words lately; pauses carry more of the meaning."
        : "Guidance explains less than before, then lets the room hold the rest.",
    mailSedimentLine:
      drift.mailDensity === "minimal"
        ? "Mail threads have gone shorter over time; repeated lines now skip performance."
        : "Correspondence remains uneven and human, but descriptions shorten with reuse.",
    antiRetroLine: "No retro simulation here—only long-lived copy and room residue settling over time.",
    index: idx,
  };
}

export function guidanceFatigueForAge(ageStateId: WorldAgeStateId): string {
  const drift = temporalDriftByAge[ageStateId];
  if (drift.guidanceExplanation === "quiet") return "Fewer words, longer pauses, less explanation.";
  if (drift.guidanceExplanation === "reduced") return "Slightly fewer words with softer spacing.";
  return "Normal guidance density with room for pause.";
}
