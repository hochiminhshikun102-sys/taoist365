import { dailyIndex } from "@/lib/living-day-key";
import type { WorldAgeStateId } from "./world-age-state";

export type WorldAgeIndex = {
  objectBackgroundRate: number;
  sedimentPersistenceDays: number;
  ritualSilenceCycleDays: number;
  forgettingRate: number;
};

const baseIndexByAge: Record<WorldAgeStateId, WorldAgeIndex> = {
  "newly-settled": {
    objectBackgroundRate: 0.28,
    sedimentPersistenceDays: 4,
    ritualSilenceCycleDays: 5,
    forgettingRate: 0.18,
  },
  "quietly-lived-in": {
    objectBackgroundRate: 0.42,
    sedimentPersistenceDays: 6,
    ritualSilenceCycleDays: 7,
    forgettingRate: 0.28,
  },
  "heavy-air-season": {
    objectBackgroundRate: 0.5,
    sedimentPersistenceDays: 8,
    ritualSilenceCycleDays: 9,
    forgettingRate: 0.34,
  },
  "slow-drift-month": {
    objectBackgroundRate: 0.63,
    sedimentPersistenceDays: 11,
    ritualSilenceCycleDays: 10,
    forgettingRate: 0.41,
  },
  "long-static-period": {
    objectBackgroundRate: 0.72,
    sedimentPersistenceDays: 14,
    ritualSilenceCycleDays: 13,
    forgettingRate: 0.53,
  },
  "late-year-room": {
    objectBackgroundRate: 0.76,
    sedimentPersistenceDays: 16,
    ritualSilenceCycleDays: 14,
    forgettingRate: 0.57,
  },
  "old-browser-period": {
    objectBackgroundRate: 0.82,
    sedimentPersistenceDays: 19,
    ritualSilenceCycleDays: 16,
    forgettingRate: 0.62,
  },
  "worn-in-cycle": {
    objectBackgroundRate: 0.89,
    sedimentPersistenceDays: 24,
    ritualSilenceCycleDays: 20,
    forgettingRate: 0.71,
  },
};

export function worldAgeIndex(age: WorldAgeStateId, dayKey: string): WorldAgeIndex {
  const seed = dailyIndex(dayKey + ":age-index:" + age, 7);
  const base = baseIndexByAge[age];
  const bump = seed / 100;
  return {
    objectBackgroundRate: Math.min(0.95, base.objectBackgroundRate + bump),
    sedimentPersistenceDays: base.sedimentPersistenceDays + (seed % 2),
    ritualSilenceCycleDays: base.ritualSilenceCycleDays + (seed % 3 === 0 ? 1 : 0),
    forgettingRate: Math.min(0.9, base.forgettingRate + bump / 2),
  };
}
