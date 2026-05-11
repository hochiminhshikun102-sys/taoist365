"use client";

import { objectSilenceWindow } from "@/data/world-density-calibration/system";
import type { ReactNode } from "react";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = {
  catalogId: string;
  children: ReactNode;
};

export function ObjectRuntimeGate({ catalogId, children }: Props) {
  const { structuralSilence, aging, worldDensity, worldRegulation, browserReality, runtimeRetirement } =
    useWorldRuntime();
  if (!structuralSilence.objectFade.foregroundObjects.includes(catalogId)) return null;
  if (!worldRegulation.objectPermanence.regulatedForegroundIds.includes(catalogId)) return null;
  if (!browserReality.objectInternetSediment.sedimentForegroundIds.includes(catalogId)) return null;
  if (!runtimeRetirement.objectRetirement.rareForegroundObjects.includes(catalogId)) return null;
  const silence = objectSilenceWindow(catalogId, aging.ageStateId, worldDensity.dayKey);
  if (!silence.allowForegroundToday) return null;
  return <>{children}</>;
}
