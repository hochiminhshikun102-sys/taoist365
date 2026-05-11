"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { className?: string };

/** Physical silence — volume and weight in words, not motion. */
export function PhysicalSilenceLayer({ className = "" }: Props) {
  const { materialization } = useWorldRuntime();

  return (
    <div className={`rounded-xl border border-border-subtle/8 bg-background/82 px-4 py-3.5 sm:px-5 ${className}`}>
      <p className="text-[0.6rem] tracking-[0.08em] text-text-muted/40">Physical silence</p>
      <p className="mt-2 text-[0.68rem] leading-[1.62] text-text-muted/50">{materialization.physicalSilenceLine}</p>
      <p className="mt-3 text-[0.62rem] leading-[1.58] text-text-muted/42">{materialization.visualAging.visualAgeProse}</p>
    </div>
  );
}
