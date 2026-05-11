import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "./world-age-state";

const sedimentByAge: Record<WorldAgeStateId, readonly string[]> = {
  "newly-settled": [
    "Some wording still shifts, but one corner already stopped changing.",
    "A small link has stayed where it was longer than expected.",
  ],
  "quietly-lived-in": [
    "One section has carried the same room weather for a while.",
    "A few links became background before anyone noticed.",
  ],
  "heavy-air-season": [
    "Some corners stopped changing months ago.",
    "One old sentence still sits where newer ones pass around it.",
  ],
  "slow-drift-month": [
    "This wording has not moved for a long while.",
    "A quiet fragment keeps returning without announcing itself.",
  ],
  "long-static-period": [
    "Some pages stayed quieter than expected.",
    "A shelf line has not rotated in what feels like longer than a season.",
  ],
  "late-year-room": [
    "One paragraph reads older, not wrong.",
    "A side note has thinned to almost nothing and remained there.",
  ],
  "old-browser-period": [
    "A few sections feel like they have been open for weeks.",
    "The same tab logic survived multiple late-night periods.",
  ],
  "worn-in-cycle": [
    "Several phrases have gone background and stopped asking to be read.",
    "Some corners are old enough to feel structural now.",
  ],
};

export function pickSedimentLine(age: WorldAgeStateId, dayKey: string): string {
  const pool = sedimentByAge[age];
  return pool[dailyIndex(dayKey + ":sed:" + age, pool.length)]!;
}
