"use client";

import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Thin object permanence copy — not a second catalog voice */
export function ObjectPermanenceStrip() {
  const { structuralSilence, worldQuietPermanence, worldPostProductContinuity, worldAiNativeInfrastructure } =
    useWorldRuntime();
  const op = worldQuietPermanence.objectPermanence;
  const ob = worldPostProductContinuity.objectBackground;
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;
  const h = dailyIndex(`${structuralSilence.dayKey}:obj-perm`, 100);
  if (ob.objectBackgroundBias > 0.58 && h % 3 !== 0) return null;
  if (st.combinedProseBias > 0.68 && h % 2 !== 0) return null;
  if (op.objectProseThinBias < 0.42 && h % 4 !== 0) return null;
  const lines = [
    op.objectRoomInfrastructureLine,
    op.objectNoLongerHighlightedLine,
    op.objectSurfaceAgingLine,
    op.roomDependenceRuntimeLine,
  ];
  return (
    <div className="mt-6 max-w-2xl rounded-lg border border-border-subtle/12 bg-background/24 px-4 py-3">
      <p className="text-[0.62rem] leading-[1.55] text-text-muted/40">{lines[h % lines.length]}</p>
    </div>
  );
}
