import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const revisitSilenceLines = [
  "Repeated object revisits no longer trigger full restatement.",
  "Familiar object references stay short on return.",
  "Object echoes now reopen quietly without fresh framing.",
];

export function pickObjectRevisitSilence(age: WorldAgeStateId, dayKey: string): string {
  return revisitSilenceLines[dailyIndex(dayKey + ":obj-revisit:" + age, revisitSilenceLines.length)]!;
}
