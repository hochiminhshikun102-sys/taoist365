import { ambientStabilityPressureLine } from "./ambient-stability-pressure";
import { browserDefaultStabilityLine } from "./browser-default-stability";
import { internetAgingStabilityLine } from "./internet-aging-stability";
import { longLivedPageBalanceLine } from "./long-lived-page-balance";
import { nonEventSiteGovernorLine } from "./non-event-site-governor";
import { passivePresenceEquilibriumLine } from "./passive-presence-equilibrium";
import { quietSiteBalanceLine } from "./quiet-site-balance";
import { slowSiteEquilibriumLine } from "./slow-site-equilibrium";
import { stabilityRuntimeLine } from "./stability-runtime";

export type LongLivedInternetStabilityBundle = {
  stabilityRuntimeLine: string;
  slowSiteEquilibriumLine: string;
  longLivedPageBalanceLine: string;
  ambientStabilityPressureLine: string;
  internetAgingStabilityLine: string;
  passivePresenceEquilibriumLine: string;
  browserDefaultStabilityLine: string;
  nonEventSiteGovernorLine: string;
  quietSiteBalanceLine: string;
};

export function resolveLongLivedInternetStabilityBundle(): LongLivedInternetStabilityBundle {
  return {
    stabilityRuntimeLine: stabilityRuntimeLine(),
    slowSiteEquilibriumLine: slowSiteEquilibriumLine(),
    longLivedPageBalanceLine: longLivedPageBalanceLine(),
    ambientStabilityPressureLine: ambientStabilityPressureLine(),
    internetAgingStabilityLine: internetAgingStabilityLine(),
    passivePresenceEquilibriumLine: passivePresenceEquilibriumLine(),
    browserDefaultStabilityLine: browserDefaultStabilityLine(),
    nonEventSiteGovernorLine: nonEventSiteGovernorLine(),
    quietSiteBalanceLine: quietSiteBalanceLine(),
  };
}
