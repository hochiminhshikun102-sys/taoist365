export type ForegroundRetirement = {
  foregroundRetirementLine: string;
};

export function resolveForegroundRetirement(): ForegroundRetirement {
  return {
    foregroundRetirementLine: "前景位变少：默认不是每条 runtime 都要出声。",
  };
}
