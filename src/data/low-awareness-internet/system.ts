import { lowAwarenessRuntimeLine } from "./low-awareness-runtime";
import { ambientInternetDefaultnessLine } from "./ambient-internet-defaultness";
import { nonPerformativePresenceLine } from "./non-performative-presence";
import { internetSelfRestraintLine } from "./internet-self-restraint";
import { browserEnvironmentStabilityLine } from "./browser-environment-stability";
import { ambientTabEquilibriumLine } from "./ambient-tab-equilibrium";
import { quietUrlDefaultnessLine } from "./quiet-url-defaultness";
import { longLivedBrowserPresenceLine } from "./long-lived-browser-presence";
import { passiveInternetCoexistenceLine } from "./passive-internet-coexistence";

export type LowAwarenessInternetBundle = {
  lowAwarenessRuntimeLine: string;
  ambientInternetDefaultnessLine: string;
  nonPerformativePresenceLine: string;
  internetSelfRestraintLine: string;
  browserEnvironmentStabilityLine: string;
  ambientTabEquilibriumLine: string;
  quietUrlDefaultnessLine: string;
  longLivedBrowserPresenceLine: string;
  passiveInternetCoexistenceLine: string;
};

export function resolveLowAwarenessInternetBundle(): LowAwarenessInternetBundle {
  return {
    lowAwarenessRuntimeLine: lowAwarenessRuntimeLine(),
    ambientInternetDefaultnessLine: ambientInternetDefaultnessLine(),
    nonPerformativePresenceLine: nonPerformativePresenceLine(),
    internetSelfRestraintLine: internetSelfRestraintLine(),
    browserEnvironmentStabilityLine: browserEnvironmentStabilityLine(),
    ambientTabEquilibriumLine: ambientTabEquilibriumLine(),
    quietUrlDefaultnessLine: quietUrlDefaultnessLine(),
    longLivedBrowserPresenceLine: longLivedBrowserPresenceLine(),
    passiveInternetCoexistenceLine: passiveInternetCoexistenceLine(),
  };
}
