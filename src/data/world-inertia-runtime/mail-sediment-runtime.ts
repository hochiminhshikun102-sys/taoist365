import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

const mailSedimentLines: readonly string[] = [
  "Mail threads now tend to be shorter by default.",
  "Repeated correspondence explains less each time.",
  "Some object threads no longer require full description.",
  "Reply rhythm is quieter, flatter, and more implied.",
];

export function pickMailSediment(age: WorldAgeStateId, dayKey: string): string {
  return mailSedimentLines[dailyIndex(dayKey + ":mail-sed:" + age, mailSedimentLines.length)]!;
}
