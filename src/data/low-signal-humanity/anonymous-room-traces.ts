import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const traces = [
  "Chair angle changed slightly and stayed that way.",
  "A drawer remained uneven through multiple passes.",
  "Paper edge softened where hands repeatedly paused.",
  "A second mug drifted left and was left there.",
  "One stack held position while everything else rotated around it.",
];

export function pickAnonymousRoomTrace(age: WorldAgeStateId, dayKey: string): string {
  return traces[dailyIndex(dayKey + ":anon-trace:" + age, traces.length)]!;
}
