"use client";

import { StructuralAbsenceGate } from "@/components/density/StructuralAbsenceGate";
import { LightFalloffNote } from "@/components/material/LightFalloffNote";
import { MaterialWeatheringBlock } from "@/components/material/MaterialWeatheringBlock";
import { PhysicalSilenceLayer } from "@/components/material/PhysicalSilenceLayer";
import { RoomAirPresence } from "@/components/material/RoomAirPresence";
import { SurfaceMemoryLine } from "@/components/material/SurfaceMemoryLine";

/** Objects catalog — material room, not décor catalog. */
export function ObjectsPageMaterial() {
  return (
    <StructuralAbsenceGate sectionKey="objects-material-band">
    <div className="mt-10 max-w-2xl space-y-4">
      <RoomAirPresence context="objects" />
      <SurfaceMemoryLine context="objects" />
      <MaterialWeatheringBlock compact />
      <LightFalloffNote />
      <PhysicalSilenceLayer />
    </div>
    </StructuralAbsenceGate>
  );
}
