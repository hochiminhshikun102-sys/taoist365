import { dailyIndex } from "@/lib/living-day-key";

export type AirflowSilenceRuntime = {
  silenceState: "movingStillness" | "breathableSilence" | "openCalmness" | "airyQuietness" | "gentleCirculation";
  silenceLine: string;
  airflowLine: string;
  preventFrozenSilence: boolean;
};

export function resolveAirflowSilenceRuntime(dayKey: string): AirflowSilenceRuntime {
  const h = dailyIndex(`${dayKey}:airflow-silence`, 100);
  const silenceState =
    h < 20
      ? "movingStillness"
      : h < 40
        ? "breathableSilence"
        : h < 60
          ? "openCalmness"
          : h < 80
            ? "airyQuietness"
            : "gentleCirculation";

  return {
    silenceState,
    silenceLine:
      silenceState === "movingStillness"
        ? "Stillness moves a little."
        : silenceState === "breathableSilence"
          ? "Silence stays breathable."
          : silenceState === "openCalmness"
            ? "Calmness opens rather than thickens."
            : silenceState === "airyQuietness"
              ? "Quietness keeps air inside it."
              : "Gentle circulation prevents silence from freezing.",
    airflowLine: "Silence should have airflow, not weight.",
    preventFrozenSilence: h > 18,
  };
}
