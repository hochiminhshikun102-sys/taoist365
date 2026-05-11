import { dailyIndex } from "@/lib/living-day-key";

export type InvisibleCommerceRuntime = {
  commerceState:
    | "belowSurface"
    | "stewardshipSupport"
    | "passageContribution"
    | "nonTransactionalClimate"
    | "quietObjectTransfer"
    | "calmValueMovement"
    | "warmObjectTransfer"
    | "appreciationExchange"
    | "humanScaleValueFlow";
  commerceLine: string;
  stewardshipLine: string;
  nonEventCommerceLine: string;
  gentlePassageLine: string;
  keepCommerceInvisible: boolean;
  suppressTransactionExcitement: boolean;
};

export function resolveInvisibleCommerceRuntime(dayKey: string): InvisibleCommerceRuntime {
  const h = dailyIndex(`${dayKey}:invisible-commerce`, 100);
  const commerceState =
    h < 18
      ? "belowSurface"
      : h < 36
        ? "stewardshipSupport"
        : h < 54
          ? "passageContribution"
          : h < 72
            ? "nonTransactionalClimate"
            : h < 82
              ? "quietObjectTransfer"
              : h < 90
                ? "calmValueMovement"
                : h < 95
                  ? "warmObjectTransfer"
                  : h < 98
                    ? "appreciationExchange"
                    : "humanScaleValueFlow";

  return {
    commerceState,
    commerceLine:
      commerceState === "belowSurface"
        ? "Commerce exists below the room surface."
        : commerceState === "stewardshipSupport"
          ? "A quiet stewardship contribution supports object passage without standing in front."
          : commerceState === "passageContribution"
            ? "Exchange continuity remains low-pressure and non-performative."
            : commerceState === "nonTransactionalClimate"
              ? "Transfer climate stays non-transactional from the visible room."
              : commerceState === "quietObjectTransfer"
                ? "Object transfer happens quietly, below transaction excitement."
                : commerceState === "calmValueMovement"
                  ? "Value moves calmly through stewardship, not purchase dopamine."
                  : commerceState === "warmObjectTransfer"
                    ? "Warm object transfer feels like time passing between people."
                    : commerceState === "appreciationExchange"
                      ? "Quiet appreciation exchange stays human-scale and non-competitive."
                      : "Value flows gently through people and time, not platform urgency.",
    stewardshipLine: "The stewardship fee belongs to infrastructure, not the foreground.",
    nonEventCommerceLine: "Commerce remains a non-event: silent support for continued passage.",
    gentlePassageLine: "Object circulation is a gentle passage between people and time.",
    keepCommerceInvisible: h > 18,
    suppressTransactionExcitement: h > 30,
  };
}
