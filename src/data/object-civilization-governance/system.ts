import { ambientObjectDefaultnessLine } from "./ambient-object-defaultness";
import { ambientObjectSocietyLine } from "./ambient-object-society";
import { antiDisplayGovernanceLine } from "./anti-display-governance";
import { longLivedObjectEquilibriumLine } from "./long-lived-object-equilibrium";
import { objectCivilizationRuntimeLine } from "./object-civilization-runtime";
import { objectPresenceFatigueLine } from "./object-presence-fatigue";
import { objectQuietGovernorLine } from "./object-quiet-governor";
import { objectRoomStabilityLine } from "./object-room-stability";
import { roomInfrastructureEquilibriumLine } from "./room-infrastructure-equilibrium";

export type ObjectCivilizationGovernanceBundle = {
  objectCivilizationRuntimeLine: string;
  roomInfrastructureEquilibriumLine: string;
  ambientObjectSocietyLine: string;
  objectPresenceFatigueLine: string;
  objectQuietGovernorLine: string;
  objectRoomStabilityLine: string;
  antiDisplayGovernanceLine: string;
  ambientObjectDefaultnessLine: string;
  longLivedObjectEquilibriumLine: string;
};

export function resolveObjectCivilizationGovernanceBundle(): ObjectCivilizationGovernanceBundle {
  return {
    objectCivilizationRuntimeLine: objectCivilizationRuntimeLine(),
    roomInfrastructureEquilibriumLine: roomInfrastructureEquilibriumLine(),
    ambientObjectSocietyLine: ambientObjectSocietyLine(),
    objectPresenceFatigueLine: objectPresenceFatigueLine(),
    objectQuietGovernorLine: objectQuietGovernorLine(),
    objectRoomStabilityLine: objectRoomStabilityLine(),
    antiDisplayGovernanceLine: antiDisplayGovernanceLine(),
    ambientObjectDefaultnessLine: ambientObjectDefaultnessLine(),
    longLivedObjectEquilibriumLine: longLivedObjectEquilibriumLine(),
  };
}
