import { dailyIndex } from "@/lib/living-day-key";

export const ANTI_OVERDESIGN_FORBIDDEN = [
  "stacking too many atmosphere paragraphs",
  "letting every runtime speak at full volume the same day",
  "beautiful residue as a goal",
  "emotional intelligence theater",
] as const;

export function antiOverdesignAuditLine(dayKey: string): string {
  const i = dailyIndex(`${dayKey}:anti-overdesign`, 4);
  const audits = [
    "Anti-overdesign: if it feels curated for awe, it gets cut.",
    "Anti-overdesign: one room voice at a time—no chorus of clever residues.",
    "Anti-overdesign: plain beats impressive when plain is true.",
    "Anti-overdesign: Taoist365 stays ordinary on purpose.",
  ] as const;
  return audits[i] ?? audits[0];
}
