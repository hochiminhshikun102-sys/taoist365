import { runtimeAmbientCoexistenceLine } from "./runtime-ambient-coexistence";
import { runtimeBalanceEquilibriumLine } from "./runtime-balance-equilibrium";
import { runtimeCoexistenceSocietyLine } from "./runtime-coexistence-society";
import { runtimePresenceEconomyLine } from "./runtime-presence-economy";
import { runtimeRetreatDiplomacyLine } from "./runtime-retreat-diplomacy";
import { runtimeSilenceNegotiationLine } from "./runtime-silence-negotiation";
import { runtimeSocialPressureLine } from "./runtime-social-pressure";
import { runtimeSocietyGovernanceLine } from "./runtime-society-governance";
import { runtimeSocietyRuntimeLine } from "./runtime-society-runtime";
import { runtimeVisibilityPoliticsLine } from "./runtime-visibility-politics";

export type RuntimeSocietyEngineBundle = {
  runtimeSocietyRuntimeLine: string;
  runtimeSocialPressureLine: string;
  runtimeCoexistenceSocietyLine: string;
  runtimePresenceEconomyLine: string;
  runtimeVisibilityPoliticsLine: string;
  runtimeSilenceNegotiationLine: string;
  runtimeAmbientCoexistenceLine: string;
  runtimeRetreatDiplomacyLine: string;
  runtimeBalanceEquilibriumLine: string;
  runtimeSocietyGovernanceLine: string;
};

export function resolveRuntimeSocietyEngineBundle(): RuntimeSocietyEngineBundle {
  return {
    runtimeSocietyRuntimeLine: runtimeSocietyRuntimeLine(),
    runtimeSocialPressureLine: runtimeSocialPressureLine(),
    runtimeCoexistenceSocietyLine: runtimeCoexistenceSocietyLine(),
    runtimePresenceEconomyLine: runtimePresenceEconomyLine(),
    runtimeVisibilityPoliticsLine: runtimeVisibilityPoliticsLine(),
    runtimeSilenceNegotiationLine: runtimeSilenceNegotiationLine(),
    runtimeAmbientCoexistenceLine: runtimeAmbientCoexistenceLine(),
    runtimeRetreatDiplomacyLine: runtimeRetreatDiplomacyLine(),
    runtimeBalanceEquilibriumLine: runtimeBalanceEquilibriumLine(),
    runtimeSocietyGovernanceLine: runtimeSocietyGovernanceLine(),
  };
}
