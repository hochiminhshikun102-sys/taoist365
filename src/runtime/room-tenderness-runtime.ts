import { dailyIndex } from "@/lib/living-day-key";

export type RoomTendernessRuntime = {
  tendernessState:
    | "chairSideTenderness"
    | "foldedFabricWarmth"
    | "steamSoftenedAir"
    | "rainAfterQuietness"
    | "objectRestSoftness";
  tendernessLine: string;
  hallTendernessLine: string;
  softenHallTone: boolean;
};

export function resolveRoomTendernessRuntime(dayKey: string): RoomTendernessRuntime {
  const h = dailyIndex(`${dayKey}:room-tenderness`, 100);
  const tendernessState =
    h < 22
      ? "chairSideTenderness"
      : h < 42
        ? "foldedFabricWarmth"
        : h < 62
          ? "steamSoftenedAir"
          : h < 82
            ? "rainAfterQuietness"
            : "objectRestSoftness";

  return {
    tendernessState,
    tendernessLine:
      tendernessState === "chairSideTenderness"
        ? "Chair-side tenderness makes the room feel recently used."
        : tendernessState === "foldedFabricWarmth"
          ? "Folded fabric warmth sits quietly beside the hall air."
          : tendernessState === "steamSoftenedAir"
            ? "Steam-softened air gives the page a small human temperature."
            : tendernessState === "rainAfterQuietness"
              ? "Rain-after quietness makes the hall easier to remain in."
              : "Object-rest softness lets the room be gentle without speaking.",
    hallTendernessLine: "A quiet hall can be tender without becoming sentimental.",
    softenHallTone: h > 26,
  };
}
