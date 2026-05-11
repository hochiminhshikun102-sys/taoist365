import { dailyIndex } from "@/lib/living-day-key";

export type DailySedimentRuntime = {
  sedimentState: "deskSideTrace" | "foldedPaper" | "windowStillness" | "repeatedGesture" | "browserLivedAir";
  sedimentLine: string;
  ordinaryTraceLine: string;
  thinAestheticProps: boolean;
  preferSmallTrace: boolean;
};

export function resolveDailySedimentRuntime(dayKey: string): DailySedimentRuntime {
  const h = dailyIndex(`${dayKey}:daily-sediment`, 100);
  const sedimentState =
    h < 20
      ? "deskSideTrace"
      : h < 40
        ? "foldedPaper"
        : h < 60
          ? "windowStillness"
          : h < 80
            ? "repeatedGesture"
            : "browserLivedAir";

  return {
    sedimentState,
    sedimentLine:
      sedimentState === "deskSideTrace"
        ? "There is a desk-side trace here, ordinary enough to be almost missed."
        : sedimentState === "foldedPaper"
          ? "A folded-paper calm sits under the room, not as decoration, just as use."
          : sedimentState === "windowStillness"
            ? "Window-side stillness keeps the page from trying too hard."
            : sedimentState === "repeatedGesture"
              ? "A repeated small gesture has made the room slightly familiar."
              : "The browser carries lived air, the kind that gathers slowly over a day.",
    ordinaryTraceLine: "Small daily traces matter more here than styled atmosphere.",
    thinAestheticProps: h > 34,
    preferSmallTrace: h < 88,
  };
}
