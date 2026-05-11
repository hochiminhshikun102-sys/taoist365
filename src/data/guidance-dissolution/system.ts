import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";
import { guidanceDriftLine } from "./guidance-drift";
import { guidanceNonResponseLine } from "./guidance-non-response";
import { guidanceQuietExitLine } from "./guidance-quiet-exit";
import { guidanceWeatherOnlyLine } from "./guidance-weather-only";
import { minimalGuidanceRuntimeLine } from "./minimal-guidance-runtime";
import { passiveGuidanceRuntimeLine } from "./passive-guidance-runtime";
import { routeRetirementLine } from "./route-retirement";
import { silentGuidanceWindowLine } from "./silent-guidance-window";

export type GuidanceDissolutionBundle = {
  dayKey: string;
  /** Hard weather-only for noticing stack (ORs with structural silence). */
  weatherOnlyHard: boolean;
  /** Extra skip routes beyond existing passive / retirement surfaces. */
  dissolveRoutes: boolean;
  /** Hide pause / closure footer copy at bottom of pause phase. */
  dissolveClosureCopy: boolean;
  /** When set, caps max noticing lines after other caps (null = no extra cap). */
  noticingUpperBound: number | null;
  minimalGuidanceRuntimeLine: string;
  guidanceWeatherOnlyLine: string;
  guidanceQuietExitLine: string;
  guidanceNonResponseLine: string;
  guidanceDriftLine: string;
  routeRetirementLine: string;
  passiveGuidanceRuntimeLine: string;
  silentGuidanceWindowLine: string;
};

export function resolveGuidanceDissolutionBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): GuidanceDissolutionBundle {
  const dayKey = structuralSilence.dayKey;
  const h = dailyIndex(`${dayKey}:g-diss`, 100);
  const still = worldAgeStateMap[aging.ageStateId].stillnessWeight;
  const fatigue = runtimeRetirement.worldFatigue.fatigueLevel;
  const baseDissolve =
    still > 0.58 ||
    fatigue === "tired" ||
    fatigue === "resting" ||
    fatigue === "almostAbsent" ||
    structuralSilence.guidanceFragmentation.weatherOnlyMode;

  const weatherOnlyHard = structuralSilence.guidanceFragmentation.weatherOnlyMode || (baseDissolve && h > 44);
  const dissolveRoutes =
    baseDissolve && (h > 84 || fatigue === "almostAbsent" || (fatigue === "resting" && h > 90));
  const dissolveClosureCopy = baseDissolve && (h > 78 || fatigue === "almostAbsent");
  let noticingUpperBound: number | null = null;
  if (fatigue === "almostAbsent" || (baseDissolve && h > 91)) noticingUpperBound = 0;
  else if (weatherOnlyHard && h > 62) noticingUpperBound = 1;
  else if (baseDissolve && h > 76) noticingUpperBound = 1;

  return {
    dayKey,
    weatherOnlyHard,
    dissolveRoutes,
    dissolveClosureCopy,
    noticingUpperBound,
    minimalGuidanceRuntimeLine: minimalGuidanceRuntimeLine(),
    guidanceWeatherOnlyLine: guidanceWeatherOnlyLine(),
    guidanceQuietExitLine: guidanceQuietExitLine(),
    guidanceNonResponseLine: guidanceNonResponseLine(),
    guidanceDriftLine: guidanceDriftLine(),
    routeRetirementLine: routeRetirementLine(),
    passiveGuidanceRuntimeLine: passiveGuidanceRuntimeLine(),
    silentGuidanceWindowLine: silentGuidanceWindowLine(),
  };
}
