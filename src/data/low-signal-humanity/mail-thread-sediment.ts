import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const lines = [
  "Mail replies are now implied shorter than before.",
  "Repeated object references no longer re-explain themselves.",
  "Threads feel already ongoing rather than freshly opened.",
  "Clarification load has lowered over long reuse.",
];

export function pickMailThreadSediment(age: WorldAgeStateId, dayKey: string): string {
  return lines[dailyIndex(dayKey + ":mail-thread-sed:" + age, lines.length)]!;
}
