"use client";

import Link from "next/link";
import { useMemo } from "react";
import { microPresenceForIndex, microPresenceFragments } from "@/data/guidance-operating-layer/micro-presence";
import { dailyIndex, getLivingDayKey } from "@/lib/living-day-key";

/** Same-day-stable micro line + quiet door into Pause — no memory, no welcome-back. */
export function GuidanceHomeResidue() {
  const line = useMemo(() => {
    const key = getLivingDayKey(new Date());
    const idx = dailyIndex(key, microPresenceFragments.length);
    return microPresenceForIndex(idx);
  }, []);

  if (!line) return null;

  return (
    <p className="max-w-xl text-[0.65rem] leading-[1.65] text-text-muted/40">
      {line}{" "}
      <Link href="/guidance/session" className="text-text-secondary/85 underline-offset-[5px] hover:underline">
        Same room in session
      </Link>
      . Optional; not a loop.
    </p>
  );
}
