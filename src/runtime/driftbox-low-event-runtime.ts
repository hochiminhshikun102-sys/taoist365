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
                ? "Driftbox becomes oceanic silence rather than content flow."
                : eventState === "distantDrifting"
                  ? "Objects drift at a distance, beyond foreground attention."
                  : "Sparse object tides move through the atmosphere without feed behavior.",
    transitionLine: "Driftbox transitions are non-celebratory: no announcement, no pressure.",
    oceanicLine: "Long-wave continuity carries unresolved object migration like a quiet current.",
    suppressEventLanguage: h > 36,
  };
}
