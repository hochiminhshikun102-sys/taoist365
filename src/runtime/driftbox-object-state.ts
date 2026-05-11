import { dailyIndex } from "@/lib/living-day-key";

export type DriftboxObjectState =
  | "restingInRoom"
  | "passedThroughHands"
  | "waitingWithoutPressure"
  | "claimedQuietly"
  | "archivedAsResidue";

export type DriftboxObjectRuntimeState = {
  state: DriftboxObjectState;
  stateLine: string;
  archiveLine: string;
  claimTone: "silent" | "low" | "closed";
};

const stateLines: Record<DriftboxObjectState, string> = {
  restingInRoom: "A passed object rests in the room before it moves again.",
  passedThroughHands: "The object has already crossed one life and keeps its quiet surface.",
  waitingWithoutPressure: "It can be claimed without countdown, bid, or campaign rhythm.",
  claimedQuietly: "A next owner is treated as continuation, not conversion.",
  archivedAsResidue: "Some objects remain as residue after passage, still part of the shelf.",
};

const archiveLines: Record<DriftboxObjectState, string> = {
  restingInRoom: "Archive trace stays light: placement, wear, and the fact of being kept.",
  passedThroughHands: "Previous touch is recorded as time residue, not sales proof.",
  waitingWithoutPressure: "Claiming remains low-pressure and can stay unfinished.",
  claimedQuietly: "The passage closes softly; the object continues off-page.",
  archivedAsResidue: "The archive is a room memory, not an inventory wall.",
};

export function resolveDriftboxObjectState(dayKey: string): DriftboxObjectRuntimeState {
  const h = dailyIndex(`${dayKey}:driftbox-object-state`, 100);
  const state: DriftboxObjectState =
    h < 22
      ? "restingInRoom"
      : h < 44
        ? "passedThroughHands"
        : h < 66
          ? "waitingWithoutPressure"
          : h < 84
            ? "claimedQuietly"
            : "archivedAsResidue";

  return {
    state,
    stateLine: stateLines[state],
    archiveLine: archiveLines[state],
    claimTone: h > 78 ? "closed" : h > 36 ? "low" : "silent",
  };
}
