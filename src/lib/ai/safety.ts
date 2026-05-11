export const toneVocabulary = {
  preferred: ["guidance", "tendency", "pause", "harmony", "balance"],
  blocked: [
    "fate",
    "doomed",
    "guaranteed wealth",
    "absolute prediction",
    "certain outcome",
  ],
} as const;

export interface SafetyCheckResult {
  pass: boolean;
  reasons: string[];
}
