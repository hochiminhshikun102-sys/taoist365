import { dailyIndex } from "@/lib/living-day-key";

export type TemporalBreathingRuntime = {
  breathState: "slowExpansion" | "quietContraction" | "lateNightSlowing" | "preDawnEmptiness" | "seasonalBreathing";
  breathingLine: string;
  pulseLine: string;
  reduceSurfacePulse: boolean;
};

export function resolveTemporalBreathingRuntime(dayKey: string, now: Date = new Date()): TemporalBreathingRuntime {
  const h = dailyIndex(`${dayKey}:temporal-breathing`, 100);
  const hour = now.getHours();
  const breathState =
    hour < 5
      ? "preDawnEmptiness"
      : hour >= 23
        ? "lateNightSlowing"
        : h < 26
          ? "slowExpansion"
          : h < 56
            ? "quietContraction"
            : "seasonalBreathing";

  return {
    breathState,
    breathingLine:
      breathState === "preDawnEmptiness"
        ? "Pre-dawn emptiness lets time breathe by removing almost everything."
        : breathState === "lateNightSlowing"
          ? "Late-night time slows the room without changing it into a mode."
          : breathState === "slowExpansion"
            ? "Time expands slowly enough to remain almost unnoticeable."
            : breathState === "quietContraction"
              ? "The browser room contracts quietly and becomes easier to keep open."
              : "Seasonal breathing stays in the timing of the air.",
    pulseLine: "The room has a pulse without animation.",
    reduceSurfacePulse: breathState === "preDawnEmptiness" || breathState === "quietContraction" || h > 70,
  };
}
