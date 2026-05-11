"use client";

import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

export function RealObjectPresencePanel() {
  const {
    structuralSilence,
    worldMaturity,
    worldPostProductContinuity,
    worldDefaultExistence,
    worldAiNativeInfrastructure,
  } = useWorldRuntime();
  const ro = worldMaturity.realObjectPresence;
  const rw = worldMaturity.realWorldEntry;
  const ob = worldPostProductContinuity.objectBackground;
  const ord = worldDefaultExistence.objectRoomDissolution;
  const pass = worldPostProductContinuity.permanencePass;
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;
  const h = dailyIndex(`${structuralSilence.dayKey}:rop-panel`, 100);
  if (
    (ob.objectNonDisplayDay && pass.proseCollapseBias > 0.5) ||
    (ord.objectNonDisplayPresenceDay && st.combinedProseBias > 0.54)
  ) {
    return null;
  }
  const thin = st.combinedProseBias > 0.6;
  return (
    <div className="mt-8 max-w-2xl rounded-xl border border-border-subtle/18 bg-background/34 px-5 py-4 sm:px-6">
      <p className="text-[0.65rem] uppercase tracking-[0.1em] text-text-muted/50">Shelf reality</p>
      <p className="mt-2 text-[0.62rem] leading-[1.58] text-text-muted/46">{ro.shelfThinningLine}</p>
      {!thin ? <p className="mt-1.5 text-[0.6rem] leading-[1.52] text-text-muted/42">{ro.realObjectDisappearanceLine}</p> : null}
      {!thin && ro.catalogEchoLine ? (
        <p className="mt-2 text-[0.6rem] leading-[1.52] text-text-muted/40">{ro.catalogEchoLine}</p>
      ) : null}
      <p className="mt-2 text-[0.6rem] leading-[1.52] text-text-muted/40">
        {h % 2 === 0 ? rw.realObjectOwnershipLine : rw.objectNoLongerSpecialLine}
      </p>
    </div>
  );
}
