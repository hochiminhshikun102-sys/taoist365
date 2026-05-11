"use client";

import type { DensitySectionKey } from "@/data/world-density-calibration/system";
import type { ReactNode } from "react";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { sectionKey: DensitySectionKey; children: ReactNode };

/** Some sections are absent by day key; this is not loading or collapsed UI. */
export function StructuralAbsenceGate({ sectionKey, children }: Props) {
  const { worldDensity } = useWorldRuntime();
  if (worldDensity.sectionMatrix[sectionKey]) return null;
  return <>{children}</>;
}
