import { dailyIndex } from "@/lib/living-day-key";

export type NaturalReturnRuntime = {
  returnState: "naturalDisappearance" | "calmReappearance" | "ordinaryAbsence" | "nonEventReturn" | "noEmotionalFraming";
  returnLine: string;
  absenceLine: string;
  suppressReturnRitual: boolean;
};

export function resolveNaturalReturnRuntime(dayKey: string): NaturalReturnRuntime {
  const h = dailyIndex(`${dayKey}:natural-return`, 100);
  const returnState =
    h < 20
      ? "naturalDisappearance"
      : h < 40
        ? "calmReappearance"
        : h < 60
          ? "ordinaryAbsence"
          : h < 80
            ? "nonEventReturn"
            : "noEmotionalFraming";

  return {
    returnState,
    returnLine:
      returnState === "naturalDisappearance"
        ? "Leaving can be as natural as closing a tab."
        : returnState === "calmReappearance"
          ? "Reappearing does not need a ceremony."
          : returnState === "ordinaryAbsence"
            ? "Ordinary absence belongs to normal life."
            : returnState === "nonEventReturn"
              ? "Return remains a non-event."
              : "No emotional framing is required for coming back.",
    absenceLine: "Leave, return, or forget it for a while; all of that is ordinary.",
    suppressReturnRitual: true,
  };
}
