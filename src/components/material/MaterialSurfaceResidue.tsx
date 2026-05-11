"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { className?: string };

/** Domestic surface + home surface memory + paper aging — one quiet band. */
export function MaterialSurfaceResidue({ className = "" }: Props) {
  const { materialization } = useWorldRuntime();
  const m = materialization;

  return (
    <div className={`space-y-2.5 rounded-xl border border-border-subtle/10 bg-background/14 px-4 py-3.5 sm:px-5 ${className}`}>
      <p className="text-[0.6rem] tracking-[0.08em] text-text-muted/44">Surface residue</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/52">{m.domesticSurfaceLine}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/50">
        <span className="text-text-muted/38">Home shelf · </span>
        {m.surfaceMemory.home}
      </p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/46">{m.paperAgingLine}</p>
      {m.textureBudget < 2 ? (
        <p className="text-[0.6rem] leading-[1.55] text-text-muted/36">{m.textureFatigueAuditLine}</p>
      ) : null}
      <p className="text-[0.58rem] leading-[1.5] text-text-muted/32">{m.materialBoundaryLine}</p>
    </div>
  );
}
