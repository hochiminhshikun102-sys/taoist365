import { dailyIndex } from "@/lib/living-day-key";
import type { WorldStateId } from "@/data/living-presence-runtime/same-day-world-state";

export const WORLD_AGE_STATES = [
  "newly-settled",
  "quietly-lived-in",
  "heavy-air-season",
  "slow-drift-month",
  "long-static-period",
  "late-year-room",
  "old-browser-period",
  "worn-in-cycle",
] as const;

export type WorldAgeStateId = (typeof WORLD_AGE_STATES)[number];

export type WorldAgeState = {
  id: WorldAgeStateId;
  label: string;
  stillnessWeight: number;
  silenceWeight: number;
  explanationFatigue: number;
};

export const worldAgeStateMap: Record<WorldAgeStateId, WorldAgeState> = {
  "newly-settled": {
    id: "newly-settled",
    label: "newly settled",
    stillnessWeight: 0.22,
    silenceWeight: 0.18,
    explanationFatigue: 0.1,
  },
  "quietly-lived-in": {
    id: "quietly-lived-in",
    label: "quietly lived-in",
    stillnessWeight: 0.35,
    silenceWeight: 0.3,
    explanationFatigue: 0.22,
  },
  "heavy-air-season": {
    id: "heavy-air-season",
    label: "heavy-air season",
    stillnessWeight: 0.5,
    silenceWeight: 0.42,
    explanationFatigue: 0.34,
  },
  "slow-drift-month": {
    id: "slow-drift-month",
    label: "slow drift month",
    stillnessWeight: 0.44,
    silenceWeight: 0.37,
    explanationFatigue: 0.38,
  },
  "long-static-period": {
    id: "long-static-period",
    label: "long static period",
    stillnessWeight: 0.72,
    silenceWeight: 0.66,
    explanationFatigue: 0.61,
  },
  "late-year-room": {
    id: "late-year-room",
    label: "late-year room",
    stillnessWeight: 0.62,
    silenceWeight: 0.59,
    explanationFatigue: 0.55,
  },
  "old-browser-period": {
    id: "old-browser-period",
    label: "old browser period",
    stillnessWeight: 0.68,
    silenceWeight: 0.63,
    explanationFatigue: 0.7,
  },
  "worn-in-cycle": {
    id: "worn-in-cycle",
    label: "worn-in cycle",
    stillnessWeight: 0.79,
    silenceWeight: 0.74,
    explanationFatigue: 0.78,
  },
};

export function worldAgeStateId(dayKey: string, worldStateId: WorldStateId): WorldAgeStateId {
  const i = dailyIndex(dayKey + ":age:" + worldStateId, WORLD_AGE_STATES.length);
  return WORLD_AGE_STATES[i]!;
}
