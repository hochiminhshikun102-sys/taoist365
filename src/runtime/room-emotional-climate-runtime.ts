import { dailyIndex } from "@/lib/living-day-key";

export type RoomEmotionalClimateRuntime = {
  climate: "warm" | "distant" | "rainy" | "quiet" | "unresolved" | "soft" | "nightLike" | "lightFilled";
  climateLine: string;
  airLine: string;
};

export function resolveRoomEmotionalClimateRuntime(dayKey: string): RoomEmotionalClimateRuntime {
  const climates = ["warm", "distant", "rainy", "quiet", "unresolved", "soft", "nightLike", "lightFilled"] as const;
  const climate = climates[dailyIndex(`${dayKey}:room-emotional-climate`, climates.length)];

  return {
    climate,
    climateLine:
      climate === "warm"
        ? "A warm room climate keeps the air close without asking for feeling."
        : climate === "distant"
          ? "A distant room climate leaves enough space around the person."
          : climate === "rainy"
            ? "A rainy room climate lets quiet gather near the window."
            : climate === "quiet"
              ? "A quiet room climate lowers the page until it becomes stayable."
              : climate === "unresolved"
                ? "An unresolved room climate keeps meaning open."
                : climate === "soft"
                  ? "A soft room climate lets tenderness remain unannounced."
                  : climate === "nightLike"
                    ? "A night-like room climate dims without switching modes."
                    : "A light-filled room climate makes ordinary dust visible.",
    airLine: "Emotion is air, not content.",
  };
}
