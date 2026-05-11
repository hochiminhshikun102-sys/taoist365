import { dailyIndex } from "@/lib/living-day-key";

export type DriftboxLowEventRuntime = {
  eventState:
    | "lowEventDrifting"
    | "unresolvedPassage"
    | "silentArrival"
    | "quietDisappearance"
    | "oceanicSilence"
    | "distantDrifting"
    | "sparseObjectTides";
  lowEventLine: string;
  transitionLine: string;
  oceanicLine: string;
  suppressEventLanguage: boolean;
};

export function resolveDriftboxLowEventRuntime(dayKey: string): DriftboxLowEventRuntime {
  const h = dailyIndex(`${dayKey}:driftbox-low-event`, 100);
  const eventState =
    h < 22
      ? "lowEventDrifting"
      : h < 42
        ? "unresolvedPassage"
        : h < 58
          ? "silentArrival"
          : h < 72
            ? "quietDisappearance"
            : h < 84
              ? "oceanicSilence"
              : h < 94
                ? "distantDrifting"
                : "sparseObjectTides";

  return {
    eventState,
    lowEventLine:
      eventState === "lowEventDrifting"
        ? "Drift continues without becoming an event."
        : eventState === "unresolvedPassage"
          ? "The passage remains unresolved and therefore quiet."
          : eventState === "silentArrival"
            ? "Arrival can happen without celebration."
            : eventState === "quietDisappearance"
              ? "Disappearance stays quiet enough to keep the room intact."
              : eventState === "oceanicSilence"
                ? "Driftbox stays quiet instead of becoming content."
                : eventState === "distantDrifting"
                  ? "Objects stay at a distance, away from foreground attention."
                  : "A few object notes move through without feed behavior.",
    transitionLine: "Driftbox transitions are non-celebratory: no announcement, no pressure.",
    oceanicLine: "An object may move on slowly, without needing a reply.",
    suppressEventLanguage: h > 36,
  };
}
