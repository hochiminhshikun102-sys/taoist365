import type { StructuralSilenceBundle } from "@/data/structural-silence-engine/system";
import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";
import { guidanceBackgroundRuntimeLine } from "./guidance-background-runtime";
import { guidanceFragmentDecayLine } from "./guidance-fragment-decay";
import { guidanceNoSessionFeelingLine } from "./guidance-no-session-feeling";
import { guidanceNonResolutionLine } from "./guidance-non-resolution";
import { guidancePassiveOpeningLine } from "./guidance-passive-opening";
import { guidanceRoomPresenceLine } from "./guidance-room-presence";
import { guidanceSoftExitLine } from "./guidance-soft-exit";
import { guidanceUnderresponseRuntimeLine } from "./guidance-underresponse-runtime";
import { guidanceWeatherOnlyCollapseLine } from "./guidance-weather-only";

export type GuidanceQuietCollapseBundle = {
  dayKey: string;
  /** Extra cap on noticing lines (null = no extra cap from this layer) */
  noticingHardCap: number | null;
  forceRoutesRetirement: boolean;
  hideSoftClosure: boolean;
  weatherOnlyCollapse: boolean;
  guidanceUnderresponseRuntimeLine: string;
  guidanceWeatherOnlyCollapseLine: string;
  guidanceRoomPresenceLine: string;
  guidancePassiveOpeningLine: string;
  guidanceNonResolutionLine: string;
  guidanceFragmentDecayLine: string;
  guidanceSoftExitLine: string;
  guidanceNoSessionFeelingLine: string;
  guidanceBackgroundRuntimeLine: string;
};

export function resolveGuidanceQuietCollapseBundle(
  structuralSilence: StructuralSilenceBundle,
  aging: WorldAgingBundle,
  runtimeRetirement: RuntimeRetirementBundle,
): GuidanceQuietCollapseBundle {
  const dayKey = structuralSilence.dayKey;
  const h = dailyIndex(`${dayKey}:gqc`, 100);
  const still = worldAgeStateMap[aging.ageStateId].stillnessWeight;
  const fatigue = runtimeRetirement.worldFatigue.fatigueLevel;
  const heavy = still > 0.56 || fatigue === "tired" || fatigue === "resting" || fatigue === "almostAbsent";

  let noticingHardCap: number | null = null;
  if (fatigue === "almostAbsent" || (heavy && h > 89)) noticingHardCap = 0;
  else if (heavy && h > 71) noticingHardCap = 1;

  const forceRoutesRetirement = heavy && (h > 86 || fatigue === "almostAbsent");
  const hideSoftClosure = heavy && (h > 80 || fatigue === "almostAbsent");
  const weatherOnlyCollapse = structuralSilence.guidanceFragmentation.weatherOnlyMode || (heavy && h > 58);

  return {
    dayKey,
    noticingHardCap,
    forceRoutesRetirement,
    hideSoftClosure,
    weatherOnlyCollapse,
    guidanceUnderresponseRuntimeLine: guidanceUnderresponseRuntimeLine(),
    guidanceWeatherOnlyCollapseLine: guidanceWeatherOnlyCollapseLine(),
    guidanceRoomPresenceLine: guidanceRoomPresenceLine(),
    guidancePassiveOpeningLine: guidancePassiveOpeningLine(),
    guidanceNonResolutionLine: guidanceNonResolutionLine(),
    guidanceFragmentDecayLine: guidanceFragmentDecayLine(),
    guidanceSoftExitLine: guidanceSoftExitLine(),
    guidanceNoSessionFeelingLine: guidanceNoSessionFeelingLine(),
    guidanceBackgroundRuntimeLine: guidanceBackgroundRuntimeLine(),
  };
}
