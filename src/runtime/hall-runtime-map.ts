/**
 * Quiet hall directions - browser civilization routing, not app navigation.
 */

import { firstQuietCivilizationRoomSeeds } from "@/runtime/quiet-room-seeds";

export const quietHallDirections = [
  "A line for later",
  "A page by the window",
  "A quiet note",
  "A small story",
  "Something half-made",
  "Windkeep shelf",
] as const;

export const quietCivilizationRoomDirections = firstQuietCivilizationRoomSeeds.map((room) => room.name);
