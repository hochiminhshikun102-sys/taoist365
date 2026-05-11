import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const permanenceLines = [
  "Tray now reads as table edge behavior.",
  "Linen behaves like room fabric, not object detail.",
  "Mug sits at default reach and remains there.",
  "Notebook now functions as quiet desk weight.",
];

export function pickObjectRoomPermanence(age: WorldAgeStateId, dayKey: string): string {
  return permanenceLines[dailyIndex(dayKey + ":obj-room-perm:" + age, permanenceLines.length)]!;
}
