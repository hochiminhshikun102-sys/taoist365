import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { WorldInertiaBundle } from "@/data/world-inertia-runtime/system";
import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import { antiOverdesignAuditLine } from "./anti-overdesign-runtime";
import { resolveAmbientFreeze } from "./ambient-freeze-runtime";
import { pickBrowserFamiliarityLine } from "./browser-familiarity-runtime";
import { resolveDensityBudget, type DensityBudget } from "./density-budget-runtime";
import { resolveExplanationRetirement, type ExplanationRetirement } from "./explanation-retirement";
import { resolveGuidanceCollapse, type GuidanceCollapse } from "./guidance-collapse-runtime";
import { resolveHomeThinning, type HomeThinning } from "./home-thinning-runtime";
import { lowRefreshGovernorLine, lowRefreshMultiplier } from "./low-refresh-governor";
import { pickLongTabPresenceLine } from "./long-tab-presence";
import { resolveMailDefaulting, type MailDefaulting } from "./mail-defaulting-runtime";
import { resolveRuntimeMutualExclusion, type RuntimeMutualExclusion } from "./runtime-mutual-exclusion";
import { residueSuppressionLine, residueSuppressionTier, type ResidueSuppressionTier } from "./residue-suppression";
import { resolveRitualQuietWindow, type RitualQuietWindow } from "./ritual-quiet-window";
import { resolveSectionAbsenceMatrix, type SectionAbsenceMatrix, type DensitySectionKey } from "./section-absence-matrix";
import { stabilityPressure } from "./stability-pressure";
import { pickWorldExhaustionLine } from "./world-exhaustion-runtime";

export type {
  DensitySectionKey,
  SectionAbsenceMatrix,
  DensityBudget,
  RuntimeMutualExclusion,
  ResidueSuppressionTier,
  ExplanationRetirement,
  GuidanceCollapse,
  RitualQuietWindow,
  MailDefaulting,
  HomeThinning,
};
export { objectSilenceWindow, type ObjectSilenceWindow } from "./object-silence-calendar";

export type WorldDensityCalibrationBundle = {
  dayKey: string;
  ageStateId: WorldAgingBundle["ageStateId"];
  densityBudget: ReturnType<typeof resolveDensityBudget>;
  sectionMatrix: SectionAbsenceMatrix;
  mutualExclusion: RuntimeMutualExclusion;
  residueSuppressionTier: ResidueSuppressionTier;
  residueSuppressionLine: string | null;
  explanationRetirement: ExplanationRetirement;
  ambientFreeze: ReturnType<typeof resolveAmbientFreeze>;
  guidanceCollapse: GuidanceCollapse;
  ritualQuiet: RitualQuietWindow;
  mailDefaulting: MailDefaulting;
  homeThinning: HomeThinning;
  longTabPresenceLine: string;
  browserFamiliarityLine: string;
  worldExhaustionLine: string;
  stabilityPressure: number;
  antiOverdesignLine: string;
  lowRefreshMultiplier: number;
  lowRefreshGovernorLine: string;
};

export function resolveWorldDensityCalibrationBundle(
  structuralSilence: StructuralSilenceBundle,
  inertia: WorldInertiaBundle,
  aging: WorldAgingBundle,
): WorldDensityCalibrationBundle {
  const dayKey = structuralSilence.dayKey;
  const ageStateId = aging.ageStateId;

  const densityBudget = resolveDensityBudget(ageStateId, dayKey, structuralSilence);
  const sectionMatrix = resolveSectionAbsenceMatrix(ageStateId, dayKey, structuralSilence);
  const mutualExclusion = resolveRuntimeMutualExclusion(ageStateId, dayKey, structuralSilence, inertia);
  const tier = residueSuppressionTier(ageStateId, dayKey, structuralSilence);
  const explanationRetirement = resolveExplanationRetirement(ageStateId, dayKey, structuralSilence);
  const ambientFreeze = resolveAmbientFreeze(ageStateId, dayKey);
  const guidanceCollapse = resolveGuidanceCollapse(ageStateId, dayKey, structuralSilence, inertia);
  const ritualQuiet = resolveRitualQuietWindow(ageStateId, dayKey, structuralSilence);
  const mailDefaulting = resolveMailDefaulting(ageStateId, dayKey, structuralSilence);
  const homeThinning = resolveHomeThinning(dayKey, structuralSilence);

  return {
    dayKey,
    ageStateId,
    densityBudget,
    sectionMatrix,
    mutualExclusion,
    residueSuppressionTier: tier,
    residueSuppressionLine: residueSuppressionLine(tier),
    explanationRetirement,
    ambientFreeze,
    guidanceCollapse,
    ritualQuiet,
    mailDefaulting,
    homeThinning,
    longTabPresenceLine: pickLongTabPresenceLine(ageStateId, dayKey),
    browserFamiliarityLine: pickBrowserFamiliarityLine(ageStateId, dayKey),
    worldExhaustionLine: pickWorldExhaustionLine(ageStateId, dayKey),
    stabilityPressure: stabilityPressure(ageStateId, dayKey),
    antiOverdesignLine: antiOverdesignAuditLine(dayKey),
    lowRefreshMultiplier: lowRefreshMultiplier(ageStateId, dayKey),
    lowRefreshGovernorLine: lowRefreshGovernorLine(ageStateId, dayKey),
  };
}
