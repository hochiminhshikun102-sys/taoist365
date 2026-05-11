import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Light behaves like a rented apartment: practical pools, not studio drama.",
  "Ceiling bounce is weak; most of what you read comes from the desk lamp and the screen.",
  "Afternoon thins the contrast on paper—no golden hour campaign, just a shorter reach.",
  "Night mode is mostly absence: the room lets the monitor be the brightest honest object.",
] as const;

export function pickQuietLightPhysicsLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:qlp:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
