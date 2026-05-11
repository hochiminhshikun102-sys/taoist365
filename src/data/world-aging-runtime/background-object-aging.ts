import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "./world-age-state";

const objectBackgroundByAge: Record<WorldAgeStateId, readonly string[]> = {
  "newly-settled": [
    "The tray still reads as an object, but starts behaving like furniture.",
    "The mug still stands out, though less than last month.",
  ],
  "quietly-lived-in": [
    "The linen is no longer noticed first; it is just part of the chair now.",
    "The tray has become default geometry near the keys.",
  ],
  "heavy-air-season": [
    "The notebook carries background weight more than attention.",
    "The cup now works as a coordinate, not a feature.",
  ],
  "slow-drift-month": [
    "Objects explain themselves less and hold position more.",
    "Several pieces have shifted from spotlight to infrastructure.",
  ],
  "long-static-period": [
    "The tray is now room structure before it is an object.",
    "The mug ring remained while the mug became ordinary.",
  ],
  "late-year-room": [
    "The linen edge has faded into default movement patterns.",
    "The notebook no longer asks to be opened to be present.",
  ],
  "old-browser-period": [
    "The object layer feels older than the page copy.",
    "Some pieces now persist mostly as placement memory.",
  ],
  "worn-in-cycle": [
    "Most objects are now environment first, item second.",
    "The room remembers placement before names.",
  ],
};

export function pickBackgroundObjectAging(age: WorldAgeStateId, dayKey: string): string {
  const pool = objectBackgroundByAge[age];
  return pool[dailyIndex(dayKey + ":obj-bg:" + age, pool.length)]!;
}
