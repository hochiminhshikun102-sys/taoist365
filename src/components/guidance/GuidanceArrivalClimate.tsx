"use client";

import { StructuralAbsenceGate } from "@/components/density/StructuralAbsenceGate";
import { LightFalloffNote } from "@/components/material/LightFalloffNote";
import { MaterialWeatheringBlock } from "@/components/material/MaterialWeatheringBlock";
import { PhysicalSilenceLayer } from "@/components/material/PhysicalSilenceLayer";
import { RoomAirPresence } from "@/components/material/RoomAirPresence";
import { humanRhythmBoundaries } from "@/data/human-rhythm-runtime/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

export function GuidanceArrivalClimate() {
  const { presence, rhythm, aging, inertia, lowSignalHumanity, materialization, worldDensity, browserReality } =
    useWorldRuntime();

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-xl border border-border-subtle/20 bg-background/38 px-5 py-4">
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/52">Same-day climate</p>
        <p className="mt-2 text-sm leading-7 text-text-secondary">
          Today&apos;s shared room elsewhere here reads · {presence.worldLabel}.
        </p>
        <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/58">{presence.weatherDriftLine}</p>
      </div>
      <div className="rounded-xl border border-border-subtle/16 bg-background/32 px-5 py-4">
        <p className="text-[0.65rem] uppercase tracking-[0.12em] text-text-muted/48">Life rhythm</p>
        <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/58">{rhythm.atmosphereSummary}</p>
        <p className="mt-2 text-sm leading-7 text-text-secondary">{rhythm.guidanceRhythmLine}</p>
        <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/56">World age · {aging.ageLabel}</p>
        <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/54">{aging.guidanceFatigueLine}</p>
        <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/52">{inertia.longStillnessLine}</p>
        <p className="mt-2 text-[0.68rem] leading-6 text-text-muted/50">{lowSignalHumanity.residualPresenceLine}</p>
        <p className="mt-2 text-[0.62rem] leading-5 text-text-muted/42">{humanRhythmBoundaries.allowedResemblance[0]}</p>
      </div>
      <div className="rounded-xl border border-border-subtle/12 bg-background/26 px-5 py-3">
        <p className="text-[0.62rem] leading-[1.55] text-text-muted/44">{browserReality.hostname.hostnameFamiliarityLine}</p>
        <p className="mt-1 text-[0.6rem] leading-[1.5] text-text-muted/38">{browserReality.hostname.browserAutoCompleteMemory}</p>
      </div>
      <StructuralAbsenceGate sectionKey="guidance-arrival-density-extra">
        <div className="mt-5 space-y-4">
          <RoomAirPresence context="guidance" />
          <LightFalloffNote />
          <PhysicalSilenceLayer />
          <MaterialWeatheringBlock compact />
          <p className="text-[0.62rem] leading-[1.58] text-text-muted/40">{materialization.ambientMaterialDensityLine}</p>
          <p className="text-[0.6rem] leading-[1.55] text-text-muted/36">{worldDensity.worldExhaustionLine}</p>
          <p className="text-[0.58rem] leading-[1.5] text-text-muted/32">{worldDensity.antiOverdesignLine}</p>
        </div>
      </StructuralAbsenceGate>
    </div>
  );
}
