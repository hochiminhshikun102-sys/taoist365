import { dailyIndex } from "@/lib/living-day-key";
import { firstQuietCivilizationRoomSeeds } from "@/runtime/quiet-room-seeds";

export type RoomRitualRuntime = {
  ritualSeed: (typeof firstQuietCivilizationRoomSeeds)[number];
  ritualLine: string;
  repetitionLine: string;
  suppressGameLoop: boolean;
};

export function resolveRoomRitualRuntime(dayKey: string): RoomRitualRuntime {
  const h = dailyIndex(`${dayKey}:room-ritual`, 100);
  const ritualSeed = firstQuietCivilizationRoomSeeds[dailyIndex(`${dayKey}:room-ritual-seed`, firstQuietCivilizationRoomSeeds.length)];

  return {
    ritualSeed,
    ritualLine: `${ritualSeed.name}: ${ritualSeed.gesture}.`,
    repetitionLine:
      h < 34
        ? "Repeated soft gestures stay ordinary."
        : h < 68
          ? "Atmospheric interaction remains a light action, not a mechanic."
          : "Non-game repetition lets continuity become familiar.",
    suppressGameLoop: h > 14,
  };
}
