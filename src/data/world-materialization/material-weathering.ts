import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";
import { worldAgeStateMap } from "@/data/world-aging-runtime/world-age-state";
import { dailyIndex } from "@/lib/living-day-key";

const LIGHT_LANG = {
  young: [
    "Window light still reads a little sharp on the desk edge—new tab, new season.",
    "Daylight catches dust slower than it will later; the room still answers quickly.",
  ],
  mid: [
    "Light now lands flatter; corners hold a little more grey before noon.",
    "The same window reads thinner—less bounce off the sill, more soak into paper.",
  ],
  old: [
    "Brightness has stepped down a notch; the monitor rim and mug ring share the same tired gleam.",
    "Even midday feels like it has to lean in—the room keeps light instead of flashing it.",
  ],
} as const;

const SURFACE = {
  young: [
    "Surfaces still forgive fingerprints; oil and tea lift off with an ordinary wipe.",
    "Laminate and wood read closer to new—edges still speak before stains do.",
  ],
  mid: [
    "The desk shows where elbows rest; varnish has gone satin in those ovals.",
    "Keyboard shine follows the home row honestly—no story, just repetition.",
  ],
  old: [
    "Tray metal has gone quiet—not rust, just a dull where thumbs stopped counting.",
    "Paper near the keyboard carries a permanent soft curl from being opened the same way.",
  ],
} as const;

const PAPER = {
  young: ["Paper still snaps clean at the corner when you lift it.", "Fold lines are sharp; fibers haven’t relaxed yet."],
  mid: ["Paper fibers have softened; corners round instead of chip.", "Sheets stack with a slight wave—humidity, not drama."],
  old: [
    "Margins carry a grey lift where thumbs checked the same paragraph too often.",
    "The spine of the notebook cups open on its own—gravity, not styling.",
  ],
} as const;

const ROOM_DENSITY = {
  young: ["Air still feels thin and quick—heat hasn’t banked in the walls yet.", "The room clears fast after cooking; nothing lingers past the hour."],
  mid: ["Air carries a little more weight after dark—dryer week or humid afternoon, pick one.", "Hallway draught meets kitchen warmth halfway down the hall."],
  old: ["The room holds temperature like cloth—slow to warm, slow to give it back.", "Air near the shelf tastes like paper and last week’s tea—ordinary, settled."],
} as const;

const RESIDUE = {
  young: ["Residue is still thin—mostly dust you can name.", "Only a few edges show where hands have repeated a task."],
  mid: ["Residue is honest: cup rings, pen stops, a faint keyboard fog.", "Dust lines follow objects, not styling—where things actually sat."],
  old: ["Residue stacks in layers you stop narrating—just lived thickness.", "The desk remembers tasks you forgot you repeated."],
} as const;

function ageBucket(age: WorldAgeStateId): "young" | "mid" | "old" {
  const w = worldAgeStateMap[age].stillnessWeight;
  if (w < 0.4) return "young";
  if (w < 0.58) return "mid";
  return "old";
}

function pick<T extends readonly string[]>(pool: T, dayKey: string, salt: string): string {
  const arr = pool as unknown as string[];
  const i = dailyIndex(`${dayKey}:${salt}`, arr.length);
  return arr[i] ?? arr[0];
}

export type MaterialWeatheringSlice = {
  lightLanguage: string;
  surfaceState: string;
  paperFeel: string;
  roomDensity: string;
  residueThickness: string;
};

export function resolveMaterialWeathering(age: WorldAgeStateId, dayKey: string): MaterialWeatheringSlice {
  const b = ageBucket(age);
  return {
    lightLanguage: pick(LIGHT_LANG[b], dayKey, "mw-light"),
    surfaceState: pick(SURFACE[b], dayKey, "mw-surf"),
    paperFeel: pick(PAPER[b], dayKey, "mw-paper"),
    roomDensity: pick(ROOM_DENSITY[b], dayKey, "mw-room"),
    residueThickness: pick(RESIDUE[b], dayKey, "mw-res"),
  };
}
