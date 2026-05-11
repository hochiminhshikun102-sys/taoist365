import { quietRoomBoundaryLine } from "./quiet-room-boundary";
import { lowDemandAtmosphereLine } from "./low-demand-atmosphere";
import { antiFeedGovernanceLine } from "./anti-feed-governance";
import { antiProductizationLine } from "./anti-productization";
import { antiSaasRuntimeLine } from "./anti-saas-runtime";
import { governanceBoundariesLine } from "./governance-boundaries";
import { longTermDefaultnessLine } from "./long-term-defaultness";
import { presenceGovernanceLine } from "./presence-governance";
import { runtimeGovernanceLine } from "./runtime-governance";
import { silenceGovernanceLine } from "./silence-governance";

export type WorldGovernanceEngineBundle = {
  governanceBoundariesLine: string;
  runtimeGovernanceLine: string;
  presenceGovernanceLine: string;
  silenceGovernanceLine: string;
  antiProductizationLine: string;
  quietRoomBoundaryLine: string;
  antiSaasRuntimeLine: string;
  antiFeedGovernanceLine: string;
  lowDemandAtmosphereLine: string;
  longTermDefaultnessLine: string;
};

export function resolveWorldGovernanceEngineBundle(): WorldGovernanceEngineBundle {
  return {
    governanceBoundariesLine: governanceBoundariesLine(),
    runtimeGovernanceLine: runtimeGovernanceLine(),
    presenceGovernanceLine: presenceGovernanceLine(),
    silenceGovernanceLine: silenceGovernanceLine(),
    antiProductizationLine: antiProductizationLine(),
    quietRoomBoundaryLine: quietRoomBoundaryLine(),
    antiSaasRuntimeLine: antiSaasRuntimeLine(),
    antiFeedGovernanceLine: antiFeedGovernanceLine(),
    lowDemandAtmosphereLine: lowDemandAtmosphereLine(),
    longTermDefaultnessLine: longTermDefaultnessLine(),
  };
}
