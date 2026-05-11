"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

export function BrowserDeskRealityStrip() {
  const { browserReality, worldStability } = useWorldRuntime();
  return (
    <div className="mt-6 space-y-2 rounded-xl border border-border-subtle/10 bg-background/16 px-4 py-3 sm:px-5">
      <p className="text-[0.6rem] tracking-[0.06em] text-text-muted/40">Browser desk</p>
      <p className="text-[0.65rem] leading-[1.58] text-text-muted/48">{browserReality.oldUrl.familiarStructureLine}</p>
      <p className="text-[0.65rem] leading-[1.58] text-text-muted/44">{browserReality.hostname.quietUrlRecognition}</p>
      <p className="text-[0.62rem] leading-[1.55] text-text-muted/38">{worldStability.slowEvolutionLine}</p>
    </div>
  );
}
