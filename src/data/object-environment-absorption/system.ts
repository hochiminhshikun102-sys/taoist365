import { objectAirPresenceLine } from "./object-air-presence";
import { objectAmbientWeatheringLine } from "./object-ambient-weathering";
import { objectEnvironmentBlendingLine } from "./object-environment-blending";
import { objectFamiliarityWithoutFocusLine } from "./object-familiarity-without-focus";
import { objectNoLongerDisplayLine } from "./object-no-longer-display";
import { objectPassiveContactLine } from "./object-passive-contact";
import { objectRoomInfrastructureLine } from "./object-room-infrastructure";
import { objectSurfaceDefaultnessLine } from "./object-surface-defaultness";
import { roomObjectEquilibriumLine } from "./room-object-equilibrium";

export type ObjectEnvironmentAbsorptionBundle = {
  objectAirPresenceLine: string;
  objectEnvironmentBlendingLine: string;
  objectNoLongerDisplayLine: string;
  objectRoomInfrastructureLine: string;
  objectPassiveContactLine: string;
  objectAmbientWeatheringLine: string;
  objectFamiliarityWithoutFocusLine: string;
  objectSurfaceDefaultnessLine: string;
  roomObjectEquilibriumLine: string;
};

export function resolveObjectEnvironmentAbsorptionBundle(): ObjectEnvironmentAbsorptionBundle {
  return {
    objectAirPresenceLine: objectAirPresenceLine(),
    objectEnvironmentBlendingLine: objectEnvironmentBlendingLine(),
    objectNoLongerDisplayLine: objectNoLongerDisplayLine(),
    objectRoomInfrastructureLine: objectRoomInfrastructureLine(),
    objectPassiveContactLine: objectPassiveContactLine(),
    objectAmbientWeatheringLine: objectAmbientWeatheringLine(),
    objectFamiliarityWithoutFocusLine: objectFamiliarityWithoutFocusLine(),
    objectSurfaceDefaultnessLine: objectSurfaceDefaultnessLine(),
    roomObjectEquilibriumLine: roomObjectEquilibriumLine(),
  };
}
