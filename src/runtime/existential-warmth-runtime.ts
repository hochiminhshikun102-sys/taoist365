import { dailyIndex } from "@/lib/living-day-key";

export type ExistentialWarmthRuntime = {
  warmthState:
    | "quietLifeWarmth"
    | "ordinaryTenderness"
    | "stillBeingHere"
    | "continuityComfort"
    | "gentleExistenceCalm";
  existentialWarmthLine: string;
  nonTherapyLine: string;
  preventTherapyTone: boolean;
};

export function resolveExistentialWarmthRuntime(dayKey: string): ExistentialWarmthRuntime {
  const h = dailyIndex(`${dayKey}:existential-warmth`, 100);
  const warmthState =
    h < 22
      ? "quietLifeWarmth"
      : h < 42
        ? "ordinaryTenderness"
        : h < 62
          ? "stillBeingHere"
          : h < 82
            ? "continuityComfort"
            : "gentleExistenceCalm";

  return {
    warmthState,
    existentialWarmthLine:
      warmthState === "quietLifeWarmth"
        ? "Quiet life warmth makes ordinary existence a little lighter."
        : warmthState === "ordinaryTenderness"
          ? "Ordinary existence carries tenderness without advice."
          : warmthState === "stillBeingHere"
            ? "Late-night still-being-here feeling remains small and non-dramatic."
            : warmthState === "continuityComfort"
              ? "Small continuity comfort lets the browser room keep breathing."
              : "Gentle existence calmness stays below the level of doctrine.",
    nonTherapyLine: "Taoist365 does not solve life; it only lets existence feel slightly less heavy.",
    preventTherapyTone: h > 20,
  };
}
