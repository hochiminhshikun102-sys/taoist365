"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

export function LivingInertiaNote() {
  const { inertia } = useWorldRuntime();
  return (
    <p className="mt-4 max-w-3xl text-xs leading-7 text-text-muted/56">{inertia.layoutStabilityLine}</p>
  );
}
