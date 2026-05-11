import { ambientObjectPresenceLine } from "./ambient-object-presence";
import { antiCatalogRuntimeLine } from "./anti-catalog-runtime";
import { antiProductHighlightLine } from "./anti-product-highlight";
import { foregroundRetirementLine } from "./foreground-retirement";
import { objectBackgroundGovernanceLine } from "./object-background-governance";
import { objectDefaultnessRuntimeLine } from "./object-defaultness-runtime";
import { objectDisappearanceGovernanceLine } from "./object-disappearance-governance";
import { roomInfrastructureRulesLine } from "./room-infrastructure-rules";
import { roomObjectGravityLine } from "./room-object-gravity";

export type ObjectGovernanceEngineBundle = {
  objectBackgroundGovernanceLine: string;
  roomInfrastructureRulesLine: string;
  antiCatalogRuntimeLine: string;
  antiProductHighlightLine: string;
  objectDisappearanceGovernanceLine: string;
  foregroundRetirementLine: string;
  objectDefaultnessRuntimeLine: string;
  ambientObjectPresenceLine: string;
  roomObjectGravityLine: string;
};

export function resolveObjectGovernanceEngineBundle(): ObjectGovernanceEngineBundle {
  return {
    objectBackgroundGovernanceLine: objectBackgroundGovernanceLine(),
    roomInfrastructureRulesLine: roomInfrastructureRulesLine(),
    antiCatalogRuntimeLine: antiCatalogRuntimeLine(),
    antiProductHighlightLine: antiProductHighlightLine(),
    objectDisappearanceGovernanceLine: objectDisappearanceGovernanceLine(),
    foregroundRetirementLine: foregroundRetirementLine(),
    objectDefaultnessRuntimeLine: objectDefaultnessRuntimeLine(),
    ambientObjectPresenceLine: ambientObjectPresenceLine(),
    roomObjectGravityLine: roomObjectGravityLine(),
  };
}
