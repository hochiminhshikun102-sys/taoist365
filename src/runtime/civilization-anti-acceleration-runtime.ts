import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationAntiAccelerationRuntime = {
  dragState: "slowContinuity" | "lowFrequencyGovernance" | "atmosphericPacing" | "civilizationDrag" | "temporalSlowing";
  antiAccelerationLine: string;
  pacingLine: string;
  suppressContentVelocity: boolean;
};

export function resolveCivilizationAntiAccelerationRuntime(dayKey: string): CivilizationAntiAccelerationRuntime {
  const h = dailyIndex(`${dayKey}:civilization-anti-acceleration`, 100);
  const dragState =
    h < 24
      ? "slowContinuity"
      : h < 46
        ? "lowFrequencyGovernance"
        : h < 66
          ? "atmosphericPacing"
          : h < 86
            ? "civilizationDrag"
            : "temporalSlowing";

  return {
    dragState,
    antiAccelerationLine:
      dragState === "slowContinuity"
        ? "Slow continuity protects the room from feature rush."
        : dragState === "lowFrequencyGovernance"
          ? "Low-frequency governance refuses platform momentum."
          : dragState === "atmosphericPacing"
            ? "Atmospheric pacing keeps automation acceleration out of the foreground."
            : dragState === "civilizationDrag"
              ? "Civilization drag force makes the system remain slow on purpose."
              : "Temporal slowing keeps Taoist365 from becoming fast.",
    pacingLine: "The civilization protects time by resisting content velocity.",
    suppressContentVelocity: h > 36,
  };
}
