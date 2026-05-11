import type { WorldAgeStateId } from "@/data/world-aging-runtime/world-age-state";

export function stillnessDeepeningLine(age: WorldAgeStateId): string {
  const deep = age === "long-static-period" || age === "late-year-room" || age === "old-browser-period" || age === "worn-in-cycle";
  if (deep) return "Stillness deepens: fewer moving sentences, same rooms.";
  return "Stillness accrues slowly with age state—no sudden “quiet mode” switch.";
}
