"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { anchorPrimaryItemId, type AmbientAnchor } from "@/lib/ambient-anchor";

export type TemporalBand = "night" | "morning" | "midday" | "afternoon" | "evening";

const TWENTY_MIN_MS = 20 * 60 * 1000;

export function bandFromHour(hour: number): TemporalBand {
  if (hour >= 22 || hour < 5) return "night";
  if (hour < 10) return "morning";
  if (hour < 14) return "midday";
  if (hour < 18) return "afternoon";
  return "evening";
}

/**
 * Local wall-clock band only — not notifications, not themes, not user profiling.
 * Defaults stable for hydration; syncs after mount and drifts slowly on an interval.
 */
export function useTemporalBand(): TemporalBand {
  const [band, setBand] = useState<TemporalBand>("midday");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- align with local hour after hydration (no clock UI)
    setBand(bandFromHour(new Date().getHours()));
    intervalRef.current = setInterval(() => {
      setBand(bandFromHour(new Date().getHours()));
    }, TWENTY_MIN_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return band;
}

/** Shelf: anchor wins if present; else soft temporal bias (cup in evening, paper in morning/midday). */
export function resolvePreferredShelfId(
  anchor: AmbientAnchor,
  band: TemporalBand,
  ids: ReadonlySet<string>,
): string | null {
  const anchorId = anchorPrimaryItemId(anchor);
  if (ids.has(anchorId)) return anchorId;
  if ((band === "evening" || band === "night") && ids.has("tea-cup-warmth")) return "tea-cup-warmth";
  if ((band === "morning" || band === "midday") && ids.has("folded-paper-note")) return "folded-paper-note";
  return null;
}
