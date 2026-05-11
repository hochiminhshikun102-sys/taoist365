import { dailyIndex } from "@/lib/living-day-key";

/**
 * Weak shelf drift — rotate order by day, no carousel, no animation.
 * Apply before atmosphere prefers one item forward.
 */

export function applySlowShelfDrift<T extends { id: string }>(
  items: readonly T[],
  dayKey: string,
): T[] {
  if (items.length < 2) return [...items];
  const offset = dailyIndex(dayKey + ":shelf-drift", items.length);
  return [...items.slice(offset), ...items.slice(0, offset)];
}
