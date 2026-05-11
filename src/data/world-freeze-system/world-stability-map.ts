import { dailyIndex } from "@/lib/living-day-key";
import type { ForegroundFreezeTier } from "./freeze-hierarchy";
import {
  BACKGROUND_CHANNELS,
  PERMANENT_FOREGROUND_CHANNELS,
  RARE_RESURFACING_CHANNELS,
  SEMI_FOREGROUND_CHANNELS,
} from "./freeze-hierarchy";

export type WorldStabilityMap = Record<string, ForegroundFreezeTier>;

/** Deterministic tier per abstract channel name */
export function buildWorldStabilityMap(dayKey: string): WorldStabilityMap {
  const m: WorldStabilityMap = {};
  for (const c of PERMANENT_FOREGROUND_CHANNELS) m[c] = "permanentForeground";
  const h = dailyIndex(`${dayKey}:stab-map`, 100);
  for (const c of SEMI_FOREGROUND_CHANNELS) {
    m[c] = h % 7 === 0 ? "background" : "semiForeground";
  }
  for (const c of BACKGROUND_CHANNELS) {
    m[c] = h % 11 === 0 ? "rareResurfacing" : "background";
  }
  for (const c of RARE_RESURFACING_CHANNELS) {
    m[c] = "rareResurfacing";
  }
  return m;
}
