import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { objectBackgroundLifeLine } from "./object-background-life";
import { objectDefaultnessLine } from "./object-defaultness";
import { objectFamiliarityRuntimeLine } from "./object-familiarity-runtime";
import { objectNoLongerHighlightedLine } from "./object-no-longer-highlighted";
import { objectRevisitMinimalismLine } from "./object-revisit-minimalism";
import { objectRoomInfrastructureLine } from "./object-room-infrastructure";
import { objectSurfaceAgingLine } from "./object-surface-aging";
import { roomDependenceRuntimeLine } from "./room-dependence-runtime";

export type ObjectPermanenceEngineBundle = {
  dayKey: string;
  /** 0–1 higher = thinner object prose bias for UI */
  objectProseThinBias: number;
  objectBackgroundLifeLine: string;
  objectDefaultnessLine: string;
  objectRoomInfrastructureLine: string;
  objectNoLongerHighlightedLine: string;
  objectSurfaceAgingLine: string;
  objectRevisitMinimalismLine: string;
  objectFamiliarityRuntimeLine: string;
  roomDependenceRuntimeLine: string;
};

export function resolveObjectPermanenceEngineBundle(aging: WorldAgingBundle): ObjectPermanenceEngineBundle {
  const w = worldAgeStateMap[aging.ageStateId];
  const objectProseThinBias = Math.min(
    0.92,
    0.28 + w.stillnessWeight * 0.45 + w.explanationFatigue * 0.35,
  );
  return {
    dayKey: aging.dayKey,
    objectProseThinBias,
    objectBackgroundLifeLine: objectBackgroundLifeLine(),
    objectDefaultnessLine: objectDefaultnessLine(),
    objectRoomInfrastructureLine: objectRoomInfrastructureLine(),
    objectNoLongerHighlightedLine: objectNoLongerHighlightedLine(),
    objectSurfaceAgingLine: objectSurfaceAgingLine(),
    objectRevisitMinimalismLine: objectRevisitMinimalismLine(),
    objectFamiliarityRuntimeLine: objectFamiliarityRuntimeLine(),
    roomDependenceRuntimeLine: roomDependenceRuntimeLine(aging.ageStateId),
  };
}
