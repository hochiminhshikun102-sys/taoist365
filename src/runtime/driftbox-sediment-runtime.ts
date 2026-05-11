import { dailyIndex } from "@/lib/living-day-key";
import type { ObjectContinuityRuntime } from "@/runtime/object-continuity-runtime";

export type DriftboxSedimentRuntime = {
  sedimentDepth: "thin" | "settled" | "old";
  previousKeeperMark: string;
  archivedResidueLine: string;
  passedObjectEcho: string;
  homepageSedimentLine: string;
  reduceHomepageExplanation: boolean;
};

const previousKeeperMarks = [
  "A previous keeper leaves only a small placement memory.",
  "Old handling stays as surface calm, not provenance performance.",
  "The earlier room is present as a faint edge in the archive.",
  "Someone kept it long enough for the object to stop feeling new.",
] as const;

const archivedResidueLines = [
  "The archive holds wear, placement, and passage without making a timeline.",
  "The record is quiet: object, room, trace, continuation.",
  "History stays sedimented below the shelf, not stacked as updates.",
  "The object keeps a low archive shadow after it moves on.",
] as const;

const passedObjectEchoes = [
  "Passed through once; still carrying room air.",
  "A drift mark remains after the handoff.",
  "The object has a before, but the page does not perform it.",
  "Old continuity is present, sparse enough to keep reading calm.",
] as const;

export function resolveDriftboxSedimentRuntime(
  dayKey: string,
  objectContinuity: ObjectContinuityRuntime,
): DriftboxSedimentRuntime {
  const h = dailyIndex(`${dayKey}:driftbox-sediment`, 100);
  const sedimentDepth = h < 34 ? "thin" : h < 76 ? "settled" : "old";
  const previousKeeperMark = previousKeeperMarks[h % previousKeeperMarks.length];
  const archivedResidueLine = archivedResidueLines[(h + 1) % archivedResidueLines.length];
  const passedObjectEcho = passedObjectEchoes[(h + 2) % passedObjectEchoes.length];

  return {
    sedimentDepth,
    previousKeeperMark,
    archivedResidueLine,
    passedObjectEcho,
    homepageSedimentLine:
      sedimentDepth === "old"
        ? `${passedObjectEcho} ${objectContinuity.keeperLine}`
        : `${passedObjectEcho} ${objectContinuity.homepageFragment}`,
    reduceHomepageExplanation: sedimentDepth === "old" || objectContinuity.state === "continuityPreserved",
  };
}
