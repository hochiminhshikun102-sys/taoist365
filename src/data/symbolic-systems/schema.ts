export interface SymbolicMapping {
  id: string;
  symbol: string;
  interpretation: string;
  emotionalDirection: "grounding" | "clarity" | "release" | "balance";
}

export const symbolicMappings: SymbolicMapping[] = [];
