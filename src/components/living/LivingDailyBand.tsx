"use client";

import Link from "next/link";
import { useMemo } from "react";
import { livingDailySlices, type LivingDailySlice } from "@/data/living-content/daily-slices";
import { dailyIndex, getLivingDayKey } from "@/lib/living-day-key";

/** Pacific-day slice only — no secondary runtime prose layers (data silence). */
export function LivingDailyBand() {
  const { dayLabel, slice } = useMemo(() => {
    const key = getLivingDayKey(new Date());
    const idx = dailyIndex(key, livingDailySlices.length);
    return { dayLabel: key, slice: livingDailySlices[idx] as LivingDailySlice | undefined };
  }, []);

  if (!slice) {
    return (
      <div
        className="min-h-[6rem] rounded-2xl border border-border-subtle/20 bg-surface/58 p-7 sm:p-9"
        aria-busy="true"
        aria-live="polite"
      >
        <p className="text-[0.7rem] tracking-[0.06em] text-text-muted/50 uppercase">Daily band</p>
        <p className="sr-only">Loading today&apos;s band.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border-subtle/28 bg-surface/68 p-7 shadow-none sm:p-9">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-[0.7rem] tracking-[0.06em] uppercase text-text-muted/72">Daily band</p>
        <p className="font-mono text-[0.6rem] text-text-muted/40">{dayLabel} · Pacific</p>
      </div>
      <p className="mt-3 text-[0.62rem] leading-[1.55] text-text-muted/48">One replacement per calendar day—not a feed.</p>
      <p className="mt-5 text-sm leading-8 text-text-secondary">{slice.breathLine}</p>
      <p className="mt-3 text-sm leading-8 text-text-muted/82">{slice.roomState}</p>
      <p className="mt-3 text-xs leading-7 text-text-muted/68">{slice.lingerObject}</p>
      {slice.catalogEcho ? (
        <p className="mt-6 text-[0.65rem] leading-6 text-text-muted/55">
          <Link href={`/objects#${slice.catalogEcho.catalogId}`} className="text-text-secondary underline-offset-2 hover:underline">
            {slice.catalogEcho.catalogId}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
