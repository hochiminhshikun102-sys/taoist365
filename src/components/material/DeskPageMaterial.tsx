"use client";

import { StructuralAbsenceGate } from "@/components/density/StructuralAbsenceGate";
import { LightFalloffNote } from "@/components/material/LightFalloffNote";
import { PhysicalSilenceLayer } from "@/components/material/PhysicalSilenceLayer";
import { RoomAirPresence } from "@/components/material/RoomAirPresence";
import { SurfaceMemoryLine } from "@/components/material/SurfaceMemoryLine";

export function DeskPageMaterial() {
  return (
    <StructuralAbsenceGate sectionKey="desk-density-band">
    <div className="mt-8 max-w-2xl space-y-4 print:hidden">
      <RoomAirPresence context="desk" />
      <SurfaceMemoryLine context="desk" />
      <LightFalloffNote />
      <PhysicalSilenceLayer />
    </div>
    </StructuralAbsenceGate>
  );
}
