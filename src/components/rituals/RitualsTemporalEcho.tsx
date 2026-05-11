"use client";

import { livingRuntimeBoundaries } from "@/data/living-presence-runtime/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

export function RitualsTemporalEcho() {
  const {
    presence,
    rhythm,
    aging,
    inertia,
    lowSignalHumanity,
    structuralSilence,
    worldDensity,
    worldAiNativeInfrastructure,
  } = useWorldRuntime();
  if (structuralSilence.structuralAbsence.hideRitualTrace) return null;

  const st = worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning;
  const quietEcho = st.combinedProseBias > 0.56 || st.dailyPreferUltraThin;
  const retireDenseEcho = st.combinedProseBias > 0.68 || st.dailyForceCloseEchoes;

  return (
    <p className="mt-4 max-w-2xl text-xs leading-7 text-text-muted/58">
      Same-day climate as Home right now - {presence.worldLabel}. {presence.ambientPresenceLine}{" "}
      <span className="text-text-muted/50">Domestic rhythm leans - {rhythm.atmosphereSummary}</span>{" "}
      {!quietEcho ? <span className="text-text-muted/48">Ritual age - {aging.ritualAgingLine}</span> : null}{" "}
      {!retireDenseEcho ? <span className="text-text-muted/47">{inertia.ritualSilenceLine}</span> : null}{" "}
      {!retireDenseEcho ? <span className="text-text-muted/47">{lowSignalHumanity.ritualBackgroundLine}</span> : null}{" "}
      <span className="text-text-muted/46">{livingRuntimeBoundaries.repeatedDeclarations[0]}</span>
      {!retireDenseEcho && worldDensity.ritualQuiet.thinRitualEcho && worldDensity.ritualQuiet.ritualQuietLine ? (
        <span className="block pt-2 text-text-muted/42">{worldDensity.ritualQuiet.ritualQuietLine}</span>
      ) : null}
      {worldDensity.mutualExclusion.suppressRitualTraceDensity || retireDenseEcho ? (
        <span className="block pt-1 text-text-muted/38">Ritual trace density is down today; room stays off-camera.</span>
      ) : null}
    </p>
  );
}
