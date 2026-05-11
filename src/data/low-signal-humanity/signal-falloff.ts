import type { WorldAgeStateId } from "@/data/world-aging-runtime/system";

export type SignalFalloff = {
  directAddressLevel: "normal" | "reduced" | "minimal";
  emotionalFraming: "normal" | "reduced" | "flat";
  persuasionLevel: "normal" | "light" | "none";
  explanationLevel: "normal" | "lighter" | "minimal";
};

export const signalFalloffByAge: Record<WorldAgeStateId, SignalFalloff> = {
  "newly-settled": { directAddressLevel: "normal", emotionalFraming: "normal", persuasionLevel: "normal", explanationLevel: "normal" },
  "quietly-lived-in": { directAddressLevel: "reduced", emotionalFraming: "reduced", persuasionLevel: "light", explanationLevel: "lighter" },
  "heavy-air-season": { directAddressLevel: "reduced", emotionalFraming: "reduced", persuasionLevel: "light", explanationLevel: "lighter" },
  "slow-drift-month": { directAddressLevel: "minimal", emotionalFraming: "flat", persuasionLevel: "none", explanationLevel: "minimal" },
  "long-static-period": { directAddressLevel: "minimal", emotionalFraming: "flat", persuasionLevel: "none", explanationLevel: "minimal" },
  "late-year-room": { directAddressLevel: "minimal", emotionalFraming: "flat", persuasionLevel: "none", explanationLevel: "minimal" },
  "old-browser-period": { directAddressLevel: "minimal", emotionalFraming: "flat", persuasionLevel: "none", explanationLevel: "minimal" },
  "worn-in-cycle": { directAddressLevel: "minimal", emotionalFraming: "flat", persuasionLevel: "none", explanationLevel: "minimal" },
};
