import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type ExplanationFatigue = {
  objectNotes: "full" | "short" | "minimal";
  ritualDescriptions: "normal" | "lighter" | "quiet";
  guidanceVerbosity: "normal" | "lighter" | "one-line";
  mailDetail: "normal" | "shorter" | "implied";
};

export const explanationFatigueByAge: Record<WorldAgeStateId, ExplanationFatigue> = {
  "newly-settled": { objectNotes: "full", ritualDescriptions: "normal", guidanceVerbosity: "normal", mailDetail: "normal" },
  "quietly-lived-in": { objectNotes: "short", ritualDescriptions: "lighter", guidanceVerbosity: "lighter", mailDetail: "shorter" },
  "heavy-air-season": { objectNotes: "short", ritualDescriptions: "lighter", guidanceVerbosity: "lighter", mailDetail: "shorter" },
  "slow-drift-month": { objectNotes: "minimal", ritualDescriptions: "quiet", guidanceVerbosity: "one-line", mailDetail: "implied" },
  "long-static-period": { objectNotes: "minimal", ritualDescriptions: "quiet", guidanceVerbosity: "one-line", mailDetail: "implied" },
  "late-year-room": { objectNotes: "minimal", ritualDescriptions: "quiet", guidanceVerbosity: "one-line", mailDetail: "implied" },
  "old-browser-period": { objectNotes: "minimal", ritualDescriptions: "quiet", guidanceVerbosity: "one-line", mailDetail: "implied" },
  "worn-in-cycle": { objectNotes: "minimal", ritualDescriptions: "quiet", guidanceVerbosity: "one-line", mailDetail: "implied" },
};
