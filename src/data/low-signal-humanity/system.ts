import { getLivingDayKey } from "@/lib/living-day-key";
import { worldStateIdForDayKey } from "@/data/living-presence-runtime/same-day-world-state";
import { worldAgeStateId, type WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { antiDrama } from "./anti-drama-runtime";
import { pickAnonymousRoomTrace } from "./anonymous-room-traces";
import { guidanceFalloff } from "./guidance-falloff-runtime";
import { humanEnergyFalloffByAge } from "./human-energy-falloff";
import { pickHumanSignalMemory } from "./human-signal-memory";
import { pickMailThreadSediment } from "./mail-thread-sediment";
import { objectBackgroundRuntimeByAge } from "./object-background-runtime";
import { objectFamiliarityDecayByAge } from "./object-familiarity-decay";
import { objectLanguageThinningByAge } from "./object-language-thinning";
import { pickObjectRevisitSilence } from "./object-revisit-silence";
import { pickObjectRoomPermanence } from "./object-room-permanence";
import { pickQuietHumanReturn } from "./quiet-human-return";
import { pickResidualHumanPresence } from "./residual-human-presence";
import { pickRitualBackgroundAging } from "./ritual-background-aging";
import { sedimentWindow } from "./sediment-window-runtime";
import { signalFalloffByAge, type SignalFalloff } from "./signal-falloff";
import { structuralMemoryByAge } from "./structural-memory-runtime";
import { pickUsageSediment } from "./usage-sediment";
import type { AntiDramaAudit } from "./anti-drama-runtime";
import type { SedimentWindow } from "./sediment-window-runtime";

export { pickResidualHumanPresence } from "./residual-human-presence";
export { signalFalloffByAge } from "./signal-falloff";
export { pickQuietHumanReturn } from "./quiet-human-return";
export { pickAnonymousRoomTrace } from "./anonymous-room-traces";
export { pickUsageSediment } from "./usage-sediment";
export { humanEnergyFalloffByAge } from "./human-energy-falloff";
export { sedimentWindow } from "./sediment-window-runtime";
export { objectFamiliarityDecayByAge } from "./object-familiarity-decay";
export { objectBackgroundRuntimeByAge } from "./object-background-runtime";
export { pickObjectRevisitSilence } from "./object-revisit-silence";
export { pickObjectRoomPermanence } from "./object-room-permanence";
export { guidanceFalloff } from "./guidance-falloff-runtime";
export { pickRitualBackgroundAging } from "./ritual-background-aging";
export { pickMailThreadSediment } from "./mail-thread-sediment";
export { structuralMemoryByAge } from "./structural-memory-runtime";
export { pickHumanSignalMemory } from "./human-signal-memory";
export { antiDrama } from "./anti-drama-runtime";

export type LowSignalHumanityBundle = {
  dayKey: string;
  ageStateId: WorldAgeStateId;
  residualPresenceLine: string;
  quietReturnLine: string;
  anonymousTraceLine: string;
  usageSedimentLine: string;
  humanEnergyLine: string;
  sedimentWindow: SedimentWindow;
  objectFamiliarityLine: string;
  objectBackgroundLine: string;
  objectRevisitSilenceLine: string;
  objectRoomPermanenceLine: string;
  guidanceFalloff: ReturnType<typeof guidanceFalloff>;
  ritualBackgroundLine: string;
  mailThreadSedimentLine: string;
  structuralMemoryLine: string;
  humanSignalMemoryLine: string;
  signalFalloff: SignalFalloff;
  antiDramaAudit: AntiDramaAudit;
};

export function resolveLowSignalHumanityBundle(now: Date = new Date()): LowSignalHumanityBundle {
  const dayKey = getLivingDayKey(now);
  const worldState = worldStateIdForDayKey(dayKey);
  const ageStateId = worldAgeStateId(dayKey, worldState);
  return {
    dayKey,
    ageStateId,
    residualPresenceLine: pickResidualHumanPresence(ageStateId, dayKey),
    quietReturnLine: pickQuietHumanReturn(ageStateId, dayKey),
    anonymousTraceLine: pickAnonymousRoomTrace(ageStateId, dayKey),
    usageSedimentLine: pickUsageSediment(ageStateId, dayKey),
    humanEnergyLine: humanEnergyFalloffByAge[ageStateId],
    sedimentWindow: sedimentWindow(ageStateId, dayKey),
    objectFamiliarityLine: objectFamiliarityDecayByAge[ageStateId],
    objectBackgroundLine: objectBackgroundRuntimeByAge[ageStateId],
    objectRevisitSilenceLine: pickObjectRevisitSilence(ageStateId, dayKey),
    objectRoomPermanenceLine: pickObjectRoomPermanence(ageStateId, dayKey),
    guidanceFalloff: guidanceFalloff(ageStateId, dayKey),
    ritualBackgroundLine: pickRitualBackgroundAging("daily-guidance", ageStateId, dayKey),
    mailThreadSedimentLine: pickMailThreadSediment(ageStateId, dayKey),
    structuralMemoryLine: structuralMemoryByAge[ageStateId],
    humanSignalMemoryLine: pickHumanSignalMemory(ageStateId, dayKey),
    signalFalloff: signalFalloffByAge[ageStateId],
    antiDramaAudit: antiDrama(ageStateId),
  };
}
