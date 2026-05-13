import { dailyIndex } from "@/lib/living-day-key";

export type WarmSilenceRuntime = {
  warmthState: "inhabitedSilence" | "lateNightWarmth" | "roomComfort" | "gentleStillness" | "familiarSilence";
  warmSilenceLine: string;
  comfortLine: string;
  preventColdSilence: boolean;
};

export function resolveWarmSilenceRuntime(dayKey: string): WarmSilenceRuntime {
  const h = dailyIndex(`${dayKey}:warm-silence`, 100);
  const warmthState =
    h < 22
      ? "inhabitedSilence"
      : h < 42
        ? "lateNightWarmth"
        : h < 62
          ? "roomComfort"
          : h < 82
            ? "gentleStillness"
            : "familiarSilence";

  return {
    warmthState,
    warmSilenceLine:
      warmthState === "inhabitedSilence"
        ? "Silence feels inhabited, not empty."
        : warmthState === "lateNightWarmth"
          ? "Late-night warmth keeps the quiet from becoming cold."
          : warmthState === "roomComfort"
            ? "The room is quiet in a way that lets someone stay a little longer."
            : warmthState === "gentleStillness"
              ? "Gentle stillness carries warmth without explaining it."
              : "Familiar silence makes the browser room feel used and safe to leave open.",
    comfortLine: "Reverent Inquiry stays calm without becoming cold.",
    preventColdSilence: h > 20,
  };
}
