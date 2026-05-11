import { getLivingDayKey } from "@/lib/living-day-key";
import { worldStateIdForDayKey } from "@/data/living-presence-runtime/same-day-world-state";
import { worldAgeStateId, type WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { ambientVisibility } from "./ambient-visibility";
import { pageDensityByAge, type BackgroundPageDensity } from "./background-page-density";
import { explanationFatigueByAge, type ExplanationFatigue } from "./explanation-fatigue";
import { guidanceFragmentation } from "./guidance-fragmentation";
import { objectFadeRuntime } from "./object-fade-runtime";
import { pageEnergy } from "./page-energy-runtime";
import { passiveLayoutByAge, type PassiveLayout } from "./passive-layout-runtime";
import { residueWindow } from "./residue-window-runtime";
import { ritualAbsence } from "./ritual-absence-runtime";
import { pickSectionFallthrough } from "./section-fallthrough";
import { silenceThresholdsByAge, type SilenceThresholds } from "./silence-thresholds";
import { slowRotationByAge } from "./slow-rotation";
import { structuralAbsence } from "./structural-absence";
import { structuralSilenceBoundary } from "./structural-silence-boundaries";

export { structuralAbsence } from "./structural-absence";
export { pickSectionFallthrough } from "./section-fallthrough";
export { ambientVisibility } from "./ambient-visibility";
export { slowRotationByAge } from "./slow-rotation";
export { pageDensityByAge } from "./background-page-density";
export { pageEnergy } from "./page-energy-runtime";
export { silenceThresholdsByAge } from "./silence-thresholds";
export { passiveLayoutByAge } from "./passive-layout-runtime";
export { ritualAbsence } from "./ritual-absence-runtime";
export { guidanceFragmentation } from "./guidance-fragmentation";
export { objectFadeRuntime } from "./object-fade-runtime";
export { residueWindow } from "./residue-window-runtime";
export { structuralSilenceBoundary } from "./structural-silence-boundaries";
export { explanationFatigueByAge } from "./explanation-fatigue";

export type StructuralSilenceBundle = {
  dayKey: string;
  ageStateId: WorldAgeStateId;
  pageEnergy: ReturnType<typeof pageEnergy>;
  pageDensity: BackgroundPageDensity;
  structuralAbsence: ReturnType<typeof structuralAbsence>;
  sectionFallthroughLine: string;
  ambientVisibility: ReturnType<typeof ambientVisibility>;
  slowRotation: number;
  silenceThresholds: SilenceThresholds;
  passiveLayout: PassiveLayout;
  ritualAbsence: ReturnType<typeof ritualAbsence>;
  guidanceFragmentation: ReturnType<typeof guidanceFragmentation>;
  objectFade: ReturnType<typeof objectFadeRuntime>;
  residueWindow: ReturnType<typeof residueWindow>;
  boundary: ReturnType<typeof structuralSilenceBoundary>;
  explanationFatigue: ExplanationFatigue;
};

export function resolveStructuralSilenceBundle(now: Date = new Date()): StructuralSilenceBundle {
  const dayKey = getLivingDayKey(now);
  const worldStateId = worldStateIdForDayKey(dayKey);
  const ageStateId = worldAgeStateId(dayKey, worldStateId);
  return {
    dayKey,
    ageStateId,
    pageEnergy: pageEnergy(dayKey, worldStateId),
    pageDensity: pageDensityByAge[ageStateId],
    structuralAbsence: structuralAbsence(ageStateId, dayKey),
    sectionFallthroughLine: pickSectionFallthrough(ageStateId, dayKey),
    ambientVisibility: ambientVisibility(ageStateId, dayKey),
    slowRotation: slowRotationByAge[ageStateId],
    silenceThresholds: silenceThresholdsByAge[ageStateId],
    passiveLayout: passiveLayoutByAge[ageStateId],
    ritualAbsence: ritualAbsence(ageStateId, dayKey),
    guidanceFragmentation: guidanceFragmentation(ageStateId, dayKey),
    objectFade: objectFadeRuntime(ageStateId, dayKey),
    residueWindow: residueWindow(ageStateId, dayKey),
    boundary: structuralSilenceBoundary(ageStateId),
    explanationFatigue: explanationFatigueByAge[ageStateId],
  };
}
