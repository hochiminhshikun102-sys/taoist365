"use client";

import { dailyIndex } from "@/lib/living-day-key";
import { useWorldRuntime } from "@/lib/use-world-runtime";

/** One-field maturity copy: freeze + stillness + aging — sparse, not a feed */
export function WorldMaturityStrip() {
  const { structuralSilence, worldMaturity, worldPostProductContinuity, worldAiNativeInfrastructure } =
    useWorldRuntime();
  const h = dailyIndex(`${structuralSilence.dayKey}:wm-strip`, 100);
  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;
  const mod =
    worldPostProductContinuity.permanencePass.maturityStripModulus + st.maturityStripModulusBonus;
  if (h % mod !== 0) return null;
  const { freeze, stillnessGovernor, realInternetAging } = worldMaturity;
  const stripQuiet = st.combinedProseBias > 0.74;
  return (
    <div
      className={`mt-3 space-y-1.5 rounded-lg border bg-background/12 px-4 py-3 text-[0.6rem] leading-[1.55] ${
        stripQuiet ? "border-border-subtle/6 text-text-muted/32" : "border-border-subtle/8 text-text-muted/40"
      }`}
    >
      <p>{freeze.worldFreezeBoundariesLine}</p>
      <p>{stillnessGovernor.antiExpansionLine}</p>
      <p>{realInternetAging.oldPageStabilityLine}</p>
    </div>
  );
}
