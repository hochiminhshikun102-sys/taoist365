"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { compact?: boolean; className?: string };

/** Weathering by world age — light, surface, paper, room, residue. */
export function MaterialWeatheringBlock({ compact = false, className = "" }: Props) {
  const { materialization } = useWorldRuntime();
  const w = materialization.weathering;

  if (compact) {
    return (
      <div className={`rounded-xl border border-border-subtle/10 bg-background/14 px-4 py-3 sm:px-5 ${className}`}>
        <p className="text-[0.6rem] tracking-[0.08em] text-text-muted/42">Material weathering</p>
        <p className="mt-2 text-[0.68rem] leading-[1.62] text-text-muted/50">{w.lightLanguage}</p>
        <p className="mt-2 text-[0.68rem] leading-[1.62] text-text-muted/48">{w.residueThickness}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2.5 rounded-xl border border-border-subtle/12 bg-background/16 px-4 py-3.5 sm:px-5 ${className}`}>
      <p className="text-[0.6rem] tracking-[0.08em] text-text-muted/44">Material weathering</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/54">{w.lightLanguage}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/50">{w.surfaceState}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/48">{w.paperFeel}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/46">{w.roomDensity}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/44">{w.residueThickness}</p>
    </div>
  );
}
