import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "World exhaustion: fewer transitions, not burnout cosplay—just low energy honesty.",
  "Novelty pressure drops; layout inertia carries the week.",
  "Expression pressure is down; persistence is up.",
  "Quiet persistence: the site stops auditioning for attention.",
] as const;

export function pickWorldExhaustionLine(age: WorldAgeStateId, dayKey: string): string {
  const w = worldAgeStateMap[age].stillnessWeight;
  const i = dailyIndex(`${dayKey}:world-ex:${age}`, LINES.length);
  const line = LINES[i] ?? LINES[0];
  return w > 0.5 ? line : "The week still has spare capacity—exhaustion is not forced.";
}
