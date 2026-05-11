import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "./world-age-state";

const roomDustLines: readonly string[] = [
  "A shelf looks untouched for longer than expected.",
  "One stack has stayed unchanged for several cycles.",
  "Paper edge curl keeps its angle.",
  "The lamp remains there, switched on earlier than the room.",
  "The same mug ring keeps returning under new pours.",
  "A corner still carries older room weather.",
];

export function pickRoomDustLine(age: WorldAgeStateId, dayKey: string): string {
  return roomDustLines[dailyIndex(dayKey + ":dust:" + age, roomDustLines.length)]!;
}
