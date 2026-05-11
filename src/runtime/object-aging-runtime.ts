import { dailyIndex } from "@/lib/living-day-key";

export type ObjectAgingRuntime = {
  agingState: "freshlyPlaced" | "softened" | "wornQuietly" | "sedimented";
  edgeLine: string;
  materialLine: string;
  windkeepAgingLine: string;
  reduceObjectExplanation: boolean;
};

export function resolveObjectAgingRuntime(dayKey: string): ObjectAgingRuntime {
  const h = dailyIndex(`${dayKey}:object-aging`, 100);
  const agingState =
    h < 22 ? "freshlyPlaced" : h < 52 ? "softened" : h < 78 ? "wornQuietly" : "sedimented";

  return {
    agingState,
    edgeLine:
      agingState === "freshlyPlaced"
        ? "Edges remain plain, newly placed but not highlighted."
        : agingState === "softened"
          ? "Edges soften through use, not through a filter."
          : agingState === "wornQuietly"
            ? "Wear is quiet enough to read as continued handling."
            : "The object feels sedimented into the browser shelf.",
    materialLine:
      agingState === "sedimented"
        ? "Paper, wood, and surface calm hold time without nostalgia."
        : "Material stays ordinary: slight wear, soft paper, quiet wood.",
    windkeepAgingLine:
      agingState === "freshlyPlaced"
        ? "Windkeep keeps the object placed, not presented."
        : agingState === "softened"
          ? "Windkeep lets object surfaces age at room speed."
          : agingState === "wornQuietly"
            ? "Windkeep stores use-presence without antique theatre."
            : "Windkeep becomes storage sediment: object calm before object novelty.",
    reduceObjectExplanation: h > 70,
  };
}
