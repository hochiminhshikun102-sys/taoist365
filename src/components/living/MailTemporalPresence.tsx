"use client";

import { StructuralAbsenceGate } from "@/components/density/StructuralAbsenceGate";
import { LightFalloffNote } from "@/components/material/LightFalloffNote";
import { RoomAirPresence } from "@/components/material/RoomAirPresence";
import { SurfaceMemoryLine } from "@/components/material/SurfaceMemoryLine";
import { livingRuntimeBoundaries } from "@/data/living-presence-runtime/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

/** Shelf correspondence time — not CRM, not campaign rhythm. */
export function MailTemporalPresence() {
  const {
    presence,
    rhythm,
    aging,
    inertia,
    lowSignalHumanity,
    structuralSilence,
    materialization,
    worldDensity,
    worldRegulation,
    browserReality,
    runtimeRetirement,
    antiSystemSelfAwareness,
    worldAiNativeInfrastructure,
  } = useWorldRuntime();
  const mailThin =
    worldRegulation.understatement.mailUnderstatement ||
    worldAiNativeInfrastructure.invisibleInfrastructureStructuralThinning.mailRetireDenseProcessBlock;

  return (
    <div className="mt-6 rounded-xl border border-border-subtle/18 bg-background/34 px-5 py-4">
      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/52">Shelf time</p>
      <p className="mt-2 text-sm leading-7 text-text-muted/78">{presence.mailTemporalLine}</p>
      <p className="mt-4 text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/48">Mail rhythm</p>
      <p className="mt-2 text-sm leading-7 text-text-muted/74">{rhythm.mailRhythmLine}</p>
      <p className="mt-3 text-[0.62rem] leading-[1.55] text-text-muted/42">{browserReality.hostname.hostnameFamiliarityLine}</p>
      {runtimeRetirement.worldRest.restDay ? (
        <p className="mt-2 text-[0.6rem] leading-[1.5] text-text-muted/38">{runtimeRetirement.worldRest.restLine}</p>
      ) : null}
      {antiSystemSelfAwareness.showAntiMetaFooter ? (
        <p className="mt-2 text-[0.58rem] leading-[1.48] text-text-muted/34">{antiSystemSelfAwareness.antiMetaReminder}</p>
      ) : null}
      {!mailThin && !structuralSilence.structuralAbsence.hideMailExplanatoryBlock ? (
        <p className="mt-2 text-sm leading-7 text-text-muted/72">{aging.mailSedimentLine}</p>
      ) : null}
      {!mailThin ? <p className="mt-2 text-sm leading-7 text-text-muted/70">{inertia.mailSedimentLine}</p> : null}
      {!mailThin && structuralSilence.ambientVisibility.showMailShelfParagraph ? (
        <p className="mt-2 text-sm leading-7 text-text-muted/70">{lowSignalHumanity.mailThreadSedimentLine}</p>
      ) : null}
      {!mailThin ? (
        <>
          <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/58">{inertia.backgroundPresenceLine}</p>
          <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/58">{rhythm.unfinishedLine}</p>
          <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/56">{aging.sedimentLine}</p>
          <p className="mt-3 text-[0.62rem] leading-5 text-text-muted/48">{livingRuntimeBoundaries.repeatedDeclarations[2]}</p>
          <p className="mt-2 text-[0.62rem] leading-5 text-text-muted/46">{presence.browserTemporalLine}</p>
          <p className="mt-3 text-[0.6rem] leading-5 text-text-muted/40">{rhythm.boundariesWhatThisIs}</p>
        </>
      ) : (
        <p className="mt-3 text-[0.62rem] leading-[1.55] text-text-muted/44">{worldRegulation.residualBalance.residualBalanceLine}</p>
      )}
      <StructuralAbsenceGate sectionKey="mail-density-band">
        <div className="mt-6 space-y-4 border-t border-border-subtle/14 pt-5">
          {worldDensity.mailDefaulting.mailDefaultingLine ? (
            <p className="text-[0.62rem] leading-[1.58] text-text-muted/44">{worldDensity.mailDefaulting.mailDefaultingLine}</p>
          ) : null}
          {!worldDensity.mutualExclusion.suppressMailSedimentLayer ? (
            <>
              <RoomAirPresence context="mail" />
              <SurfaceMemoryLine context="mail" />
              <p className="text-[0.68rem] leading-[1.62] text-text-muted/48">{materialization.paperAgingLine}</p>
              <LightFalloffNote />
            </>
          ) : (
            <p className="text-[0.62rem] leading-[1.58] text-text-muted/40">Mail sediment stays thin today—thread default, not onboarding.</p>
          )}
        </div>
      </StructuralAbsenceGate>
    </div>
  );
}
