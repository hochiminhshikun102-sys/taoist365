import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { objectBackgroundMemoryLine } from "./object-background-memory";
import { objectExplanationCollapseLine } from "./object-explanation-collapse";
import { objectForgettingReturnLine } from "./object-forgetting-return";
import { objectNonDisplayDay } from "./object-non-display-runtime";
import { objectRepeatContactLine } from "./object-repeat-contact";
import { objectReachWithoutThinkingLine } from "./object-reach-without-thinking";
import { objectRoomDefaultnessLine } from "./object-room-defaultness";
import { objectRoomGravityLine } from "./object-room-gravity";
import { objectVisualRetirementLine } from "./object-visual-retirement";

export type ObjectBackgroundContinuityBundle = {
  dayKey: string;
  /** Higher = object copy should further background */
  objectBackgroundBias: number;
  objectNonDisplayDay: boolean;
  objectBackgroundMemoryLine: string;
  objectRoomDefaultnessLine: string;
  objectReachWithoutThinkingLine: string;
  objectVisualRetirementLine: string;
  objectExplanationCollapseLine: string;
  objectRepeatContactLine: string;
  objectRoomGravityLine: string;
  objectForgettingReturnLine: string;
};

export function resolveObjectBackgroundContinuityBundle(aging: WorldAgingBundle): ObjectBackgroundContinuityBundle {
  const m = worldAgeStateMap[aging.ageStateId];
  const objectBackgroundBias = Math.min(0.94, m.stillnessWeight * 0.55 + m.explanationFatigue * 0.4);
  return {
    dayKey: aging.dayKey,
    objectBackgroundBias,
    objectNonDisplayDay: objectNonDisplayDay(aging.dayKey),
    objectBackgroundMemoryLine: objectBackgroundMemoryLine(),
    objectRoomDefaultnessLine: objectRoomDefaultnessLine(),
    objectReachWithoutThinkingLine: objectReachWithoutThinkingLine(),
    objectVisualRetirementLine: objectVisualRetirementLine(),
    objectExplanationCollapseLine: objectExplanationCollapseLine(),
    objectRepeatContactLine: objectRepeatContactLine(),
    objectRoomGravityLine: objectRoomGravityLine(),
    objectForgettingReturnLine: objectForgettingReturnLine(),
  };
}
