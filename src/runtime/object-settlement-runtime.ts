import { dailyIndex } from "@/lib/living-day-key";

export type ObjectSettlementRuntime = {
  settlementState: "roomAdjusted" | "materialSettled" | "familiarPlacement" | "stillContinuity" | "quietBelonging";
  settlementLine: string;
  nonDisplayLine: string;
  reduceObjectForeground: boolean;
};

export function resolveObjectSettlementRuntime(dayKey: string): ObjectSettlementRuntime {
  const h = dailyIndex(`${dayKey}:object-settlement`, 100);
  const settlementState =
    h < 22
      ? "roomAdjusted"
      : h < 44
        ? "materialSettled"
        : h < 64
          ? "familiarPlacement"
          : h < 84
            ? "stillContinuity"
            : "quietBelonging";

  return {
    settlementState,
    settlementLine:
      settlementState === "roomAdjusted"
        ? "Objects adjust to the room before they become visible."
        : settlementState === "materialSettled"
          ? "Material silence settles where display pressure leaves."
          : settlementState === "familiarPlacement"
            ? "Familiar placement carries more continuity than explanation."
            : settlementState === "stillContinuity"
              ? "Stillness becomes the way the object continues."
              : "The object belongs quietly by being placed, not shown.",
    nonDisplayLine: "Windkeep objects are placed into the room, not presented to the room.",
    reduceObjectForeground: h > 56,
  };
}
