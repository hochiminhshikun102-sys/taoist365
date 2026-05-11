/**
 * Quiet hall directions - browser civilization routing, not app navigation.
 */

import { firstQuietCivilizationRoomSeeds } from "@/runtime/quiet-room-seeds";

export const quietHallDirections = [
  "Philosophy Hall",
  "Five Elements Hall",
  "Quiet Hall",
  "Story Hall",
  "Creation Hall",
  "Windkeep Hall",
] as const;

export const quietCivilizationRoomDirections = firstQuietCivilizationRoomSeeds.map((room) => room.name);
