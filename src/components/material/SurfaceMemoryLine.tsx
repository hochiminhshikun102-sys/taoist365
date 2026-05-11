"use client";

import type { SurfaceMemoryContext } from "@/data/world-materialization/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { context: SurfaceMemoryContext; className?: string };

/** Surface memory line for Objects / Desk / Mail / Home. */
export function SurfaceMemoryLine({ context, className = "" }: Props) {
  const { materialization } = useWorldRuntime();
  const line = materialization.surfaceMemory[context];

  return (
    <p className={`text-[0.68rem] leading-[1.62] text-text-muted/52 ${className}`}>
      <span className="text-text-muted/40">Surface memory · </span>
      {line}
    </p>
  );
}
