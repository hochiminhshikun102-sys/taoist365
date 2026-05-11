import { dailyIndex } from "@/lib/living-day-key";

const REMINDERS = [
  "Anti-performance: plain sentences beat self-aware quiet.",
  "Anti-performance: no digital monastery cosplay, no slow-web elitism.",
  "Anti-performance: if it sounds like it knows it is minimal, cut it.",
  "Anti-performance: ordinary room, ordinary browser—nothing auditioning for awards.",
] as const;

export function antiPerformanceReminder(dayKey: string): string {
  return REMINDERS[dailyIndex(`${dayKey}:anti-perf`, REMINDERS.length)] ?? REMINDERS[0];
}
