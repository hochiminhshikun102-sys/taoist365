import { dailyIndex } from "@/lib/living-day-key";

const INTERRUPTED: readonly string[] = [
  "Sentence stopped halfway—inbox won mid-thought.",
  "Drawer left open during another task—socks visible, shame ordinary.",
  "Incense forgotten midway—ash honest, lesson absent.",
  "Tea cooled before finishing—rim lower than intention.",
  "One shoe still near hallway—mate upstairs without narrative.",
  "Pan handle turned—oil cooled mid-sauté.",
  "Bookmark slid—page lost patience.",
  "Sponge drier than the sink—wash deferred without verdict.",
];

export function pickInterruptedRhythm(dayKey: string): string {
  return INTERRUPTED[dailyIndex(dayKey + ":int", INTERRUPTED.length)]!;
}
