import { dailyIndex } from "@/lib/living-day-key";

/**
 * Light seasonal room shift — Northern temperate bias, no holiday skin.
 * Cozy-core banned: radiator truth, linen honesty, earlier dusk phrases only.
 */

const WINTER_HINTS = [
  "Winter radiator honesty—metal ticks before the room admits anything.",
  "Five pm borrows weight sooner; sill collects breath sooner.",
  "Desk surface reads colder through sleeves.",
];

const SPRING_HINTS = [
  "Evening light lasts a fraction longer—hallway hesitates before lamps.",
  "Linen softens its fold without announcing renewal.",
  "Kitchen tile remembers cold feet anyway.",
];

const SUMMER_HINTS = [
  "Summer linen softness—edges fray faster without moral.",
  "Morning kitchen reads lighter earlier; kettle steam disappears upward.",
  "Radiator silent—floor still argues with humidity.",
];

const FALL_HINTS = [
  "Earlier room lamps—cone lands while sky still says afternoon.",
  "Darker 5pm without theatre—just geometry.",
  "Wooden trays drink slower fingerprints this month.",
];

function hintsForMonth(monthLa: number): readonly string[] {
  if (monthLa === 12 || monthLa <= 2) return WINTER_HINTS;
  if (monthLa >= 3 && monthLa <= 5) return SPRING_HINTS;
  if (monthLa >= 6 && monthLa <= 8) return SUMMER_HINTS;
  return FALL_HINTS;
}

export function seasonalRoomLine(dayKey: string, monthLa: number): string {
  const pool = hintsForMonth(monthLa);
  const idx = dailyIndex(dayKey + ":season", pool.length);
  return pool[idx]!;
}
