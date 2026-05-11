import { dailyIndex } from "@/lib/living-day-key";

export type DriftboxSparseRuntime = {
  sparseState: "emptyRoomInterval" | "rareAppearance" | "lowDensityContinuity" | "unresolvedQuiet";
  spacingLine: string;
  emptyRoomLine: string;
  allowHomepageTrace: boolean;
  suppressClaimSurface: boolean;
};

export function resolveDriftboxSparseRuntime(dayKey: string): DriftboxSparseRuntime {
  const h = dailyIndex(`${dayKey}:driftbox-sparse`, 100);
  const sparseState =
    h < 42 ? "emptyRoomInterval" : h < 58 ? "rareAppearance" : h < 82 ? "lowDensityContinuity" : "unresolvedQuiet";

  return {
    sparseState,
    spacingLine:
      sparseState === "emptyRoomInterval"
        ? "Driftbox is quiet today; absence is part of its climate."
        : sparseState === "rareAppearance"
          ? "One drift trace appears, then lets the room stay empty."
          : sparseState === "lowDensityContinuity"
            ? "Continuity stays low-density enough to avoid becoming a system."
            : "The waiting remains unresolved and almost off-page.",
    emptyRoomLine: "Sometimes nothing arrives; the empty room is the driftbox.",
    allowHomepageTrace: sparseState !== "emptyRoomInterval" && h % 3 !== 0,
    suppressClaimSurface: sparseState === "emptyRoomInterval" || sparseState === "unresolvedQuiet",
  };
}
