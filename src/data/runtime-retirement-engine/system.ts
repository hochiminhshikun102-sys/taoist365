import type { RuntimeRetirementBundle } from "@/data/runtime-retirement-system/system";
import { backgroundRetirementLine } from "./background-retirement";
import { guidanceRetirementEngineLine } from "./guidance-retirement";
import { mailRetirementEngineLine } from "./mail-retirement";
import { objectRetirementEngineLine } from "./object-retirement";
import { permanentRetirementLine } from "./permanent-retirement";
import { rareReturnRuntimeLine } from "./rare-return-runtime";
import { residueRetirementLine } from "./residue-retirement";
import { resolveRuntimeRetirementEngineStage, type RuntimeRetirementEngineStage } from "./retirement-stages";
import { ritualRetirementEngineLine } from "./ritual-retirement";
import { runtimeAgingBehaviorLine } from "./runtime-aging-behavior";
import { softRetirementLine } from "./soft-retirement";

export type RuntimeRetirementEngineBundle = {
  dayKey: string;
  stage: RuntimeRetirementEngineStage;
  pressureEcho: number;
  permanentRetirementLine: string;
  softRetirementLine: string;
  backgroundRetirementLine: string;
  rareReturnRuntimeLine: string;
  runtimeAgingBehaviorLine: string;
  residueRetirementLine: string;
  guidanceRetirementEngineLine: string;
  mailRetirementEngineLine: string;
  ritualRetirementEngineLine: string;
  objectRetirementEngineLine: string;
};

export function resolveRuntimeRetirementEngineBundle(retirement: RuntimeRetirementBundle): RuntimeRetirementEngineBundle {
  const { dayKey, pressure } = retirement;
  const stage = resolveRuntimeRetirementEngineStage(dayKey, pressure, retirement.worldFatigue.fatigueLevel);
  return {
    dayKey,
    stage,
    pressureEcho: Math.round(pressure * 100) / 100,
    permanentRetirementLine: permanentRetirementLine(stage),
    softRetirementLine: softRetirementLine(stage),
    backgroundRetirementLine: backgroundRetirementLine(stage),
    rareReturnRuntimeLine: rareReturnRuntimeLine(stage),
    runtimeAgingBehaviorLine: runtimeAgingBehaviorLine(stage),
    residueRetirementLine: residueRetirementLine(stage),
    guidanceRetirementEngineLine: guidanceRetirementEngineLine(stage),
    mailRetirementEngineLine: mailRetirementEngineLine(stage),
    ritualRetirementEngineLine: ritualRetirementEngineLine(stage),
    objectRetirementEngineLine: objectRetirementEngineLine(stage),
  };
}
