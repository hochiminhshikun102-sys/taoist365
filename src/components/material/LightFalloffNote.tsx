"use client";

import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { className?: string };

/** Ordinary-room light logic — no film-set language. */
export function LightFalloffNote({ className = "" }: Props) {
  const { materialization } = useWorldRuntime();
  const m = materialization;

  return (
    <div className={`space-y-2.5 rounded-xl border border-border-subtle/10 bg-background/16 px-4 py-3.5 sm:px-5 ${className}`}>
      <p className="text-[0.6rem] tracking-[0.08em] text-text-muted/42">Light</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/52">{m.lightFalloffLine}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/48">{m.quietLightPhysicsLine}</p>
      <p className="text-[0.68rem] leading-[1.62] text-text-muted/46">{m.browserGlowLine}</p>
    </div>
  );
}
