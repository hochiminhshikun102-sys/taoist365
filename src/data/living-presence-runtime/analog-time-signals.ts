import { dailyIndex } from "@/lib/living-day-key";

/**
 * Analog internet time — environmental, not “last seen”.
 * Optional local hour biases phrasing (browser clock).
 */

const BASE_SIGNALS = [
  "Same hostname through several evenings—browser remembers; this server does not.",
  "Tab stayed open overnight; scroll position ordinary debt.",
  "Brightness lowered before the room agreed—glass first, walls later.",
  "History repeats the path; nobody scores returns.",
  "Pinned tab older than the paragraph beside it.",
  "Bookmark bar gathers dust faster than subscriptions.",
  "Phone dimmed before eyes admitted fatigue.",
  "Lamp turned on earlier this week—cone landed before hunger.",
  "Hallway quieter lately—fewer doors borrowed sound.",
  "Keyboard quieter after midnight—same switches, thinner urgency.",
];

const NIGHT_BIAS = [
  "Street noise thinned after midnight—cursor still rude.",
  "Browser chrome darker before the apartment conceded night.",
];

const MORNING_BIAS = [
  "Kettle noise arrives before inbox courage.",
  "Tab light cooler than kitchen light—same hour.",
];

export function pickAnalogTimeSignal(dayKey: string, localHour: number): string {
  const pool =
    localHour >= 22 || localHour < 5
      ? [...BASE_SIGNALS, ...NIGHT_BIAS]
      : localHour < 11
        ? [...BASE_SIGNALS, ...MORNING_BIAS]
        : BASE_SIGNALS;
  const idx = dailyIndex(dayKey + ":analog+" + localHour, pool.length);
  return pool[idx]!;
}
