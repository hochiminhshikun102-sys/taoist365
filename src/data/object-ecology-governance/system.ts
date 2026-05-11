import { ambientObjectDefaultnessLine } from "./ambient-object-defaultness";
import { antiForegroundRuntimeLine } from "./anti-foreground-runtime";
import { objectBackgroundPriorityLine } from "./object-background-priority";
import { objectNoiseThinningLine } from "./object-noise-thinning";
import { objectProseRetirementLine } from "./object-prose-retirement";
import { objectQuietEquilibriumLine } from "./object-quiet-equilibrium";
import { objectSilencePressureLine } from "./object-silence-pressure";
import { passiveObjectPresenceLine } from "./passive-object-presence";
import { roomObjectStabilityLine } from "./room-object-stability";

export type ObjectEcologyGovernanceBundle = {
  objectQuietEquilibriumLine: string;
  objectBackgroundPriorityLine: string;
  antiForegroundRuntimeLine: string;
  objectSilencePressureLine: string;
  ambientObjectDefaultnessLine: string;
  roomObjectStabilityLine: string;
  objectProseRetirementLine: string;
  passiveObjectPresenceLine: string;
  objectNoiseThinningLine: string;
};

export function resolveObjectEcologyGovernanceBundle(): ObjectEcologyGovernanceBundle {
  return {
    objectQuietEquilibriumLine: objectQuietEquilibriumLine(),
    objectBackgroundPriorityLine: objectBackgroundPriorityLine(),
    antiForegroundRuntimeLine: antiForegroundRuntimeLine(),
    objectSilencePressureLine: objectSilencePressureLine(),
    ambientObjectDefaultnessLine: ambientObjectDefaultnessLine(),
    roomObjectStabilityLine: roomObjectStabilityLine(),
    objectProseRetirementLine: objectProseRetirementLine(),
    passiveObjectPresenceLine: passiveObjectPresenceLine(),
    objectNoiseThinningLine: objectNoiseThinningLine(),
  };
}
