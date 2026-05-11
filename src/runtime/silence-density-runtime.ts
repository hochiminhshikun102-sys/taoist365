import { dailyIndex } from "@/lib/living-day-key";

export type SilenceDensityKind =
  | "lightSilence"
  | "warmSilence"
  | "distantSilence"
  | "unresolvedSilence"
  | "inhabitedSilence"
  | "nearEmptySilence"
  | "lateNightSilence"
  | "preDawnSilence";

export type SilenceDensityRuntime = {
  density: SilenceDensityKind;
  silenceLine: string;
  infrastructureLine: string;
  preferNearEmptySurface: boolean;
};

export function resolveSilenceDensityRuntime(dayKey: string, now: Date = new Date()): SilenceDensityRuntime {
  const h = dailyIndex(`${dayKey}:silence-density`, 100);
  const hour = now.getHours();
  const density: SilenceDensityKind =
    hour < 5
      ? "preDawnSilence"
      : hour >= 23
        ? "lateNightSilence"
        : h < 14
          ? "lightSilence"
          : h < 28
            ? "warmSilence"
            : h < 42
              ? "distantSilence"
              : h < 58
                ? "unresolvedSilence"
                : h < 74
                  ? "inhabitedSilence"
                  : "nearEmptySilence";

  return {
    density,
    silenceLine:
      density === "preDawnSilence"
        ? "Pre-dawn silence is almost empty and still inhabited by air."
        : density === "lateNightSilence"
          ? "Late-night silence lowers the whole browser room."
          : density === "warmSilence"
            ? "Warm silence holds human residue without asking for response."
            : density === "unresolvedSilence"
              ? "Unresolved silence remains open but does not call attention."
              : "Silence acts as structure, not decoration.",
    infrastructureLine: "Silence density is infrastructure: it decides how much the room can carry.",
    preferNearEmptySurface: density === "nearEmptySilence" || density === "preDawnSilence" || h > 82,
  };
}
