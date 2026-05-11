import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

export function worldRestraintLine(age: WorldAgeStateId, dayKey: string): string {
  const lines = [
    "Restraint: the world schedules quiet before copy does.",
    "Restraint: fewer runtimes speak at full volume on the same day.",
    "Restraint: absence is scheduled, not improvised.",
  ] as const;
  return lines[dailyIndex(`${dayKey}:restraint:${age}`, lines.length)] ?? lines[0];
}
