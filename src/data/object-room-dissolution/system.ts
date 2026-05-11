import type { WorldAgingBundle } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { objectAmbientUseLine } from "./object-ambient-use";
import { objectDefaultPlacementLine } from "./object-default-placement";
import { objectForgottenFamiliarityLine } from "./object-forgotten-familiarity";
import { objectNonDisplayPresenceDay } from "./object-non-display-presence";
import { objectPresenceWithoutFocusLine } from "./object-presence-without-focus";
import { objectRoomAssimilationLine } from "./object-room-assimilation";
import { objectRoomWeatheringLine } from "./object-room-weathering";
import { objectSilentContactLine } from "./object-silent-contact";
import { roomStructureObjectsLine } from "./room-structure-objects";

export type ObjectRoomDissolutionBundle = {
  dayKey: string;
  /** 0–1 stronger dissolution of object-as-product copy */
  roomDissolutionBias: number;
  objectNonDisplayPresenceDay: boolean;
  objectRoomAssimilationLine: string;
  objectPresenceWithoutFocusLine: string;
  objectDefaultPlacementLine: string;
  objectSilentContactLine: string;
  objectAmbientUseLine: string;
  objectRoomWeatheringLine: string;
  objectForgottenFamiliarityLine: string;
  roomStructureObjectsLine: string;
};

export function resolveObjectRoomDissolutionBundle(aging: WorldAgingBundle): ObjectRoomDissolutionBundle {
  const m = worldAgeStateMap[aging.ageStateId];
  const roomDissolutionBias = Math.min(0.96, m.stillnessWeight * 0.5 + m.explanationFatigue * 0.46);
  return {
    dayKey: aging.dayKey,
    roomDissolutionBias,
    objectNonDisplayPresenceDay: objectNonDisplayPresenceDay(aging.dayKey),
    objectRoomAssimilationLine: objectRoomAssimilationLine(),
    objectPresenceWithoutFocusLine: objectPresenceWithoutFocusLine(),
    objectDefaultPlacementLine: objectDefaultPlacementLine(),
    objectSilentContactLine: objectSilentContactLine(),
    objectAmbientUseLine: objectAmbientUseLine(),
    objectRoomWeatheringLine: objectRoomWeatheringLine(),
    objectForgottenFamiliarityLine: objectForgottenFamiliarityLine(),
    roomStructureObjectsLine: roomStructureObjectsLine(),
  };
}
