import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationFamiliarityRuntime = {
  familiarityState:
    | "atmosphereRecognition"
    | "roomReturnComfort"
    | "spatialMemory"
    | "browserFamiliarity"
    | "nonAddictiveAttachment";
  familiarityLine: string;
  attachmentLine: string;
  preventAddictionLoop: boolean;
};

export function resolveCivilizationFamiliarityRuntime(dayKey: string): CivilizationFamiliarityRuntime {
  const h = dailyIndex(`${dayKey}:civilization-familiarity`, 100);
  const familiarityState =
    h < 22
      ? "atmosphereRecognition"
      : h < 42
        ? "roomReturnComfort"
        : h < 62
          ? "spatialMemory"
          : h < 82
            ? "browserFamiliarity"
            : "nonAddictiveAttachment";

  return {
    familiarityState,
    familiarityLine:
      familiarityState === "atmosphereRecognition"
        ? "A returning person recognizes the atmosphere before the label."
        : familiarityState === "roomReturnComfort"
          ? "Room-return comfort grows slowly and without reward loops."
          : familiarityState === "spatialMemory"
            ? "Emotional spatial memory remains quiet and non-personalized."
            : familiarityState === "browserFamiliarity"
              ? "Browser familiarity makes the room feel still here."
              : "Long-term room attachment avoids addiction by staying low-pressure.",
    attachmentLine: "Familiarity is not addiction.",
    preventAddictionLoop: h > 14,
  };
}
