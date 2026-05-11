import { dailyIndex } from "@/lib/living-day-key";

export type HumanAbsenceRuntime = {
  absenceState: "recentlyLeft" | "chairSilence" | "afterPresence" | "stillAir";
  absenceLine: string;
  afterPresenceLine: string;
  reduceHumanCentrality: boolean;
};

export function resolveHumanAbsenceRuntime(dayKey: string): HumanAbsenceRuntime {
  const h = dailyIndex(`${dayKey}:human-absence`, 100);
  const absenceState = h < 28 ? "recentlyLeft" : h < 54 ? "chairSilence" : h < 78 ? "afterPresence" : "stillAir";

  return {
    absenceState,
    absenceLine:
      absenceState === "recentlyLeft"
        ? "Someone seems recently gone, but the page is not waiting for them."
        : absenceState === "chairSilence"
          ? "The chair is quiet; human presence has moved out of the center."
          : absenceState === "afterPresence"
            ? "After-presence stays as warmth without becoming a relationship cue."
            : "Still air keeps human residue without human centralization.",
    afterPresenceLine: "Someone came through; now the room continues on its own.",
    reduceHumanCentrality: h > 46,
  };
}
