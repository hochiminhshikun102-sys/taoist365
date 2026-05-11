import { dailyIndex } from "@/lib/living-day-key";
import type { DriftboxObjectRuntimeState } from "@/runtime/driftbox-object-state";
import type { DriftboxSedimentRuntime } from "@/runtime/driftbox-sediment-runtime";

export type DriftboxContinuityRuntime = {
  continuityLine: string;
  homepageResidueLine: string;
  passageMark: string;
  showHomepageResidue: boolean;
};

const continuityLines = [
  "Driftbox keeps the object moving without making the movement loud.",
  "Receiving is only a handoff in the browser room, not a performance.",
  "The next keeper enters as continuity; the object does not become a campaign.",
  "Some things pass through Taoist365 slowly enough to keep their room air.",
] as const;

const residueLines = [
  "Driftbox note: one object may have moved further through the shelf.",
  "A quiet receiving layer sits under Windkeep, almost below the page surface.",
  "Some Windkeep objects keep a passage mark after they leave the room.",
  "Driftbox remains a low-frequency mailbox for object continuation.",
] as const;

export function resolveDriftboxContinuity(
  dayKey: string,
  objectState: DriftboxObjectRuntimeState,
  sediment: DriftboxSedimentRuntime,
): DriftboxContinuityRuntime {
  const h = dailyIndex(`${dayKey}:driftbox-continuity`, 100);
  const continuityLine = continuityLines[h % continuityLines.length];
  const homepageResidueLine =
    sediment.sedimentDepth === "thin"
      ? residueLines[(h + 1) % residueLines.length]
      : sediment.homepageSedimentLine;

  return {
    continuityLine,
    homepageResidueLine,
    passageMark:
      objectState.claimTone === "closed"
        ? "Passage closed without spectacle."
        : objectState.claimTone === "low"
          ? "Quiet receiving stays available."
          : "No receiving pressure is present.",
    showHomepageResidue:
      h % 5 === 0 ||
      objectState.state === "passedThroughHands" ||
      objectState.state === "archivedAsResidue" ||
      sediment.sedimentDepth === "old",
  };
}
