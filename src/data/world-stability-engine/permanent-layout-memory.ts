export type PermanentLayoutMemory = {
  permanentLayoutLine: string;
};

export function resolvePermanentLayoutMemory(): PermanentLayoutMemory {
  return {
    permanentLayoutLine: "版式记忆压过文案记忆：先认得架子，再读字。",
  };
}
