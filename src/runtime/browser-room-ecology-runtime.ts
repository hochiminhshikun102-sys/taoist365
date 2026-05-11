import { dailyIndex } from "@/lib/living-day-key";

export type BrowserRoomEcologyRuntime = {
  ecologyState: "roomCoexistence" | "atmosphereCarrying" | "climateMigration" | "ecologicalBalance" | "silenceCompatibility";
  ecologyLine: string;
  equilibriumLine: string;
  reduceHallForeground: boolean;
};

export function resolveBrowserRoomEcologyRuntime(dayKey: string): BrowserRoomEcologyRuntime {
  const h = dailyIndex(`${dayKey}:browser-room-ecology`, 100);
  const ecologyState =
    h < 20
      ? "roomCoexistence"
      : h < 42
        ? "atmosphereCarrying"
        : h < 64
          ? "climateMigration"
          : h < 84
            ? "ecologicalBalance"
            : "silenceCompatibility";

  return {
    ecologyState,
    ecologyLine:
      ecologyState === "roomCoexistence"
        ? "Quiet Halls coexist as rooms in one civilization, not as pages."
        : ecologyState === "atmosphereCarrying"
          ? "One room carries a little atmosphere for another."
          : ecologyState === "climateMigration"
            ? "Quiet climate migrates without becoming a recommendation."
            : ecologyState === "ecologicalBalance"
              ? "Long-term ecological balance keeps the halls compatible."
              : "Silence compatibility lets every hall remain near the others.",
    equilibriumLine: "Spatial continuity reaches equilibrium by staying barely visible.",
    reduceHallForeground: h > 60,
  };
}
