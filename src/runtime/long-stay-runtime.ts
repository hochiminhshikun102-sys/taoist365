import { dailyIndex } from "@/lib/living-day-key";

export type LongStayRuntime = {
  stayState: "passiveComfort" | "quietReturnability" | "lowInteractionPersistence" | "longOpenFamiliarity";
  longStayLine: string;
  companionshipWithoutCompanionLine: string;
  reduceAttentionRequest: boolean;
};

export function resolveLongStayRuntime(dayKey: string): LongStayRuntime {
  const h = dailyIndex(`${dayKey}:long-stay`, 100);
  const stayState =
    h < 28 ? "passiveComfort" : h < 54 ? "quietReturnability" : h < 78 ? "lowInteractionPersistence" : "longOpenFamiliarity";

  return {
    stayState,
    longStayLine:
      stayState === "passiveComfort"
        ? "Long stay becomes passive comfort without asking to be noticed."
        : stayState === "quietReturnability"
          ? "The room remains returnable even after attention has left."
          : stayState === "lowInteractionPersistence"
            ? "Low-interaction persistence is enough for the page to continue."
            : "Long-open familiarity replaces any need for engagement.",
    companionshipWithoutCompanionLine: "The browser room can keep company without becoming a companion.",
    reduceAttentionRequest: h > 30,
  };
}
