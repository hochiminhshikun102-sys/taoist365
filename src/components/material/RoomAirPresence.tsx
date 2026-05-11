"use client";

import type { RoomAirContext } from "@/data/world-materialization/system";
import { useWorldRuntime } from "@/lib/use-world-runtime";

type Props = { context: RoomAirContext; className?: string };

/** Room air — prose only, same-day deterministic. */
export function RoomAirPresence({ context, className = "" }: Props) {
  const { materialization } = useWorldRuntime();
  const line = materialization.roomAir[context];

  return (
    <div className={`rounded-xl border border-border-subtle/10 bg-background/18 px-4 py-3.5 sm:px-5 ${className}`}>
      <p className="text-[0.6rem] tracking-[0.08em] text-text-muted/44">Room air</p>
      <p className="mt-2 text-[0.68rem] leading-[1.62] text-text-muted/54">{line}</p>
    </div>
  );
}
