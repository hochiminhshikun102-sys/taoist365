import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type SilenceThresholds = {
  guidanceRouteThreshold: number;
  dailyBlockThreshold: number;
  objectForegroundThreshold: number;
};

export const silenceThresholdsByAge: Record<WorldAgeStateId, SilenceThresholds> = {
  "newly-settled": { guidanceRouteThreshold: 78, dailyBlockThreshold: 88, objectForegroundThreshold: 92 },
  "quietly-lived-in": { guidanceRouteThreshold: 66, dailyBlockThreshold: 80, objectForegroundThreshold: 84 },
  "heavy-air-season": { guidanceRouteThreshold: 58, dailyBlockThreshold: 74, objectForegroundThreshold: 78 },
  "slow-drift-month": { guidanceRouteThreshold: 52, dailyBlockThreshold: 66, objectForegroundThreshold: 70 },
  "long-static-period": { guidanceRouteThreshold: 44, dailyBlockThreshold: 58, objectForegroundThreshold: 62 },
  "late-year-room": { guidanceRouteThreshold: 42, dailyBlockThreshold: 56, objectForegroundThreshold: 60 },
  "old-browser-period": { guidanceRouteThreshold: 38, dailyBlockThreshold: 50, objectForegroundThreshold: 54 },
  "worn-in-cycle": { guidanceRouteThreshold: 34, dailyBlockThreshold: 46, objectForegroundThreshold: 48 },
};
