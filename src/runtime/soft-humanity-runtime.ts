import { dailyIndex } from "@/lib/living-day-key";

export type SoftHumanityRuntime = {
  humanityState:
    | "offFrame"
    | "recentlyLived"
    | "chairSide"
    | "deskEdge"
    | "longGone"
    | "foldedFabric"
    | "roomUsedSilence"
    | "distantResidue";
  humanityLine: string;
  sandongResidueLine: string;
  warmthWithoutPresenceLine: string;
  reducePersonCentering: boolean;
};

export function resolveSoftHumanityRuntime(dayKey: string): SoftHumanityRuntime {
  const h = dailyIndex(`${dayKey}:soft-humanity`, 100);
  const humanityState =
    h < 14
      ? "offFrame"
      : h < 28
        ? "recentlyLived"
        : h < 42
          ? "chairSide"
          : h < 56
            ? "deskEdge"
            : h < 70
              ? "foldedFabric"
              : h < 84
                ? "roomUsedSilence"
                : h < 94
                  ? "distantResidue"
                  : "longGone";

  return {
    humanityState,
    humanityLine:
      humanityState === "offFrame"
        ? "Humanity stays off-frame, present through room warmth."
        : humanityState === "recentlyLived"
          ? "The space feels recently lived in without introducing a character."
          : humanityState === "chairSide"
            ? "Chair-side silence holds a human trace after the person has left."
            : humanityState === "deskEdge"
              ? "Desk-edge traces keep the room human but uncentered."
              : humanityState === "foldedFabric"
                ? "Recently folded fabric keeps warmth in the room without a person."
                : humanityState === "roomUsedSilence"
                  ? "Room-used silence carries human scale without becoming a role."
                  : humanityState === "distantResidue"
                    ? "Distant humanity residue remains as temperature, not character."
                    : "Long-gone continuity remains as air, not personality.",
    sandongResidueLine: "Master Sandong remains residue presence only: writing, table, air, and distance.",
    warmthWithoutPresenceLine: "Human warmth stays in fabric, chair, desk air, and distance.",
    reducePersonCentering: h > 32,
  };
}
