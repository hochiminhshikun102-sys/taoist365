import { ambientOpenLoopLine } from "./ambient-open-loop";
import { backgroundBrowserDriftLine } from "./background-browser-drift";
import { browserCoexistenceLine } from "./browser-coexistence";
import { hostnameDefaultnessLine } from "./hostname-defaultness";
import { nonPerformativePresenceLine } from "./non-performative-presence";
import { passiveOpenRuntimeLine } from "./passive-open-runtime";
import { passiveRevisitRuntimeLine } from "./passive-revisit-runtime";
import { quietRefocusEngineLine } from "./quiet-refocus-engine";
import { softTabMemoryLine } from "./soft-tab-memory";

export type PassiveInternetCoexistenceBundle = {
  passiveOpenRuntimeLine: string;
  backgroundBrowserDriftLine: string;
  quietRefocusEngineLine: string;
  softTabMemoryLine: string;
  hostnameDefaultnessLine: string;
  passiveRevisitRuntimeLine: string;
  browserCoexistenceLine: string;
  ambientOpenLoopLine: string;
  nonPerformativePresenceLine: string;
};

export function resolvePassiveInternetCoexistenceBundle(): PassiveInternetCoexistenceBundle {
  return {
    passiveOpenRuntimeLine: passiveOpenRuntimeLine(),
    backgroundBrowserDriftLine: backgroundBrowserDriftLine(),
    quietRefocusEngineLine: quietRefocusEngineLine(),
    softTabMemoryLine: softTabMemoryLine(),
    hostnameDefaultnessLine: hostnameDefaultnessLine(),
    passiveRevisitRuntimeLine: passiveRevisitRuntimeLine(),
    browserCoexistenceLine: browserCoexistenceLine(),
    ambientOpenLoopLine: ambientOpenLoopLine(),
    nonPerformativePresenceLine: nonPerformativePresenceLine(),
  };
}
