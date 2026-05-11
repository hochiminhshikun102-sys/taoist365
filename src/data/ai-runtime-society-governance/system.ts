import { runtimeSocietyEquilibriumLine } from "./runtime-society-equilibrium";
import { runtimePresenceNegotiationLine } from "./runtime-presence-negotiation";
import { runtimeSocialFatigueLine } from "./runtime-social-fatigue";
import { runtimeSilenceDiplomacyLine } from "./runtime-silence-diplomacy";
import { runtimeBackgroundGovernorLine } from "./runtime-background-governor";
import { runtimeForegroundCollapseLine } from "./runtime-foreground-collapse";
import { ambientRuntimeCoexistenceLine } from "./ambient-runtime-coexistence";
import { runtimeSelfRestraintLine } from "./runtime-self-restraint";
import { runtimeSocietyStabilityLine } from "./runtime-society-stability";

export type AiRuntimeSocietyGovernanceBundle = {
  runtimeSocietyEquilibriumLine: string;
  runtimePresenceNegotiationLine: string;
  runtimeSocialFatigueLine: string;
  runtimeSilenceDiplomacyLine: string;
  runtimeBackgroundGovernorLine: string;
  runtimeForegroundCollapseLine: string;
  ambientRuntimeCoexistenceLine: string;
  runtimeSelfRestraintLine: string;
  runtimeSocietyStabilityLine: string;
};

export function resolveAiRuntimeSocietyGovernanceBundle(): AiRuntimeSocietyGovernanceBundle {
  return {
    runtimeSocietyEquilibriumLine: runtimeSocietyEquilibriumLine(),
    runtimePresenceNegotiationLine: runtimePresenceNegotiationLine(),
    runtimeSocialFatigueLine: runtimeSocialFatigueLine(),
    runtimeSilenceDiplomacyLine: runtimeSilenceDiplomacyLine(),
    runtimeBackgroundGovernorLine: runtimeBackgroundGovernorLine(),
    runtimeForegroundCollapseLine: runtimeForegroundCollapseLine(),
    ambientRuntimeCoexistenceLine: ambientRuntimeCoexistenceLine(),
    runtimeSelfRestraintLine: runtimeSelfRestraintLine(),
    runtimeSocietyStabilityLine: runtimeSocietyStabilityLine(),
  };
}
