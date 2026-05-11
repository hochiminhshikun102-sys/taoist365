import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export const humanEnergyFalloffByAge: Record<WorldAgeStateId, string> = {
  "newly-settled": "Human signal still present, lightly responsive.",
  "quietly-lived-in": "Energy is lower, fewer emphatic turns.",
  "heavy-air-season": "Routing slows and endings become quieter.",
  "slow-drift-month": "Signal prefers low effort and short exits.",
  "long-static-period": "World no longer pushes for attention.",
  "late-year-room": "Low-energy defaults hold across sections.",
  "old-browser-period": "Most pages now sit in passive continuity.",
  "worn-in-cycle": "Humanity remains, but almost entirely low-signal.",
};
