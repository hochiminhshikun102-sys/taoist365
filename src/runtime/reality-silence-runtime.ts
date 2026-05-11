import { dailyIndex } from "@/lib/living-day-key";

export type RealitySilenceRuntime = {
  silenceState: "practicalCalmness" | "ordinarySilence" | "nonSacredStillness" | "livedQuietness" | "realWorldCompatible";
  silenceLine: string;
  calmLine: string;
  suppressSpiritualSilence: boolean;
};

export function resolveRealitySilenceRuntime(dayKey: string): RealitySilenceRuntime {
  const h = dailyIndex(`${dayKey}:reality-silence`, 100);
  const silenceState =
    h < 20
      ? "practicalCalmness"
      : h < 40
        ? "ordinarySilence"
        : h < 60
          ? "nonSacredStillness"
          : h < 80
            ? "livedQuietness"
            : "realWorldCompatible";

  return {
    silenceState,
    silenceLine:
      silenceState === "practicalCalmness"
        ? "Calmness stays practical."
        : silenceState === "ordinarySilence"
          ? "Silence is ordinary, not elevated."
          : silenceState === "nonSacredStillness"
            ? "Stillness does not need to become sacred."
            : silenceState === "livedQuietness"
              ? "Lived quietness fits beside normal noise."
              : "The atmosphere remains compatible with the real world.",
    calmLine: "Quiet should help the day continue, not pull it out of reality.",
    suppressSpiritualSilence: true,
  };
}
