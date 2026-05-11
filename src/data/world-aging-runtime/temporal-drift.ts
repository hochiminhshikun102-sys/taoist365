import type { WorldAgeStateId } from "./world-age-state";

export type TemporalDriftProfile = {
  wordingShortness: "full" | "shorter" | "compressed";
  guidanceExplanation: "normal" | "reduced" | "quiet";
  mailDensity: "normal" | "lighter" | "minimal";
  objectExplanation: "normal" | "lighter" | "backgrounded";
  pauseLengthHint: "brief" | "longer" | "long";
};

export const temporalDriftByAge: Record<WorldAgeStateId, TemporalDriftProfile> = {
  "newly-settled": {
    wordingShortness: "full",
    guidanceExplanation: "normal",
    mailDensity: "normal",
    objectExplanation: "normal",
    pauseLengthHint: "brief",
  },
  "quietly-lived-in": {
    wordingShortness: "shorter",
    guidanceExplanation: "reduced",
    mailDensity: "lighter",
    objectExplanation: "lighter",
    pauseLengthHint: "longer",
  },
  "heavy-air-season": {
    wordingShortness: "shorter",
    guidanceExplanation: "reduced",
    mailDensity: "lighter",
    objectExplanation: "lighter",
    pauseLengthHint: "longer",
  },
  "slow-drift-month": {
    wordingShortness: "compressed",
    guidanceExplanation: "quiet",
    mailDensity: "minimal",
    objectExplanation: "backgrounded",
    pauseLengthHint: "long",
  },
  "long-static-period": {
    wordingShortness: "compressed",
    guidanceExplanation: "quiet",
    mailDensity: "minimal",
    objectExplanation: "backgrounded",
    pauseLengthHint: "long",
  },
  "late-year-room": {
    wordingShortness: "compressed",
    guidanceExplanation: "quiet",
    mailDensity: "minimal",
    objectExplanation: "backgrounded",
    pauseLengthHint: "long",
  },
  "old-browser-period": {
    wordingShortness: "compressed",
    guidanceExplanation: "quiet",
    mailDensity: "minimal",
    objectExplanation: "backgrounded",
    pauseLengthHint: "long",
  },
  "worn-in-cycle": {
    wordingShortness: "compressed",
    guidanceExplanation: "quiet",
    mailDensity: "minimal",
    objectExplanation: "backgrounded",
    pauseLengthHint: "long",
  },
};
