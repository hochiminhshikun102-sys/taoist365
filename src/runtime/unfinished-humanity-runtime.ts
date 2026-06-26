import { dailyIndex } from "@/lib/living-day-key";

export type UnfinishedHumanityRuntime = {
  unfinishedState:
    | "unresolvedContinuity"
    | "unfinishedTrace"
    | "incompleteRoomStory"
    | "imperfectionPersistence"
    | "gentleIncompletion";
  unfinishedLine: string;
  nonFinalLine: string;
  allowIncompletion: boolean;
};

export function resolveUnfinishedHumanityRuntime(dayKey: string): UnfinishedHumanityRuntime {
  const h = dailyIndex(`${dayKey}:unfinished-humanity`, 100);
  const unfinishedState =
    h < 22
      ? "unresolvedContinuity"
      : h < 42
        ? "unfinishedTrace"
        : h < 62
          ? "incompleteRoomStory"
          : h < 82
            ? "imperfectionPersistence"
            : "gentleIncompletion";

  return {
    unfinishedState,
    unfinishedLine:
      unfinishedState === "unresolvedContinuity"
        ? "Continuity remains unresolved and still allowed."
        : unfinishedState === "unfinishedTrace"
          ? "An unfinished trace stays in the room without needing closure."
          : unfinishedState === "incompleteRoomStory"
            ? "The room story remains incomplete, which keeps it human."
            : unfinishedState === "imperfectionPersistence"
              ? "Quiet imperfection persists without apology."
              : "Gentle incompletion lets people remain unfinished too.",
    nonFinalLine: "Dohara does not provide completion; it allows not being finished.",
    allowIncompletion: h > 12,
  };
}
