import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const permanenceLines = [
  "The object stopped returning to the drawer and became part of room flow.",
  "Placement has stabilized long enough to feel structural.",
  "The piece now persists as geometry, not choice.",
  "It remains in place across multiple page climates.",
];

export function pickObjectPermanence(age: WorldAgeStateId, dayKey: string): string {
  return permanenceLines[dailyIndex(dayKey + ":obj-perm:" + age, permanenceLines.length)]!;
}
