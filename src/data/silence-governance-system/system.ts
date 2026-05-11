import { absenceGovernanceLine } from "./absence-governance";
import { ambientAbsenceRuntimeLine } from "./ambient-absence-runtime";
import { defaultQuietStateLine } from "./default-quiet-state";
import { longAbsenceWindowsLine } from "./long-absence-windows";
import { nonDisplayGovernorLine } from "./non-display-governor";
import { nonPresenceGovernanceLine } from "./non-presence-governance";
import { quietSurfaceRuntimeLine } from "./quiet-surface-runtime";
import { residueRetirementLine } from "./residue-retirement";
import { silenceDensityBalancerLine } from "./silence-density-balancer";
import { structuralSilencePriorityLine } from "./structural-silence-priority";

export type SilenceGovernanceSystemBundle = {
  absenceGovernanceLine: string;
  quietSurfaceRuntimeLine: string;
  nonDisplayGovernorLine: string;
  ambientAbsenceRuntimeLine: string;
  structuralSilencePriorityLine: string;
  defaultQuietStateLine: string;
  longAbsenceWindowsLine: string;
  residueRetirementLine: string;
  silenceDensityBalancerLine: string;
  nonPresenceGovernanceLine: string;
};

export function resolveSilenceGovernanceSystemBundle(): SilenceGovernanceSystemBundle {
  return {
    absenceGovernanceLine: absenceGovernanceLine(),
    quietSurfaceRuntimeLine: quietSurfaceRuntimeLine(),
    nonDisplayGovernorLine: nonDisplayGovernorLine(),
    ambientAbsenceRuntimeLine: ambientAbsenceRuntimeLine(),
    structuralSilencePriorityLine: structuralSilencePriorityLine(),
    defaultQuietStateLine: defaultQuietStateLine(),
    longAbsenceWindowsLine: longAbsenceWindowsLine(),
    residueRetirementLine: residueRetirementLine(),
    silenceDensityBalancerLine: silenceDensityBalancerLine(),
    nonPresenceGovernanceLine: nonPresenceGovernanceLine(),
  };
}
