import { dailyIndex } from "@/lib/living-day-key";
import { firstQuietCivilizationRoomSeeds } from "@/runtime/quiet-room-seeds";

export type RoomIdentityRuntime = {
  activeSeed: (typeof firstQuietCivilizationRoomSeeds)[number];
  identityLine: string;
  temperamentLine: string;
  spatialMoodLine: string;
};

export function resolveRoomIdentityRuntime(dayKey: string): RoomIdentityRuntime {
  const index = dailyIndex(`${dayKey}:room-identity`, firstQuietCivilizationRoomSeeds.length);
  const activeSeed = firstQuietCivilizationRoomSeeds[index];

  return {
    activeSeed,
    identityLine: `${activeSeed.name} carries ${activeSeed.atmosphere}.`,
    temperamentLine: `Its silence temperament is ${activeSeed.temperament}, not interchangeable with another room.`,
    spatialMoodLine: activeSeed.continuityTrace,
  };
}
