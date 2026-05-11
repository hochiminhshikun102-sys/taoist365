import { getLivingDayKey } from "@/lib/living-day-key";
import { worldStateIdForDayKey } from "@/data/living-presence-runtime/same-day-world-state";
import { worldAgeStateId, type WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { antiOverwriting } from "./anti-overwriting";
import { pickAmbientRepetition } from "./ambient-repetition";
import { pickBackgroundPresence } from "./background-presence";
import { explanationFatigueByAge } from "./explanation-fatigue";
import { guidanceMinimalBehavior } from "./guidance-minimal-runtime";
import { layoutStability } from "./layout-stability-runtime";
import { pickLongStillness } from "./long-stillness";
import { pickLongPresenceMemory } from "./long-presence-memory";
import { pickMailSediment } from "./mail-sediment-runtime";
import { memoryDensityByAge, recurrenceGate } from "./memory-density-runtime";
import { objectBackgroundingByAge } from "./object-backgrounding";
import { objectLanguageThinningByAge } from "./object-language-thinning";
import { pickObjectPermanence } from "./object-permanence-runtime";
import { pickObjectSilence } from "./object-silence";
import { pickRitualSilence } from "./ritual-silence-runtime";
import { silenceDensityByAge, type SilenceDensity } from "./silence-density";
import { structuralInertiaByAge } from "./structural-inertia";
import type { StructuralInertia } from "./structural-inertia";
import type { ExplanationFatigue } from "./explanation-fatigue";
import type { MemoryDensity } from "./memory-density-runtime";
import type { AntiOverwritingAudit } from "./anti-overwriting";

export { silenceDensityByAge } from "./silence-density";
export { pickLongStillness } from "./long-stillness";
export { pickAmbientRepetition } from "./ambient-repetition";
export { explanationFatigueByAge } from "./explanation-fatigue";
export { pickBackgroundPresence } from "./background-presence";
export { structuralInertiaByAge } from "./structural-inertia";
export { memoryDensityByAge } from "./memory-density-runtime";
export { objectBackgroundingByAge } from "./object-backgrounding";
export { pickObjectSilence } from "./object-silence";
export { objectLanguageThinningByAge } from "./object-language-thinning";
export { pickObjectPermanence } from "./object-permanence-runtime";
export { pickRitualSilence } from "./ritual-silence-runtime";
export { guidanceMinimalBehavior } from "./guidance-minimal-runtime";
export { pickMailSediment } from "./mail-sediment-runtime";
export { layoutStability } from "./layout-stability-runtime";
export { pickLongPresenceMemory } from "./long-presence-memory";
export { antiOverwriting } from "./anti-overwriting";

export type WorldInertiaBundle = {
  dayKey: string;
  ageStateId: WorldAgeStateId;
  silenceDensity: SilenceDensity;
  longStillnessLine: string;
  ambientRepetitionLine: string;
  backgroundPresenceLine: string;
  explanationFatigue: ExplanationFatigue;
  structureInertia: StructuralInertia;
  memoryDensity: MemoryDensity;
  longPresenceMemoryLine: string;
  maybeRecurrenceLine: string | null;
  objectBackgroundLine: string;
  objectSilenceLine: string;
  objectPermanenceLine: string;
  objectLanguageThinning: "full" | "short" | "minimal";
  ritualSilenceLine: string;
  guidanceMinimal: ReturnType<typeof guidanceMinimalBehavior>;
  mailSedimentLine: string;
  layoutStabilityLine: string;
  antiOverwritingAudit: AntiOverwritingAudit;
};

export function resolveWorldInertiaBundle(now: Date = new Date()): WorldInertiaBundle {
  const dayKey = getLivingDayKey(now);
  const worldStateId = worldStateIdForDayKey(dayKey);
  const ageStateId = worldAgeStateId(dayKey, worldStateId);
  const recurs = recurrenceGate(dayKey, ageStateId);

  return {
    dayKey,
    ageStateId,
    silenceDensity: silenceDensityByAge[ageStateId],
    longStillnessLine: pickLongStillness(ageStateId, dayKey),
    ambientRepetitionLine: pickAmbientRepetition(ageStateId, dayKey),
    backgroundPresenceLine: pickBackgroundPresence(ageStateId, dayKey),
    explanationFatigue: explanationFatigueByAge[ageStateId],
    structureInertia: structuralInertiaByAge[ageStateId],
    memoryDensity: memoryDensityByAge[ageStateId],
    longPresenceMemoryLine: pickLongPresenceMemory(ageStateId, dayKey),
    maybeRecurrenceLine: recurs ? pickAmbientRepetition(ageStateId, dayKey) : null,
    objectBackgroundLine: objectBackgroundingByAge[ageStateId],
    objectSilenceLine: pickObjectSilence(ageStateId, dayKey),
    objectPermanenceLine: pickObjectPermanence(ageStateId, dayKey),
    objectLanguageThinning: objectLanguageThinningByAge[ageStateId],
    ritualSilenceLine: pickRitualSilence("daily-guidance", ageStateId, dayKey),
    guidanceMinimal: guidanceMinimalBehavior(ageStateId, dayKey),
    mailSedimentLine: pickMailSediment(ageStateId, dayKey),
    layoutStabilityLine: layoutStability(ageStateId).line,
    antiOverwritingAudit: antiOverwriting(ageStateId),
  };
}
