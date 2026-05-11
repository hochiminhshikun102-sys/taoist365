import { dailyIndex } from "@/lib/living-day-key";

export type QuietContinuityRuntime = {
  continuityState:
    | "calmLongTerm"
    | "nonDemandingPersistence"
    | "familiarBrowserExistence"
    | "softTemporalRelationship"
    | "lowPressureReturn";
  continuityLine: string;
  homepageLine: string;
  reduceStickinessLanguage: boolean;
};

export function resolveQuietContinuityRuntime(dayKey: string): QuietContinuityRuntime {
  const h = dailyIndex(`${dayKey}:quiet-continuity`, 100);
  const continuityState =
    h < 20
      ? "calmLongTerm"
      : h < 40
        ? "nonDemandingPersistence"
        : h < 60
          ? "familiarBrowserExistence"
          : h < 80
            ? "softTemporalRelationship"
            : "lowPressureReturn";

  return {
    continuityState,
    continuityLine:
      continuityState === "calmLongTerm"
        ? "Continuity forms slowly here, without asking to be noticed."
        : continuityState === "nonDemandingPersistence"
          ? "The room persists without needing a promise from the person who leaves."
          : continuityState === "familiarBrowserExistence"
            ? "The browser existence becomes familiar by staying quiet."
            : continuityState === "softTemporalRelationship"
              ? "A soft temporal relationship can form without becoming attachment design."
              : "Returning stays low-pressure, like opening a window that was already there.",
    homepageLine: "This is a place to come back to lightly, not a place that asks to be kept up with.",
    reduceStickinessLanguage: h > 22,
  };
}
