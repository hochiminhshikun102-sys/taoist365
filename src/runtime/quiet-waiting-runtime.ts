import { dailyIndex } from "@/lib/living-day-key";

export type QuietWaitingRuntime = {
  waitingState: "restingPassage" | "openDrift" | "nextKeeperAbsent" | "unresolvedContinuity";
  waitingLine: string;
  absenceLine: string;
  homepageWaitingFragment: string;
  reduceClaimLanguage: boolean;
};

export function resolveQuietWaitingRuntime(dayKey: string): QuietWaitingRuntime {
  const h = dailyIndex(`${dayKey}:quiet-waiting`, 100);
  const waitingState =
    h < 26 ? "restingPassage" : h < 52 ? "openDrift" : h < 76 ? "nextKeeperAbsent" : "unresolvedContinuity";

  return {
    waitingState,
    waitingLine:
      waitingState === "restingPassage"
        ? "The object waits by resting, not by counting down."
        : waitingState === "openDrift"
          ? "The drift remains open without needing attention."
          : waitingState === "nextKeeperAbsent"
            ? "The next keeper is absent, and the absence is allowed to stay quiet."
            : "Continuity remains unresolved without becoming tension.",
    absenceLine:
      waitingState === "nextKeeperAbsent"
        ? "No one is summoned; the room keeps the pause."
        : "Waiting is treated as time in the room, not claim pressure.",
    homepageWaitingFragment:
      waitingState === "unresolvedContinuity"
        ? "A drift remains unresolved below the shelf."
        : "One object is still waiting in room time.",
    reduceClaimLanguage: h > 58,
  };
}
