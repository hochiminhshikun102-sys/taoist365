import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { dailyIndex } from "@/lib/living-day-key";

const LINES = [
  "Physical silence: fabric softens motion; the chair stops announcing small shifts.",
  "Room absorbs sound the way cloth absorbs light—no echo story, just volume.",
  "Page weight: paper stacks sit heavier than their thickness suggests.",
  "Shelf stillness—objects agree to stop sliding when nobody is asking them to perform.",
  "Hallway distance reads as air thickness, not reverb.",
  "Low appliance hum underwrites the desk; you stop noticing until it pauses.",
] as const;

export function pickPhysicalSilenceLine(age: WorldAgeStateId, dayKey: string): string {
  const i = dailyIndex(`${dayKey}:phys-sil:${age}`, LINES.length);
  return LINES[i] ?? LINES[0];
}
