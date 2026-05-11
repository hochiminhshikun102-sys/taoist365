import { dailyIndex } from "@/lib/living-day-key";

export type CivilizationRecoveryRuntime = {
  recoveryState: "atmosphereRecovery" | "residueThinning" | "silenceReopening" | "roomSimplification";
  recoveryLine: string;
  breathingRestorationLine: string;
  forceSimplerHomepage: boolean;
};

export function resolveCivilizationRecoveryRuntime(dayKey: string): CivilizationRecoveryRuntime {
  const h = dailyIndex(`${dayKey}:civilization-recovery`, 100);
  const recoveryState =
    h < 26 ? "atmosphereRecovery" : h < 52 ? "residueThinning" : h < 78 ? "silenceReopening" : "roomSimplification";

  return {
    recoveryState,
    recoveryLine:
      recoveryState === "atmosphereRecovery"
        ? "Atmosphere recovers by saying less."
        : recoveryState === "residueThinning"
          ? "Residue thins before it becomes atmosphere weight."
          : recoveryState === "silenceReopening"
            ? "Silence reopens and lets the room breathe again."
            : "The room simplifies itself to preserve long-term calm.",
    breathingRestorationLine: "Civilization has a self-lightening capacity.",
    forceSimplerHomepage: h > 64,
  };
}
